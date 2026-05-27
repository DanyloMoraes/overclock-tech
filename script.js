document.addEventListener('DOMContentLoaded', () => {
  handleProductPageLinks();
  handleCartWidget();
  handleThemeToggle();
  initSplide();
});

function handleProductPageLinks() {
  document.querySelectorAll('article[data-product-page]').forEach(article => {
    article.style.cursor = 'pointer';
    article.addEventListener('click', event => {
      if (event.target.closest('button')) {
        return;
      }
      window.location.href = article.dataset.productPage;
    });
  });
}

function handleCartWidget() {
  const cartButton = document.querySelector('.cart-button');
  const cartCard = document.querySelector('.cart-card');
  const cartRemove = document.querySelector('.cart-card__remove');
  const cartCount = document.querySelector('.cart-count');

  if (!cartButton || !cartCard || !cartRemove || !cartCount) {
    return;
  }

  cartButton.addEventListener('click', event => {
    event.stopPropagation();
    const isOpen = cartCard.classList.toggle('is-visible');
    cartButton.setAttribute('aria-expanded', isOpen);
  });

  cartRemove.addEventListener('click', event => {
    event.stopPropagation();
    const itemRow = event.target.closest('.cart-card__item');
    if (itemRow) {
      itemRow.remove();
      cartCount.textContent = '0';
      const emptyMessage = document.createElement('p');
      emptyMessage.className = 'cart-card__empty';
      emptyMessage.textContent = 'Carrinho vazio.';
      cartCard.appendChild(emptyMessage);
    }
  });

  document.addEventListener('click', event => {
    if (!cartCard.contains(event.target) && !cartButton.contains(event.target)) {
      cartCard.classList.remove('is-visible');
      cartButton.setAttribute('aria-expanded', 'false');
    }
  });
}

function handleThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  if (!themeToggle) {
    return;
  }

  const iconToggle = themeToggle.querySelector('#icon-toggle');
  const updateToggleLabel = isLight => {
    const label = isLight ? 'dark' : 'light';
    const icon = isLight ? '🌙' : '☀️';

    if (iconToggle) {
      iconToggle.textContent = icon;
      const nextText = iconToggle.nextSibling;
      if (nextText && nextText.nodeType === Node.TEXT_NODE) {
        nextText.textContent = ` ${label}`;
      } else {
        themeToggle.append(` ${label}`);
      }
    } else {
      themeToggle.innerHTML = `<span id="icon-toggle">${icon}</span> ${label}`;
    }

    themeToggle.setAttribute('aria-label', isLight ? 'Mudar para tema escuro' : 'Mudar para tema claro');
  };

  const savedTheme = localStorage.getItem('siteTheme');
  let isLightTheme = bodyElement.classList.contains('light-theme');
  if (savedTheme === 'light') {
    bodyElement.classList.add('light-theme');
    isLightTheme = true;
  } else if (savedTheme === 'dark') {
    bodyElement.classList.remove('light-theme');
    isLightTheme = false;
  }
  updateToggleLabel(isLightTheme);

  themeToggle.addEventListener('click', () => {
    const isLight = bodyElement.classList.toggle('light-theme');
    updateToggleLabel(isLight);
    localStorage.setItem('siteTheme', isLight ? 'light' : 'dark');
  });
}

function initSplide() {
  if (typeof Splide === 'undefined') {
    return;
  }

  const splideElement = document.querySelector('#product-splide');
  if (!splideElement) {
    return;
  }

  new Splide('#product-splide', {
    type: 'slide',
    perPage: 3,
    perMove: 1,
    gap: '24px',
    rewind: true,
    pagination: false,
    arrows: true,
    breakpoints: {
      1024: {
        perPage: 2,
      },
      768: {
        perPage: 1,
      },
    },
  }).mount();
}
