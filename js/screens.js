const Screens = {
  container: null,
  weighingComplete: false,

  init(container) {
    this.container = container;
  },

  render(screenName) {
    switch (screenName) {
      case 'cover': this.renderCover(); break;
      case 'recipes': this.renderRecipes(); break;
      case 'servings': this.renderServings(); break;
      case 'weighing': this.renderWeighing(); break;
      case 'complete': this.renderComplete(); break;
    }
  },

  renderCover() {
    const foodEmojis = ['\u{1F373}', '\u{1F95E}', '\u{1F34A}', '\u{1F96A}', '\u{1F957}', '\u{1F34C}', '\u{1F35A}', '\u{1F36B}'];
    const floaters = foodEmojis.map((emoji, i) => {
      const x = 10 + Math.random() * 80;
      const delay = Math.random() * 3;
      const dur = 3 + Math.random() * 3;
      return `<span class="cover-floater" style="left:${x}%;animation-delay:${delay}s;animation-duration:${dur}s">${emoji}</span>`;
    }).join('');

    this.container.innerHTML = `
      <div class="screen cover-screen">
        <div class="cover-floaters">${floaters}</div>
        <div class="screen-inner cover-inner">
          <div class="cover-content">
            <div class="cover-emojis">
              <span class="cover-icon">\u{1F373}</span>
              <span class="cover-icon main">\u{1F95E}</span>
              <span class="cover-icon">\u{1F964}</span>
            </div>
            <h1 class="cover-title">Dapur Masak</h1>
            <p class="cover-subtitle">Belajar Menimbang Bahan Makanan</p>
            <button class="btn-cover" data-action="start-game">
              Mulai!
            </button>
            <p class="cover-tagline">Ayo masak makanan favoritmu!</p>
          </div>
        </div>
      </div>
    `;
  },

  renderRecipes() {
    this.container.innerHTML = `
      <div class="screen recipes-screen">
        <div class="screen-inner">
          <div class="header">
            <h1 class="title">\u{1F4D6} Pilih Resep</h1>
            <p class="subtitle">Mau masak apa hari ini?</p>
          </div>
          <div class="recipes-grid">
            ${RECIPES.map(recipe => `
              <button class="recipe-card" data-action="select-recipe" data-recipe-id="${recipe.id}">
                <div class="recipe-emoji">${recipe.emoji}</div>
                <div class="recipe-name">${recipe.name}</div>
                <div class="recipe-preview">
                  ${recipe.ingredients.map(ing => `${ing.name} ${ing.weight}g`).join(' \u00B7 ')}
                </div>
              </button>
            `).join('')}
          </div>
        </div>
      </div>
    `;
    requestAnimationFrame(() => {
      this.container.querySelectorAll('.recipe-card').forEach((card, i) => {
        card.style.animationDelay = `${i * 0.1}s`;
        card.classList.add('animate-in');
      });
    });
  },

  renderServings() {
    const recipe = GameState.getSelectedRecipe();
    if (!recipe) { this.renderRecipes(); return; }
    const ingredients = GameState.getScaledIngredients();

    this.container.innerHTML = `
      <div class="screen servings-screen">
        <div class="screen-inner">
          <div class="header">
            <button class="btn-back" data-action="back-to-recipes">&lsaquo;</button>
            <h1 class="title">\u{1F373} Pilih Porsi</h1>
          </div>
          <div class="servings-content">
            <div class="recipe-info">
              <span class="recipe-emoji-lg">${recipe.emoji}</span>
              <span class="recipe-name-lg">${recipe.name}</span>
            </div>
            <p class="question-text">Untuk berapa orang?</p>
            <div class="servings-selector">
              ${[1, 2, 3].map(n => `
                <button class="serving-btn ${n === GameState.servings ? 'active' : ''}"
                        data-action="set-serving" data-servings="${n}">
                  <span class="serving-num">${n}</span>
                  <span class="serving-label">porsi</span>
                </button>
              `).join('')}
            </div>
            <div class="ingredient-table">
              <div class="table-header">
                <span>Bahan</span>
                <span>Untuk ${GameState.servings} porsi</span>
              </div>
              ${ingredients.map(ing => `
                <div class="table-row">
                  <span class="row-name">${ing.emoji} ${ing.name}</span>
                  <span class="row-weight"><strong>${ing.weight}</strong> gram</span>
                </div>
              `).join('')}
            </div>
            <button class="btn-primary" data-action="start-weighing">
              Mulai Menimbang!
            </button>
          </div>
        </div>
      </div>
    `;
  },

  renderServingsUpdate() {
    const ingredients = GameState.getScaledIngredients();

    this.container.querySelectorAll('.serving-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.servings) === GameState.servings);
    });

    const header = this.container.querySelector('.table-header span:last-child');
    if (header) header.textContent = `Untuk ${GameState.servings} porsi`;

    const rows = this.container.querySelectorAll('.table-row');
    rows.forEach((row, i) => {
      if (ingredients[i]) {
        row.querySelector('.row-weight').innerHTML =
          `<strong>${ingredients[i].weight}</strong> gram`;
      }
    });
  },

  renderWeighing() {
    const ingredient = GameState.getCurrentIngredient();
    if (!ingredient) { this.renderComplete(); return; }

    this.weighingComplete = false;

    const recipe = GameState.getSelectedRecipe();
    const total = GameState.getTotalIngredients();
    const current = GameState.currentIngredientIndex + 1;
    const target = ingredient.weight;
    const curWeight = GameState.currentWeight;
    const step = GameState.getStep();
    const servings = GameState.servings;
    const baseIngredient = recipe.ingredients[GameState.currentIngredientIndex];
    const baseWeight = baseIngredient.weight;

    const progress = Math.min((curWeight / target) * 100, 100);
    const isOver = curWeight > target;
    const isExact = curWeight === target && target > 0;
    const progressClass = isExact ? 'exact' : isOver ? 'over' : '';

    let eduHtml = `<span class="edu-base">1 porsi: <strong>${baseWeight}</strong> gram</span>`;
    if (servings > 1) {
      const parts = [];
      for (let i = 0; i < servings; i++) parts.push(baseWeight);
      eduHtml += `<span class="edu-scaled">${servings} porsi: ${parts.join(' + ')} = <strong>${target}</strong> gram</span>`;
    }

    const instrIndex = Math.floor(Math.random() * INSTRUCTION_TEMPLATES.length);
    const instruction = INSTRUCTION_TEMPLATES[instrIndex]
      .replace('{weight}', target)
      .replace('{name}', ingredient.name);

    this.container.innerHTML = `
      <div class="screen weighing-screen">
        <div class="screen-inner">
          <div class="header">
            <button class="btn-back" data-action="back-to-servings">&lsaquo;</button>
            <div class="step-indicator">Bahan ${current} dari ${total}</div>
          </div>
          <div class="weighing-content">
            <div class="ingredient-badge">
              <span class="ingredient-emoji">${ingredient.emoji}</span>
              <span class="ingredient-name">${ingredient.name}</span>
            </div>
            <div class="edu-box">
              ${eduHtml}
            </div>
            <div class="scale-body" id="scale-body">
              <div class="scale-platform">
                <span class="platform-bowl">${ingredient.emoji}</span>
              </div>
              <div class="scale-screen">
                <div class="screen-weight-row">
                  <span class="weight-value" id="weight-display">${curWeight}</span>
                  <span class="weight-unit">gram</span>
                </div>
                <div class="progress-bar-container">
                  <div class="progress-bar-fill ${progressClass}" style="width: ${progress}%"></div>
                </div>
                <div class="screen-target-row">
                  Target: <span class="target-val">${target}</span> gram
                </div>
              </div>
            </div>
            <div class="feedback-message" id="feedback-msg"></div>
            <div class="instruction-text">${instruction}</div>
            <div class="weight-buttons">
              <button class="btn-weight btn-minus" data-action="adjust-weight" data-delta="-${step}">
                <span class="btn-sym">&minus;</span>
                <span class="btn-step">${step}g</span>
              </button>
              <button class="btn-weight btn-plus" data-action="adjust-weight" data-delta="${step}">
                <span class="btn-sym">+</span>
                <span class="btn-step">${step}g</span>
              </button>
            </div>
            <button class="btn-confirm" data-action="confirm-ingredient">
              Masukkan Bahan!
            </button>
          </div>
        </div>
      </div>
    `;

    this.setupLongPress(
      this.container.querySelector('.btn-minus'),
      this.container.querySelector('.btn-plus'),
      step
    );
  },

  updateWeighingDisplay() {
    const ingredient = GameState.getCurrentIngredient();
    if (!ingredient) return;

    const weightDisplay = this.container.querySelector('#weight-display');
    const progressFill = this.container.querySelector('.progress-bar-fill');
    const scaleBody = this.container.querySelector('#scale-body');
    if (!weightDisplay || !progressFill) return;

    const target = ingredient.weight;
    const current = GameState.currentWeight;
    const progress = Math.min((current / target) * 100, 100);
    const isOver = current > target;
    const isExact = current === target && target > 0;

    weightDisplay.textContent = current;
    weightDisplay.style.transform = 'scale(1.3)';
    setTimeout(() => { weightDisplay.style.transform = 'scale(1)'; }, 150);

    weightDisplay.style.color = isExact ? '#00ff88' : isOver ? '#ff8844' : '#00ff88';
    if (scaleBody) scaleBody.classList.remove('shake');

    progressFill.style.width = `${progress}%`;
    progressFill.className = 'progress-bar-fill' + (isExact ? ' exact' : isOver ? ' over' : '');
  },

  handleConfirm() {
    if (this.weighingComplete) return;

    if (GameState.isWeightCorrect()) {
      this.showSuccessOverlay();
    } else {
      this.showIncorrectFeedback();
    }
  },

  showIncorrectFeedback() {
    const msgs = [
      'Hampir! Coba lagi \u{2728}',
      'Belum pas, atur lagi dulu!',
      'Aduh, kurang tepat. Coba lagi ya!',
      'Belum sampai, geser lagi!',
    ];
    const msg = msgs[Math.floor(Math.random() * msgs.length)];
    const el = this.container.querySelector('#feedback-msg');
    const scaleBody = this.container.querySelector('#scale-body');
    if (el) {
      el.textContent = msg;
      el.classList.add('show');
      setTimeout(() => el.classList.remove('show'), 2000);
    }
    if (scaleBody) {
      scaleBody.classList.remove('shake');
      void scaleBody.offsetWidth;
      scaleBody.classList.add('shake');
    }
    GameAudio.error();
  },

  showSuccessOverlay() {
    if (this.weighingComplete) return;
    this.weighingComplete = true;

    const message = PRAISE_MESSAGES[Math.floor(Math.random() * PRAISE_MESSAGES.length)];

    const overlay = document.createElement('div');
    overlay.className = 'success-overlay';
    overlay.innerHTML = `
      <div class="success-content">
        <div class="success-star">\u{2B50}</div>
        <div class="success-msg">${message}</div>
      </div>
    `;
    this.container.appendChild(overlay);

    GameAudio.success();

    void overlay.offsetWidth;
    overlay.classList.add('show');

    setTimeout(() => {
      overlay.classList.remove('show');
      setTimeout(() => {
        overlay.remove();
        const hasMore = GameState.nextIngredient();
        if (hasMore) {
          this.render('weighing');
        } else {
          this.render('complete');
          GameAudio.complete();
        }
      }, 300);
    }, 1500);
  },

  setupLongPress(minusBtn, plusBtn, step = 10) {
    const self = this;

    function createHandler(delta) {
      let interval = null;

      const start = (e) => {
        if (self.weighingComplete) return;
        if (interval) return;
        if (e.type === 'touchstart') e.preventDefault();

        GameState.adjustWeight(delta);
        self.updateWeighingDisplay();
        GameAudio.pop();

        interval = setInterval(() => {
          if (self.weighingComplete) {
            clearInterval(interval);
            interval = null;
            return;
          }
          GameState.adjustWeight(delta);
          self.updateWeighingDisplay();
          GameAudio.pop();
        }, 150);
      };

      const stop = () => {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      };

      return { start, stop };
    }

    if (minusBtn) {
      const mh = createHandler(-step);
      minusBtn.addEventListener('mousedown', mh.start);
      minusBtn.addEventListener('touchstart', mh.start, { passive: false });
      minusBtn.addEventListener('mouseup', mh.stop);
      minusBtn.addEventListener('touchend', mh.stop);
      minusBtn.addEventListener('mouseleave', mh.stop);
      minusBtn.addEventListener('touchcancel', mh.stop);
    }

    if (plusBtn) {
      const ph = createHandler(step);
      plusBtn.addEventListener('mousedown', ph.start);
      plusBtn.addEventListener('touchstart', ph.start, { passive: false });
      plusBtn.addEventListener('mouseup', ph.stop);
      plusBtn.addEventListener('touchend', ph.stop);
      plusBtn.addEventListener('mouseleave', ph.stop);
      plusBtn.addEventListener('touchcancel', ph.stop);
    }
  },

  renderComplete() {
    const recipe = GameState.getSelectedRecipe();
    const stars = GameState.getStars();

    this.container.innerHTML = `
      <div class="screen complete-screen">
        <div class="confetti-container" id="confetti-container"></div>
        <div class="screen-inner">
          <div class="complete-content">
            <div class="complete-emoji">${recipe.emoji}</div>
            <h1 class="complete-title">Selamat! \u{1F389}</h1>
            <p class="complete-subtitle">
              Kamu berhasil membuat ${recipe.name}!
            </p>
            <div class="stars-display">
              ${[1, 2, 3].map(i => `
                <span class="star ${i <= stars ? 'earned' : 'unearned'}"
                      style="animation-delay: ${(i - 1) * 0.3}s">
                  ${i <= stars ? '\u{2B50}' : '\u{2606}'}
                </span>
              `).join('')}
            </div>
            <p class="complete-message">${GameState.getCompleteMessage()}</p>
            <div class="complete-buttons">
              <button class="btn-primary" data-action="replay">Main Lagi</button>
              <button class="btn-secondary" data-action="choose-other">Pilih Resep Lain</button>
            </div>
          </div>
        </div>
      </div>
    `;

    this.generateConfetti();
  },

  generateConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;

    const colors = [
      '#FF6B6B', '#4ECDC4', '#FFE66D', '#51CF66',
      '#A29BFE', '#FD79A8', '#FDCB6E', '#E17055',
    ];

    for (let i = 0; i < 60; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 10;
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        width: ${size}px;
        height: ${size * (0.4 + Math.random() * 0.6)}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        animation-delay: ${Math.random() * 2}s;
        animation-duration: ${2 + Math.random() * 3}s;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        opacity: ${0.7 + Math.random() * 0.3};
      `;
      container.appendChild(piece);
    }

    setTimeout(() => {
      if (container) container.innerHTML = '';
    }, 6000);
  },
};
