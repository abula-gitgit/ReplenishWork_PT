import { ConsumableItem } from '../types/consumable';

export interface ReplacementGuideItem {
  id: string;
  title: string;
  category: 'office' | 'it' | 'sanitary' | 'hvac' | 'safety' | 'facility' | 'maintenance';
  categoryLabel: string;
  cycleDays: number;
  cycleDisplay: string;
  hygieneReason: string;
  dangerOfNeglect: string;
  signsOfDegradation: string[];
  scientificNote?: string;
  proTips: string;
  urgencyLevel: 'high' | 'medium' | 'standard';
  badgeLabel?: string;
}

export const REPLACEMENT_GUIDES: ReplacementGuideItem[] = [
  {
    id: 'shredder-oil',
    title: 'Óleo lubrificante para destruidora de papel',
    category: 'office',
    categoryLabel: 'Escritório e Papelaria',
    cycleDays: 14,
    cycleDisplay: 'A cada 2 semanas (ou a cada 2 esvaziamentos)',
    hygieneReason:
      'As lâminas acumulam micropó de papel que absorve o lubrificante. Sem lubrificação regular, o atrito aumenta, o motor aquece e as lâminas desgastam-se prematuramente.',
    dangerOfNeglect:
      'Encravamentos frequentes, ruído excessivo, queima do motor e anulação da garantia do fabricante.',
    signsOfDegradation: [
      'Ruídos estridentes ao destruir papel',
      'Velocidade de corte visivelmente reduzida',
      'Acumulação de pó branco compactado nos rolos',
      'Folhas rasgadas em vez de cortadas de forma limpa'
    ],
    scientificNote:
      'A lubrificação regular aumenta a durabilidade do bloco de corte até 2,5 vezes e reduz os picos de consumo elétrico em 18%.',
    proTips:
      'Mantenha folhas lubrificadas prontas junto ao aparelho: a aplicação demora menos de 10 segundos.',
    urgencyLevel: 'high',
    badgeLabel: 'Manutenção preventiva'
  },
  {
    id: 'water-filter',
    title: 'Filtro anticalcário para máquina de café de escritório',
    category: 'sanitary',
    categoryLabel: 'Cozinha e Copa',
    cycleDays: 60,
    cycleDisplay: 'A cada 2 meses (ou conforme dureza da água)',
    hygieneReason:
      'A água da rede contém calcário e cloro. Um filtro saturado acumula bactérias e prejudica gravemente o sabor do café.',
    dangerOfNeglect:
      'Obstrução de tubos por calcário, perda de pressão na bomba, avarias caras e café com sabor amargo ou frio.',
    signsOfDegradation: [
      'Café a correr mais lentamente ou em pingas',
      'Creme do café fino e sem consistência',
      'Depósitos brancos visíveis no reservatório de água',
      'Aviso de descalcificação ativo no painel'
    ],
    scientificNote:
      'Mais de 60% das avarias em máquinas de café profissionais decorrem diretamente da acumulação de calcário.',
    proTips:
      'Tenha sempre um cartucho de reserva em armazém e programe a descalcificação para dias não úteis.',
    urgencyLevel: 'high',
    badgeLabel: 'Sabor e higiene'
  },
  {
    id: 'hvac-filter',
    title: 'Filtro de ar condicionado e climatização (Fancoil)',
    category: 'hvac',
    categoryLabel: 'Outros e Especiais',
    cycleDays: 90,
    cycleDisplay: 'A cada 3 meses (mudança de estação)',
    hygieneReason:
      'Os filtros retêm poeiras, ácaros e pólen. Se ficarem saturados com humidade, tornam-se viveiros de fungos e maus odores.',
    dangerOfNeglect:
      'Menor caudal de ar, aumento do consumo elétrico e potenciais alergias e dores de cabeça na equipa.',
    signsOfDegradation: [
      'Cheiro a mofo ao ligar a climatização',
      'Fluxo de ar fraco mesmo na velocidade máxima',
      'Camada escura de pó visível na rede do filtro',
      'Ruído excessivo da turbina por sobrecarga'
    ],
    scientificNote:
      'Um filtro sujo pode aumentar o consumo elétrico do sistema em até 15% devido à perda de rendimento térmico.',
    proTips:
      'Aspire ou lave o pré-filtro mensalmente e renove o filtro principal antes do verão e do inverno.',
    urgencyLevel: 'medium',
    badgeLabel: 'Qualidade do ar'
  },
  {
    id: 'first-aid-sterile',
    title: 'Material esterilizado e desinfetante da caixa de primeiros socorros',
    category: 'safety',
    categoryLabel: 'Saúde e Medicina',
    cycleDays: 180,
    cycleDisplay: 'A cada 6 meses (inspeção de segurança no trabalho)',
    hygieneReason:
      'Compressas, pensos rápidos e soluções antisséticas têm prazos de validade. Vencidos, perdem a esterilidade e eficácia.',
    dangerOfNeglect:
      'Risco de infeção em pequenos acidentes de trabalho e coimas em inspeções de segurança e saúde no trabalho.',
    signsOfDegradation: [
      'Validade ultrapassada nas embalagens',
      'Invólucros rasgados, húmidos ou descolados',
      'Desinfetante com depósito no fundo ou evaporado'
    ],
    proTips:
      'Fixe uma etiqueta com a data da última inspeção e o nome do responsável na tampa do estojo.',
    urgencyLevel: 'high',
    badgeLabel: 'Conformidade legal'
  },
  {
    id: 'kitchen-sponge',
    title: 'Esponja e pano de microfibra de cozinha / copa',
    category: 'sanitary',
    categoryLabel: 'Cozinha e Copa',
    cycleDays: 21,
    cycleDisplay: 'A cada 3 semanas',
    hygieneReason:
      'A humidade constante e os restos de gordura fazem da esponja o objeto com maior densidade bacteriana da copa.',
    dangerOfNeglect:
      'Contaminação cruzada em canecas e talheres partilhados pela equipa de trabalho.',
    signsOfDegradation: [
      'Fibras desgastadas ou a desfazer-se',
      'Odor persistente mesmo após lavagem com detergente',
      'Superfície viscosa ao toque'
    ],
    proTips:
      'Substitua sistematicamente no final da terceira semana e deixe sempre a secar fora da banca.',
    urgencyLevel: 'medium',
    badgeLabel: 'Saúde comum'
  },
  {
    id: 'keyboard-cleaner',
    title: 'Spray de ar comprimido para teclados e postos de trabalho',
    category: 'it',
    categoryLabel: 'Escritório e Papelaria',
    cycleDays: 30,
    cycleDisplay: 'Mensal',
    hygieneReason:
      'Entre as teclas acumulam-se poeiras, restos de comida e sujidade que podem bloquear os contactos.',
    dangerOfNeglect:
      'Falhas de teclas, aspeto descuidado no escritório e avarias em periféricos.',
    signsOfDegradation: [
      'Sujidade visível entre as teclas',
      'Teclas presas ao digitar',
      'Perda de pressão na lata de spray'
    ],
    proTips:
      'Dedique 5 minutos na última sexta-feira do mês para a limpeza dos postos de trabalho.',
    urgencyLevel: 'standard',
    badgeLabel: 'Posto de trabalho'
  }
];

export function mapGuideToPreset(guide: ReplacementGuideItem): ConsumableItem {
  const today = new Date().toISOString().split('T')[0];
  return {
    id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    name: guide.title,
    category:
      guide.category === 'office' || guide.category === 'it'
        ? 'Escritório e Papelaria'
        : guide.category === 'sanitary'
        ? 'Cozinha e Copa'
        : guide.category === 'safety'
        ? 'Saúde e Medicina'
        : 'Outros e Especiais',
    location:
      guide.category === 'office' || guide.category === 'it'
        ? 'Escritório / Gabinete'
        : guide.category === 'sanitary'
        ? 'Cozinha / Copa'
        : guide.category === 'safety'
        ? 'Consultório / Sala de tratamento'
        : 'Armazém principal',
    cycleDays: guide.cycleDays,
    lastReplacedDate: today,
    quantity: 1,
    unit: 'unid',
    minQuantity: 1,
    orderLeadDays: 3,
    memo: `[Guia recomendada] ${guide.proTips}`,
    history: []
  };
}
