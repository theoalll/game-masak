const RECIPES = [
  {
    id: 'pancake',
    name: 'Pancake',
    emoji: '🥞',
    ingredients: [
      { id: 'tepung', name: 'Tepung', weight: 100, emoji: '🌾' },
      { id: 'gula', name: 'Gula', weight: 20, emoji: '🍬' },
      { id: 'susu', name: 'Susu', weight: 150, emoji: '🥛' },
      { id: 'telur-pancake', name: 'Telur', weight: 50, emoji: '🥚' },
      { id: 'mentega-pancake', name: 'Mentega', weight: 30, emoji: '🧈' },
    ],
  },
  {
    id: 'jus-jeruk',
    name: 'Jus Jeruk',
    emoji: '🍊',
    ingredients: [
      { id: 'jeruk', name: 'Jeruk', weight: 200, emoji: '🍊' },
      { id: 'gula-jus', name: 'Gula', weight: 10, emoji: '🍬' },
      { id: 'air-jus', name: 'Air', weight: 100, emoji: '💧' },
      { id: 'madu-jus', name: 'Madu', weight: 10, emoji: '🍯' },
      { id: 'es-jus', name: 'Es Batu', weight: 50, emoji: '🧊' },
    ],
  },
  {
    id: 'sandwich',
    name: 'Sandwich',
    emoji: '🥪',
    ingredients: [
      { id: 'roti', name: 'Roti', weight: 50, emoji: '🍞' },
      { id: 'keju', name: 'Keju', weight: 20, emoji: '🧀' },
      { id: 'selada', name: 'Selada', weight: 10, emoji: '🥬' },
      { id: 'tomat', name: 'Tomat', weight: 30, emoji: '🍅' },
      { id: 'mentega-sandwich', name: 'Mentega', weight: 10, emoji: '🧈' },
    ],
  },
  {
    id: 'salad-buah',
    name: 'Salad Buah',
    emoji: '🥗',
    ingredients: [
      { id: 'apel', name: 'Apel', weight: 100, emoji: '🍎' },
      { id: 'pisang-salad', name: 'Pisang', weight: 100, emoji: '🍌' },
      { id: 'yogurt', name: 'Yogurt', weight: 50, emoji: '🥛' },
      { id: 'madu-salad', name: 'Madu', weight: 10, emoji: '🍯' },
      { id: 'anggur', name: 'Anggur', weight: 30, emoji: '🍇' },
    ],
  },
  {
    id: 'pisang-goreng',
    name: 'Pisang Goreng',
    emoji: '🍌',
    ingredients: [
      { id: 'pisang-goreng-pisang', name: 'Pisang', weight: 100, emoji: '🍌' },
      { id: 'tepung-pisang', name: 'Tepung', weight: 30, emoji: '🌾' },
      { id: 'gula-pisang', name: 'Gula', weight: 10, emoji: '🍬' },
      { id: 'minyak-pisang', name: 'Minyak', weight: 20, emoji: '🫒' },
    ],
  },
  {
    id: 'smoothie',
    name: 'Smoothie Stroberi',
    emoji: '🥤',
    ingredients: [
      { id: 'stroberi', name: 'Stroberi', weight: 150, emoji: '🍓' },
      { id: 'yogurt-smoothie', name: 'Yogurt', weight: 100, emoji: '🥛' },
      { id: 'madu-smoothie', name: 'Madu', weight: 10, emoji: '🍯' },
      { id: 'es-smoothie', name: 'Es Batu', weight: 50, emoji: '🧊' },
    ],
  },
  {
    id: 'telur-dadar',
    name: 'Telur Dadar',
    emoji: '🍳',
    ingredients: [
      { id: 'telur-dadar-telur', name: 'Telur', weight: 60, emoji: '🥚' },
      { id: 'garam', name: 'Garam', weight: 5, emoji: '🧂' },
      { id: 'minyak-telur', name: 'Minyak', weight: 10, emoji: '🫒' },
      { id: 'daun-bawang', name: 'Daun Bawang', weight: 10, emoji: '🌿' },
    ],
  },
  {
    id: 'nasi-goreng',
    name: 'Nasi Goreng',
    emoji: '🍚',
    ingredients: [
      { id: 'nasi', name: 'Nasi', weight: 200, emoji: '🍚' },
      { id: 'telur-nasgor', name: 'Telur', weight: 50, emoji: '🥚' },
      { id: 'wortel', name: 'Wortel', weight: 30, emoji: '🥕' },
      { id: 'kecap', name: 'Kecap', weight: 10, emoji: '🍶' },
      { id: 'ayam-suwir', name: 'Ayam Suwir', weight: 30, emoji: '🍗' },
    ],
  },
  {
    id: 'kue-coklat',
    name: 'Kue Coklat',
    emoji: '🍪',
    ingredients: [
      { id: 'tepung-kue', name: 'Tepung', weight: 150, emoji: '🌾' },
      { id: 'gula-kue', name: 'Gula', weight: 50, emoji: '🍬' },
      { id: 'mentega-kue', name: 'Mentega', weight: 100, emoji: '🧈' },
      { id: 'coklat', name: 'Coklat', weight: 30, emoji: '🍫' },
      { id: 'telur-kue', name: 'Telur', weight: 50, emoji: '🥚' },
    ],
  },
  {
    id: 'sup-ayam',
    name: 'Sup Ayam',
    emoji: '🥣',
    ingredients: [
      { id: 'ayam-sup', name: 'Ayam', weight: 100, emoji: '🍗' },
      { id: 'wortel-sup', name: 'Wortel', weight: 50, emoji: '🥕' },
      { id: 'kentang', name: 'Kentang', weight: 50, emoji: '🥔' },
      { id: 'air-sup', name: 'Air', weight: 200, emoji: '💧' },
      { id: 'garam-sup', name: 'Garam', weight: 5, emoji: '🧂' },
    ],
  },
  {
    id: 'mie-goreng',
    name: 'Mie Goreng',
    emoji: '🍝',
    ingredients: [
      { id: 'mie', name: 'Mie', weight: 150, emoji: '🍝' },
      { id: 'sawi', name: 'Sawi', weight: 30, emoji: '🥬' },
      { id: 'telur-mie', name: 'Telur', weight: 50, emoji: '🥚' },
      { id: 'kecap-mie', name: 'Kecap', weight: 10, emoji: '🍶' },
      { id: 'minyak-mie', name: 'Minyak', weight: 10, emoji: '🫒' },
    ],
  },
  {
    id: 'pizza',
    name: 'Pizza Mini',
    emoji: '🍕',
    ingredients: [
      { id: 'roti-pizza', name: 'Roti', weight: 50, emoji: '🍞' },
      { id: 'saus-tomat', name: 'Saus Tomat', weight: 30, emoji: '🍅' },
      { id: 'keju-pizza', name: 'Keju', weight: 20, emoji: '🧀' },
      { id: 'sosis', name: 'Sosis', weight: 30, emoji: '🌭' },
      { id: 'jagung', name: 'Jagung', weight: 20, emoji: '🌽' },
    ],
  },
];

const PRAISE_MESSAGES = [
  'Hebat! 🎉',
  'Bagus sekali! ⭐',
  'Keren! 🚀',
  'Pintar! 🌟',
  'Mantap! 👍',
  'Luar biasa! 🏆',
  'Tepat sekali! 💯',
  'Kamu jago! 🎊',
];

const INSTRUCTION_TEMPLATES = [
  'Masukkan {weight} gram {name}',
  'Timbang {weight} gram {name}',
  'Tambahkan {weight} gram {name}',
];
