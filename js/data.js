const RECIPES = [
  {
    id: 'pancake',
    name: 'Pancake',
    emoji: '\u{1F95E}',
    ingredients: [
      { id: 'tepung', name: 'Tepung', weight: 100, emoji: '\u{1F33E}' },
      { id: 'gula', name: 'Gula', weight: 20, emoji: '\u{1F36C}' },
      { id: 'susu', name: 'Susu', weight: 150, emoji: '\u{1F95B}' },
    ],
  },
  {
    id: 'jus-jeruk',
    name: 'Jus Jeruk',
    emoji: '\u{1F34A}',
    ingredients: [
      { id: 'jeruk', name: 'Jeruk', weight: 200, emoji: '\u{1F34A}' },
      { id: 'gula', name: 'Gula', weight: 10, emoji: '\u{1F36C}' },
      { id: 'air', name: 'Air', weight: 100, emoji: '\u{1F4A7}' },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    emoji: '\u{1F96A}',
    ingredients: [
      { id: 'roti', name: 'Roti', weight: 50, emoji: '\u{1F35E}' },
      { id: 'keju', name: 'Keju', weight: 20, emoji: '\u{1F9C0}' },
      { id: 'selada', name: 'Selada', weight: 10, emoji: '\u{1F96C}' },
    ],
  },
  {
    id: 'salad-buah',
    name: 'Salad Buah',
    emoji: '\u{1F957}',
    ingredients: [
      { id: 'apel', name: 'Apel', weight: 100, emoji: '\u{1F34E}' },
      { id: 'pisang', name: 'Pisang', weight: 100, emoji: '\u{1F34C}' },
      { id: 'yogurt', name: 'Yogurt', weight: 50, emoji: '\u{1F95B}' },
    ],
  },
];

const PRAISE_MESSAGES = [
  'Hebat! \u{1F389}',
  'Bagus sekali! \u{2B50}',
  'Keren! \u{1F680}',
  'Pintar! \u{1F31F}',
  'Mantap! \u{1F44D}',
  'Luar biasa! \u{1F3C6}',
  'Tepat sekali! \u{1F4AF}',
  'Kamu jago! \u{1F38A}',
];

const INSTRUCTION_TEMPLATES = [
  'Masukkan {weight} gram {name}',
  'Timbang {weight} gram {name}',
  'Tambahkan {weight} gram {name}',
];
