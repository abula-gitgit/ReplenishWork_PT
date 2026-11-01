export interface MasterOptions {
  locations: string[];
  units: string[];
}

const STORAGE_KEY = 'replenish_work_pt_master_options_v1';

export const DEFAULT_LOCATIONS = [
  'Armazém principal',
  'Escritório / Gabinete',
  'Cozinha / Copa',
  'Sala de descanso',
  'Casa de banho / Balneário',
  'Receção / Balcão',
  'Oficina / Manutenção',
  'Consultório / Sala de tratamento',
];

export const DEFAULT_UNITS = [
  'unid',
  'embalagens',
  'garrafas',
  'caixas',
  'rolos',
  'litros',
  'kg',
  'conjuntos',
];

export function getMasterOptions(): MasterOptions {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        locations: Array.isArray(parsed.locations) && parsed.locations.length > 0 ? parsed.locations : DEFAULT_LOCATIONS,
        units: Array.isArray(parsed.units) && parsed.units.length > 0 ? parsed.units : DEFAULT_UNITS,
      };
    }
  } catch (e) {
    console.error('Error loading master options', e);
  }
  return { locations: DEFAULT_LOCATIONS, units: DEFAULT_UNITS };
}

export function saveMasterOptions(options: MasterOptions): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(options));
  } catch (e) {
    console.error('Error saving master options', e);
  }
}
