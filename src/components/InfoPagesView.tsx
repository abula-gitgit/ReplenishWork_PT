import React from 'react';
import { ArrowLeft, Shield, FileText, Info, Mail } from 'lucide-react';

export type InfoTab = 'about' | 'privacy' | 'terms' | 'contact';

interface InfoPagesViewProps {
  initialTab?: InfoTab;
  onNavigateToList: () => void;
  onTabChange?: (tab: InfoTab) => void;
}

export const InfoPagesView: React.FC<InfoPagesViewProps> = ({
  initialTab = 'about',
  onNavigateToList,
  onTabChange,
}) => {
  const [activeTab, setActiveTab] = React.useState<InfoTab>(initialTab);

  const handleTabClick = (tab: InfoTab) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-sm">
        <button
          type="button"
          onClick={onNavigateToList}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition cursor-pointer"
          title="Voltar ao inventário"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">
            Informações & Aspetos Legais
          </h2>
          <p className="text-xs text-slate-500">
            Detalhes sobre a aplicação, proteção da privacidade e condições de serviço.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-slate-200/60 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => handleTabClick('about')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'about' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Sobre nós</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('privacy')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'privacy' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Shield className="w-3.5 h-3.5" />
          <span>Privacidade</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('terms')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'terms' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Termos de uso</span>
        </button>
        <button
          type="button"
          onClick={() => handleTabClick('contact')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition cursor-pointer ${
            activeTab === 'contact' ? 'bg-white text-blue-600 shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Contacto</span>
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 sm:p-8 space-y-6 text-slate-700 leading-relaxed text-sm">
        {activeTab === 'about' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Replenish for Work - Gestor inteligente de consumíveis para empresas
            </h3>
            <p>
              O Replenish for Work é uma solução leve e potente criada para escritórios, clínicas, lojas, restaurantes, oficinas e hotéis que necessitam de manter sob controlo rigoroso os ciclos de renovação e inventário dos seus materiais de trabalho.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <h4 className="font-bold text-blue-900 text-sm mb-1">Sem registo obrigatório</h4>
                <p className="text-xs text-slate-600">
                  Comece a utilizar a ferramenta de imediato. Todos os dados são guardados no navegador do seu dispositivo sem necessidade de criar contas.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">Privacidade total (Local First)</h4>
                <p className="text-xs text-slate-600">
                  Os seus inventários, fornecedores e custos ficam guardados unicamente no seu dispositivo (LocalStorage / IndexedDB). Pode exportar cópias de segurança em JSON a qualquer momento.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              Versão: 1.0.0 (Edição em Português) · Desenvolvido por Stone Studio
            </p>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Política de Privacidade e Proteção de Dados
            </h3>
            <p>
              No Replenish for Work respeitamos integralmente a confidencialidade dos dados operacionais da sua empresa.
            </p>
            <h4 className="font-bold text-slate-800 text-sm mt-3">1. Armazenamento exclusivamente local</h4>
            <p className="text-xs text-slate-600">
              Todos os registos de artigos, quantidades, fornecedores, locais e históricos residem exclusivamente na memória local do seu navegador. Os nossos servidores não recebem nem armazenam as informações do seu inventário.
            </p>
            <h4 className="font-bold text-slate-800 text-sm mt-3">2. Ausência de cookies de rastreio</h4>
            <p className="text-xs text-slate-600">
              Não utilizamos cookies de monitorização de publicidade nem partilhamos dados com terceiros.
            </p>
            <h4 className="font-bold text-slate-800 text-sm mt-3">3. Cópias de segurança sob controlo do utilizador</h4>
            <p className="text-xs text-slate-600">
              Tem controlo absoluto sobre os seus ficheiros: exporte uma cópia de segurança em formato JSON para arquivo ou restaure os dados noutro computador com facilidade.
            </p>
          </div>
        )}

        {activeTab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Termos e Condições de Utilização
            </h3>
            <p>
              A utilização do Replenish for Work rege-se pelos seguintes princípios:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-xs text-slate-600">
              <li>
                <strong>Finalidade orientativa:</strong> As recomendações de ciclos, durabilidades e avisos nas guias constituem boas práticas de referência técnica. Cada empresa é responsável pelo cumprimento das obrigações legais e normativas do seu setor.
              </li>
              <li>
                <strong>Responsabilidade de cópias de segurança:</strong> Como a aplicação funciona localmente no dispositivo, recomenda-se aos utilizadores a realização periódica de backups através da exportação JSON para prevenir perdas acidentais em caso de limpeza de dados de navegação.
              </li>
              <li>
                <strong>Disponibilidade do serviço:</strong> A aplicação é disponibilizada gratuitamente para promover a organização eficiente do trabalho.
              </li>
            </ul>
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900">
              Contacto e Assistência
            </h3>
            <p>
              Tem sugestões de melhoria, dúvidas sobre a utilização ou pretende sugerir novos modelos de setor para o seu negócio?
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="font-semibold text-slate-800 text-xs">
                Equipa de Desenvolvimento:
              </div>
              <div className="text-xs text-slate-600">
                Email:{' '}
                <a
                  href="mailto:stoooone.studio@gmail.com"
                  className="text-blue-600 underline font-medium"
                >
                  stoooone.studio@gmail.com
                </a>
              </div>
              <div className="text-xs text-slate-500">
                Horário de resposta: Segunda a Sexta-feira, resposta habitual em 24 a 48 horas úteis.
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
