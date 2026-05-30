const GameState = {
  screen: 'recipes',
  selectedRecipeId: null,
  servings: 1,
  currentIngredientIndex: 0,
  currentWeight: 0,
  totalAdjustments: 0,

  getSelectedRecipe() {
    if (!this.selectedRecipeId) return null;
    return RECIPES.find(r => r.id === this.selectedRecipeId);
  },

  getScaledIngredients() {
    const recipe = this.getSelectedRecipe();
    if (!recipe) return [];
    return recipe.ingredients.map(ing => ({
      ...ing,
      weight: ing.weight * this.servings,
    }));
  },

  getCurrentIngredient() {
    const ingredients = this.getScaledIngredients();
    return ingredients[this.currentIngredientIndex] || null;
  },

  getTotalIngredients() {
    return this.getScaledIngredients().length;
  },

  getStep() {
    const ingredient = this.getCurrentIngredient();
    if (!ingredient) return 10;
    return Math.max(5, Math.round(ingredient.weight / 50) * 5);
  },

  selectRecipe(id) {
    this.selectedRecipeId = id;
    this.screen = 'servings';
    this.currentIngredientIndex = 0;
    this.currentWeight = 0;
    this.totalAdjustments = 0;
  },

  setServings(n) {
    this.servings = n;
  },

  startWeighing() {
    this.screen = 'weighing';
    this.currentIngredientIndex = 0;
    this.currentWeight = 0;
    this.totalAdjustments = 0;
  },

  adjustWeight(delta) {
    const ingredient = this.getCurrentIngredient();
    if (!ingredient) return;
    const newWeight = this.currentWeight + delta;
    if (newWeight < 0) return;
    this.currentWeight = newWeight;
    this.totalAdjustments++;
  },

  isWeightCorrect() {
    const ingredient = this.getCurrentIngredient();
    if (!ingredient) return false;
    return this.currentWeight === ingredient.weight;
  },

  nextIngredient() {
    this.currentIngredientIndex++;
    this.currentWeight = 0;
    const ingredients = this.getScaledIngredients();
    if (this.currentIngredientIndex >= ingredients.length) {
      this.screen = 'complete';
      return false;
    }
    return true;
  },

  getStars() {
    const ingredients = this.getScaledIngredients();
    let minPresses = 0;
    for (const ing of ingredients) {
      minPresses += ing.weight / 10;
    }
    const ratio = this.totalAdjustments / minPresses;
    if (ratio <= 1.5) return 3;
    if (ratio <= 2.5) return 2;
    return 1;
  },

  getCompleteMessage() {
    const stars = this.getStars();
    const messages = {
      3: ['Sempurna! \u{1F31F}', 'Luar biasa! \u{1F3C6}', 'Kamu jago masak! \u{1F468}\u200D\u{1F373}'],
      2: ['Hebat! \u{2B50}', 'Bagus sekali! \u{1F44D}', 'Mantap! \u{1F389}'],
      1: ['Keren! \u{1F38A}', 'Sudah bagus! \u{1F308}', 'Terus belajar! \u{1F4AA}'],
    };
    const msgs = messages[stars];
    return msgs[Math.floor(Math.random() * msgs.length)];
  },

  reset() {
    this.screen = 'recipes';
    this.selectedRecipeId = null;
    this.servings = 1;
    this.currentIngredientIndex = 0;
    this.currentWeight = 0;
    this.totalAdjustments = 0;
  },

  resetSameRecipe() {
    this.screen = 'servings';
    this.servings = 1;
    this.currentIngredientIndex = 0;
    this.currentWeight = 0;
    this.totalAdjustments = 0;
  },
};
