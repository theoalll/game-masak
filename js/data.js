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
  {
    id: 'pisang-goreng',
    name: 'Pisang Goreng',
    emoji: '\u{1F34C}',
    ingredients: [
      { id: 'pisang', name: 'Pisang', weight: 100, emoji: '\u{1F34C}' },
      { id: 'tepung', name: 'Tepung', weight: 30, emoji: '\u{1F33E}' },
    ],
  },
  {
    id: 'smoothie',
    name: 'Smoothie Stroberi',
    emoji: '\u{1F964}',
    ingredients: [
      { id: 'stroberi', name: 'Stroberi', weight: 150, emoji: '\u{1F353}' },
      { id: 'yogurt', name: 'Yogurt', weight: 100, emoji: '\u{1F95B}' },
    ],
  },
  {
    id: 'telur-dadar',
    name: 'Telur Dadar',
    emoji: '\u{1F373}',
    ingredients: [
      { id: 'telur', name: 'Telur', weight: 60, emoji: '\u{1F95A}' },
      { id: 'garam', name: 'Garam', weight: 5, emoji: '\u{1F9C2}' },
    ],
  },
  {
    id: 'nasi-goreng',
    name: 'Nasi Goreng',
    emoji: '\u{1F35A}',
    ingredients: [
      { id: 'nasi', name: 'Nasi', weight: 200, emoji: '\u{1F35A}' },
      { id: 'telur', name: 'Telur', weight: 50, emoji: '\u{1F95A}' },
      { id: 'wortel', name: 'Wortel', weight: 30, emoji: '\u{1F955}' },
      { id: 'kecap', name: 'Kecap', weight: 10, emoji: '\u{1F3ED}' },
    ],
  },
  {
    id: 'kue-coklat',
    name: 'Kue Coklat',
    emoji: '\u{1F36B}',
    ingredients: [
      { id: 'tepung', name: 'Tepung', weight: 150, emoji: '\u{1F33E}' },
      { id: 'gula', name: 'Gula', weight: 50, emoji: '\u{1F36C}' },
      { id: 'mentega', name: 'Mentega', weight: 100, emoji: '\u{1F9C8}' },
      { id: 'coklat', name: 'Coklat', weight: 30, emoji: '\u{1F36B}' },
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
