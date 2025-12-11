(function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    setTheme(storedTheme);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeButtons = [
    ...document.querySelectorAll('.header__theme-menu-button'),
  ];

  const currentTheme = document.documentElement.dataset.theme || 'auto';
  setActiveButton(themeButtons, currentTheme);

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const chosenTheme = [...button.classList]
        .find((cn) => cn.includes('_type_'))
        .split('_type_')[1];
      setTheme(chosenTheme);
      setActiveButton(themeButtons, chosenTheme);
    });
  });
});

function setTheme(theme) {
  if (theme === 'auto') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.dataset.theme = theme;
  }
  localStorage.setItem('theme', theme);
}

function setActiveButton(buttonsArray, theme) {
  buttonsArray.forEach((button) => {
    button.classList.remove('header__theme-menu-button_active');
    button.removeAttribute('disabled');
  });
  const target = buttonsArray.find((button) =>
    button.classList.contains(`header__theme-menu-button_type_${theme}`)
  );
  const active = target
    ? target
    : document.querySelector('.header__theme-menu-button_type_auto');

  if (active) {
    active.classList.add('header__theme-menu-button_active');
    active.setAttribute('disabled', true);
  }
}
