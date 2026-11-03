(function () {
  var root = document.documentElement;

  // Theme toggle
  var btn = document.getElementById('theme');
  function currentTheme() {
    return root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }
  btn.addEventListener('click', function () {
    var next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    // Keep any open comment threads in the same theme
    document.querySelectorAll('iframe.giscus-frame').forEach(function (f) {
      f.contentWindow.postMessage({ giscus: { setConfig: { theme: next === 'dark' ? 'dark' : 'light' } } }, 'https://giscus.app');
    });
  });
  document.getElementById('y').textContent = new Date().getFullYear();

  // Open roles
  var cfg = window.SITE_CONFIG || {};
  var roles = window.OPEN_ROLES || [];
  var list = document.getElementById('role-list');
  var repoUrl = 'https://github.com/' + cfg.repo;
  var discussionsUrl = repoUrl + '/discussions';

  var idea = document.getElementById('share-idea');
  if (idea && cfg.repo) {
    idea.href = discussionsUrl + '/new?category=' + encodeURIComponent(cfg.ideasCategorySlug || 'ideas');
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  var toastEl;
  function toast(msg) {
    if (!toastEl) { toastEl = el('div', 'toast'); toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  function roleUrl(id) {
    return location.href.split('#')[0] + '#role-' + id;
  }

  function loadComments(role, box) {
    if (box.dataset.loaded) return;
    box.dataset.loaded = '1';
    if (!cfg.categoryId) {
      var p = el('p', 'fallback');
      p.append('Comments open here once Discussions is set up. Until then, ');
      var a = el('a', null, 'ask about this role on GitHub');
      a.href = discussionsUrl;
      p.append(a, '.');
      box.appendChild(p);
      return;
    }
    var s = document.createElement('script');
    s.src = 'https://giscus.app/client.js';
    s.async = true;
    s.crossOrigin = 'anonymous';
    var attrs = {
      'data-repo': cfg.repo,
      'data-repo-id': cfg.repoId,
      'data-category': cfg.category,
      'data-category-id': cfg.categoryId,
      'data-mapping': 'specific',
      'data-term': 'Open role: ' + role.title + ' (' + role.project + ') [' + role.id + ']',
      'data-strict': '1',
      'data-reactions-enabled': '1',
      'data-emit-metadata': '0',
      'data-input-position': 'top',
      'data-theme': currentTheme() === 'dark' ? 'dark' : 'light',
      'data-lang': 'en',
      'data-loading': 'lazy'
    };
    Object.keys(attrs).forEach(function (k) { s.setAttribute(k, attrs[k]); });
    // giscus renders into the element with class "giscus"; give each role its own
    document.querySelectorAll('.giscus').forEach(function (g) { g.classList.remove('giscus'); });
    var target = el('div', 'giscus');
    box.appendChild(target);
    box.appendChild(s);
  }

  function toggle(role, button, box, card, force) {
    var open = force != null ? force : box.hidden;
    box.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
    card.classList.toggle('is-open', open);
    if (open) loadComments(role, box);
  }

  roles.forEach(function (role) {
    var card = el('article', 'card role');
    card.id = 'role-' + role.id;

    var tags = el('div', 'tag-row');
    tags.appendChild(el('span', 'pill open', role.project));
    tags.appendChild(el('span', 'pill', role.type));
    card.appendChild(tags);
    card.appendChild(el('h3', null, role.title));
    card.appendChild(el('p', null, role.summary));

    if (role.tasks && role.tasks.length) {
      var ul = el('ul', 'tasks');
      role.tasks.forEach(function (t) { ul.appendChild(el('li', null, t)); });
      card.appendChild(ul);
    }
    if (role.skills && role.skills.length) {
      var st = el('ul', 'stack');
      role.skills.forEach(function (t) { st.appendChild(el('li', null, t)); });
      card.appendChild(st);
    }

    var actions = el('div', 'role-actions');
    var cBtn = el('button', 'btn small', 'Comments');
    cBtn.type = 'button';
    cBtn.setAttribute('aria-expanded', 'false');
    var box = el('div', 'comments');
    box.id = 'comments-' + role.id;
    box.hidden = true;
    cBtn.setAttribute('aria-controls', box.id);

    var sBtn = el('button', 'btn small', 'Share');
    sBtn.type = 'button';
    sBtn.addEventListener('click', function () {
      var url = roleUrl(role.id);
      var data = { title: role.title + ' · ' + role.project, text: 'Open volunteer role: ' + role.title + ' (' + role.project + ')', url: url };
      if (navigator.share) {
        navigator.share(data).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () { toast('Link copied'); }, function () { prompt('Copy this link', url); });
      } else {
        prompt('Copy this link', url);
      }
    });

    var wa = el('a', 'btn small', 'WhatsApp');
    wa.href = 'https://wa.me/?text=' + encodeURIComponent('Open volunteer role: ' + role.title + ' (' + role.project + ') ' + roleUrl(role.id));
    wa.target = '_blank';
    wa.rel = 'noopener';

    cBtn.addEventListener('click', function () { toggle(role, cBtn, box, card); });

    actions.append(cBtn, sBtn, wa);
    card.appendChild(actions);
    card.appendChild(box);
    list.appendChild(card);
    role._open = function () { toggle(role, cBtn, box, card, true); };
  });

  // A shared link (#role-<id>) opens that role's comments
  function openFromHash() {
    var m = location.hash.match(/^#role-(.+)$/);
    if (!m) return;
    var role = roles.filter(function (r) { return r.id === m[1]; })[0];
    if (!role) return;
    role._open();
    var card = document.getElementById('role-' + role.id);
    if (card) card.scrollIntoView({ block: 'start' });
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
