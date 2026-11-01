import React, { useState, useEffect, useMemo } from 'react';
import { ConsumableItem, CalculatedItem, Category } from './types/consumable';
import { loadItems, saveItems } from './utils/storage';
import { calculateItemStatus } from './utils/dateCalc';
import { getMasterOptions, saveMasterOptions, MasterOptions } from './utils/masterOptions';

// Components
import { Header } from './components/Header';
import { UrgentAlertBanner } from './components/UrgentAlertBanner';
import { SummaryCards } from './components/SummaryCards';
import { FilterToolbar } from './components/FilterToolbar';
import { ItemCard } from './components/ItemCard';
import { ItemModal } from './components/ItemModal';
import { BackupModal } from './components/BackupModal';
import { CustomReplaceModal } from './components/CustomReplaceModal';
import { HistoryModal } from './components/HistoryModal';
import { IndustryTemplateModal } from './components/IndustryTemplateModal';
import { MasterOptionModal } from './components/MasterOptionModal';
import { NotificationModal } from './components/NotificationModal';
import { CalendarView } from './components/CalendarView';
import { HistoryTimelineView } from './components/HistoryTimelineView';
import { CycleGuideView } from './components/CycleGuideView';
import { InfoPagesView } from './components/InfoPagesView';
import { BottomNavBar, ActiveTab } from './components/BottomNavBar';
import { Toast, ToastMessage } from './components/Toast';
import { Plus, FolderPlus, Sparkles } from 'lucide-react';

export default function App() {
  const [items, setItems] = useState<ConsumableItem[]>([]);
  const [masterOptions, setMasterOptions] = useState<MasterOptions>(getMasterOptions());
  const [activeTab, setActiveTab] = useState<ActiveTab>('list');

  // Filters & Sorting
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'critical' | 'warning' | 'normal'>('all');
  const [sortBy, setSortBy] = useState<'urgency' | 'cycle' | 'name' | 'cost'>('urgency');

  // Modals
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ConsumableItem | null>(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [isMasterModalOpen, setIsMasterModalOpen] = useState(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
  const [customReplaceTarget, setCustomReplaceTarget] = useState<CalculatedItem | null>(null);
  const [historyTarget, setHistoryTarget] = useState<CalculatedItem | null>(null);

  // Toast
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    const loaded = loadItems();
    setItems(loaded);
  }, []);

  const updateItems = (newItems: ConsumableItem[]) => {
    setItems(newItems);
    saveItems(newItems);
  };

  const calculatedItems = useMemo(() => {
    return items.map((it) => calculateItemStatus(it));
  }, [items]);

  const urgentItems = useMemo(() => {
    return calculatedItems.filter((i) => i.urgency === 'critical' || i.urgency === 'warning');
  }, [calculatedItems]);

  const displayItems = useMemo(() => {
    let result = calculatedItems;

    if (statusFilter !== 'all') {
      result = result.filter((it) => it.urgency === statusFilter);
    }

    if (selectedCategory !== 'all') {
      result = result.filter((it) => it.category === selectedCategory);
    }

    if (selectedLocation !== 'all') {
      result = result.filter((it) => it.location === selectedLocation);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (it) =>
          it.name.toLowerCase().includes(q) ||
          it.memo?.toLowerCase().includes(q) ||
          it.supplier?.toLowerCase().includes(q) ||
          it.location.toLowerCase().includes(q)
      );
    }

    result = [...result].sort((a, b) => {
      if (sortBy === 'urgency') {
        return a.daysRemaining - b.daysRemaining;
      }
      if (sortBy === 'cycle') {
        return a.cycleDays - b.cycleDays;
      }
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name, 'pt');
      }
      if (sortBy === 'cost') {
        return (b.cost || 0) - (a.cost || 0);
      }
      return 0;
    });

    return result;
  }, [calculatedItems, statusFilter, selectedCategory, selectedLocation, searchQuery, sortBy]);

  const handleQuickReplace = (item: CalculatedItem) => {
    const today = new Date().toISOString().split('T')[0];
    const prevDays = item.cycleDays - item.daysRemaining;

    const newHistory = [
      {
        id: `h-${Date.now()}`,
        replacedAt: new Date().toISOString(),
        cost: item.cost,
        note: 'Reposição rápida',
        previousDaysUsed: Math.max(1, prevDays),
      },
      ...(item.history || []),
    ];

    const updated = items.map((it) => {
      if (it.id === item.id) {
        return {
          ...it,
          lastReplacedDate: today,
          history: newHistory,
        };
      }
      return it;
    });

    updateItems(updated);
    addToast(`"${item.name}" reposto com sucesso!`, 'success');
  };

  const handleCustomReplaceConfirm = (
    itemId: string,
    replacedDate: string,
    cost?: number,
    note?: string
  ) => {
    const target = items.find((i) => i.id === itemId);
    if (!target) return;

    const calc = calculatedItems.find((i) => i.id === itemId);
    const prevDays = calc ? calc.cycleDays - calc.daysRemaining : target.cycleDays;

    const newRecord = {
      id: `h-${Date.now()}`,
      replacedAt: `${replacedDate}T12:00:00.000Z`,
      cost: cost,
      note: note || 'Substituição registada',
      previousDaysUsed: Math.max(1, prevDays),
    };

    const updated = items.map((it) => {
      if (it.id === itemId) {
        return {
          ...it,
          lastReplacedDate: replacedDate,
          history: [newRecord, ...(it.history || [])],
        };
      }
      return it;
    });

    updateItems(updated);
    addToast(`Substituição de "${target.name}" registada.`, 'success');
  };

  const handleSaveItem = (itemData: Partial<ConsumableItem>) => {
    if (editingItem) {
      const updated = items.map((it) =>
        it.id === editingItem.id ? ({ ...it, ...itemData } as ConsumableItem) : it
      );
      updateItems(updated);
      addToast(`"${itemData.name}" atualizado.`, 'success');
    } else {
      const newItem: ConsumableItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        name: itemData.name || '',
        category: itemData.category || 'Escritório e Papelaria',
        location: itemData.location || masterOptions.locations[0] || 'Escritório / Gabinete',
        cycleDays: itemData.cycleDays || 30,
        lastReplacedDate: itemData.lastReplacedDate || new Date().toISOString().split('T')[0],
        quantity: itemData.quantity ?? 1,
        unit: itemData.unit || 'unid',
        minQuantity: itemData.minQuantity ?? 1,
        cost: itemData.cost,
        supplier: itemData.supplier,
        itemUrl: itemData.itemUrl,
        orderLeadDays: itemData.orderLeadDays ?? 3,
        memo: itemData.memo,
        history: [],
      };
      updateItems([newItem, ...items]);
      addToast(`"${newItem.name}" adicionado ao inventário.`, 'success');
    }
  };

  const handleDeleteItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    const updated = items.filter((it) => it.id !== id);
    updateItems(updated);
    if (target) {
      addToast(`"${target.name}" eliminado.`, 'info');
    }
  };

  const handleApplyTemplate = (templateItems: Omit<ConsumableItem, 'id' | 'history'>[]) => {
    const newItems: ConsumableItem[] = templateItems.map((tmpl) => ({
      ...tmpl,
      id: `tmpl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      history: [],
    }));
    updateItems([...newItems, ...items]);
    addToast(`Foram adicionados ${newItems.length} artigos do modelo.`, 'success');
  };

  const handleAddPresetFromGuide = (preset: ConsumableItem) => {
    updateItems([preset, ...items]);
    addToast(`"${preset.name}" adicionado através do guia.`, 'success');
    setActiveTab('list');
  };

  const handleSaveMasterOptions = (newOptions: MasterOptions) => {
    setMasterOptions(newOptions);
    saveMasterOptions(newOptions);
    addToast('Opções mestres atualizadas.', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 md:pb-12 flex flex-col justify-between">
      <div>
        <Header
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenNewItem={() => {
            setEditingItem(null);
            setIsItemModalOpen(true);
          }}
          onOpenTemplates={() => setIsTemplateModalOpen(true)}
          onOpenMasterOptions={() => setIsMasterModalOpen(true)}
          onOpenBackup={() => setIsBackupModalOpen(true)}
          onOpenNotification={() => setIsNotificationModalOpen(true)}
          urgentCount={urgentItems.length}
        />

        <UrgentAlertBanner
          urgentItems={urgentItems}
          onQuickReplace={handleQuickReplace}
          onFilterUrgent={() => {
            setActiveTab('list');
            setStatusFilter('critical');
          }}
        />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {activeTab === 'list' && (
            <div>
              <SummaryCards
                items={calculatedItems}
                onFilterChange={setStatusFilter}
                activeStatus={statusFilter}
              />

              <FilterToolbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                selectedLocation={selectedLocation}
                onLocationChange={setSelectedLocation}
                availableLocations={masterOptions.locations}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />

              {displayItems.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 mb-1">
                    Nenhum artigo encontrado
                  </h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
                    {searchQuery || selectedCategory !== 'all' || statusFilter !== 'all'
                      ? 'Nenhum artigo corresponde aos filtros selecionados.'
                      : 'Comece adicionando artigos da sua empresa ou use um modelo predefinido.'}
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition flex items-center gap-1.5"
                    >
                      <FolderPlus className="w-4 h-4" />
                      <span>Carregar modelo de setor</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingItem(null);
                        setIsItemModalOpen(true);
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Registar novo artigo</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayItems.map((item) => (
                    <ItemCard
                      key={item.id}
                      item={item}
                      onQuickReplace={handleQuickReplace}
                      onCustomReplace={(it) => setCustomReplaceTarget(it)}
                      onEdit={(it) => {
                        setEditingItem(it);
                        setIsItemModalOpen(true);
                      }}
                      onDelete={handleDeleteItem}
                      onOpenHistory={(it) => setHistoryTarget(it)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'calendar' && (
            <CalendarView
              items={calculatedItems}
              onQuickReplace={handleQuickReplace}
              onEdit={(it) => {
                setEditingItem(it);
                setIsItemModalOpen(true);
              }}
            />
          )}

          {activeTab === 'timeline' && (
            <HistoryTimelineView items={items} />
          )}

          {activeTab === 'guide' && (
            <CycleGuideView
              onNavigateToList={() => setActiveTab('list')}
              onAddPresetItem={handleAddPresetFromGuide}
            />
          )}

          {activeTab === 'info' && (
            <InfoPagesView onNavigateToList={() => setActiveTab('list')} />
          )}
        </main>
      </div>

      <footer className="mt-12 py-6 border-t border-slate-200 bg-white text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            Replenish for Work (Edição em Português)
          </p>
          <p className="text-[11px] text-slate-400">
            Gestão inteligente de consumíveis, inventário e substituições para empresas e profissionais.
          </p>
          <div className="flex items-center justify-center gap-4 pt-2 text-[11px]">
            <button onClick={() => setActiveTab('info')} className="hover:text-blue-600 transition">
              Aviso legal
            </button>
            <span>·</span>
            <button onClick={() => setActiveTab('info')} className="hover:text-blue-600 transition">
              Privacidade
            </button>
            <span>·</span>
            <a href="https://rpw.easy-log.app/pt" className="hover:text-blue-600 transition">
              Portal Multilingue
            </a>
          </div>
        </div>
      </footer>

      <BottomNavBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        urgentCount={urgentItems.length}
      />

      <ItemModal
        isOpen={isItemModalOpen}
        onClose={() => {
          setIsItemModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialItem={editingItem}
        locations={masterOptions.locations}
        units={masterOptions.units}
      />

      <IndustryTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onApplyTemplate={handleApplyTemplate}
      />

      <MasterOptionModal
        isOpen={isMasterModalOpen}
        onClose={() => setIsMasterModalOpen(false)}
        options={masterOptions}
        onSave={handleSaveMasterOptions}
      />

      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        items={items}
        onRestore={(restored) => {
          updateItems(restored);
          addToast('Dados restaurados com sucesso.', 'success');
        }}
      />

      <CustomReplaceModal
        isOpen={!!customReplaceTarget}
        onClose={() => setCustomReplaceTarget(null)}
        item={customReplaceTarget}
        onConfirm={handleCustomReplaceConfirm}
      />

      <HistoryModal
        isOpen={!!historyTarget}
        onClose={() => setHistoryTarget(null)}
        item={historyTarget}
      />

      <NotificationModal
        isOpen={isNotificationModalOpen}
        onClose={() => setIsNotificationModalOpen(false)}
        items={calculatedItems}
      />

      <Toast toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
}
