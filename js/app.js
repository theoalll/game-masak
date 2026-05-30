document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('game-container');

  Screens.init(container);
  GameAudio.init();

  Screens.render('cover');

  function initAudio() {
    GameAudio.ensureResumed();
    document.removeEventListener('click', initAudio);
    document.removeEventListener('touchstart', initAudio);
  }
  document.addEventListener('click', initAudio);
  document.addEventListener('touchstart', initAudio);

  container.addEventListener('click', (e) => {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    switch (action) {
      case 'start-game': {
        GameState.goToRecipes();
        Screens.render('recipes');
        GameAudio.page();
        break;
      }
      case 'select-recipe': {
        GameState.selectRecipe(target.dataset.recipeId);
        Screens.render('servings');
        GameAudio.page();
        break;
      }
      case 'back-to-recipes': {
        GameState.reset();
        Screens.render('recipes');
        GameAudio.tap();
        break;
      }
      case 'back-to-servings': {
        GameState.screen = 'servings';
        GameState.currentIngredientIndex = 0;
        GameState.currentWeight = 0;
        Screens.render('servings');
        GameAudio.tap();
        break;
      }
      case 'set-serving': {
        GameState.setServings(parseInt(target.dataset.servings));
        Screens.renderServingsUpdate();
        GameAudio.tap();
        break;
      }
      case 'start-weighing': {
        GameState.startWeighing();
        Screens.render('weighing');
        GameAudio.page();
        break;
      }
      case 'adjust-weight': {
        break;
      }
      case 'confirm-ingredient': {
        Screens.handleConfirm();
        break;
      }
      case 'replay': {
        GameState.resetSameRecipe();
        Screens.render('servings');
        GameAudio.tap();
        break;
      }
      case 'choose-other': {
        GameState.reset();
        Screens.render('cover');
        GameAudio.page();
        break;
      }
    }
  });
});
