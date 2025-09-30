
(function(){
  const wrap = document.querySelector('.sm-wrap');
  if(!wrap) return;
  const panel = wrap.querySelector('.sm-panel');
  const checkbox = wrap.querySelector('#burger');

  function openMenu(){
    wrap.classList.add('sm-open');
    document.body.style.overflow='hidden';
    if(checkbox && !checkbox.checked) checkbox.checked = true;
  }
  function closeMenu(){
    wrap.classList.remove('sm-open');
    document.body.style.overflow='';
    if(checkbox && checkbox.checked) checkbox.checked = false;
  }

  if(checkbox){
    checkbox.addEventListener('change', ()=> checkbox.checked ? openMenu() : closeMenu());
  }

  panel.addEventListener('click', function(e){
    const a = e.target.closest('a');
    if(!a) return;
    if(a.matches('[data-inline="settings"]')){
      e.preventDefault();
      const box = wrap.querySelector('.sm-settings');
      const open = box.getAttribute('data-open') === 'true';
      box.setAttribute('data-open', open ? 'false' : 'true');
      return;
    }
    if(!a.hasAttribute('aria-disabled')) closeMenu();
  });

  window.addEventListener('keydown', e => { if(e.key==='Escape') closeMenu(); });

  const root = document.documentElement;
  const THEME_KEY = 'site-theme';
  function applyTheme(t){ root.setAttribute('data-theme', t || 'light'); try{localStorage.setItem(THEME_KEY, t||'light');}catch(e){} }
  (function initTheme(){
    try{
      const t = localStorage.getItem(THEME_KEY);
      applyTheme(t === 'dark' ? 'dark' : 'light');
    }catch(e){ applyTheme('light'); }
  })();
  const switchEl = wrap.querySelector('#sm-theme-switch');
  if(switchEl){
    switchEl.checked = (root.getAttribute('data-theme') === 'dark');
    switchEl.addEventListener('change', ()=> applyTheme(switchEl.checked ? 'dark' : 'light'));
  }
})();
