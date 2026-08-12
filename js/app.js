document.addEventListener('DOMContentLoaded', function () {
  const fileButtons = document.querySelectorAll('.file-btn');
  const contentArea = document.getElementById('contentArea');
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme === 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setTheme(isDark);
  });

  // Keyboard accessibility for theme toggle
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });

  async function loadDetail() {
    try {
      const res = await fetch('/data/detail.json');
      if (!res.ok) throw new Error('Failed to fetch detail.json');
      const data = await res.json();
      renderDetail(data);
    } catch (err) {
      contentArea.innerHTML = `<div class="text-red-500">Error loading detail.json: ${err.message}</div>`;
      console.error(err);
    }
  }

  function renderDetail(data) {
    // Render a simple, accessible CV view, falling back to pretty JSON
    const name = data.name || '';
    const title = data.title || '';
    const about = data.about || '';

    let html = `
      <header class="mb-6">
        <h1 class="text-3xl font-bold">${escapeHtml(name)}</h1>
        <p class="text-sm text-gray-500 dark:text-gray-300">${escapeHtml(title)}</p>
        ${about ? `<p class="mt-3 text-gray-700 dark:text-gray-200">${escapeHtml(about)}</p>` : ''}
      </header>
    `;

    // Skills — flatten multiple skill groups if present
    const skills = [];
    if (data.skills) {
      Object.keys(data.skills).forEach(k => {
        if (Array.isArray(data.skills[k])) data.skills[k].forEach(s => skills.push(s));
      });
    }

    if (skills.length) {
      html += `<section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Skills</h2>
        <div class="flex flex-wrap gap-2">`;
      skills.forEach(s => {
        html += `<span class="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">${escapeHtml(s)}</span>`;
      });
      html += `</div></section>`;
    }

    // Experience
    if (Array.isArray(data.experience) && data.experience.length) {
      html += `<section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Experience</h2>
        <div class="space-y-4">`;
      data.experience.forEach(item => {
        html += `<div class="p-4 border rounded bg-gray-50 dark:bg-gray-800">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-semibold">${escapeHtml(item.position || item.role || item.title || '')}</div>
              <div class="text-sm text-gray-500 dark:text-gray-300">${escapeHtml(item.company || '')}</div>
            </div>
            <div class="text-sm text-gray-400">${escapeHtml(item.period || item.date || '')}</div>
          </div>
          ${item.description ? `<p class="mt-2 text-sm text-gray-700 dark:text-gray-200">${escapeHtml(item.description)}</p>` : ''}
        </div>`;
      });
      html += `</div></section>`;
    }

    // Contact
    if (data.contact) {
      html += `<section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Contact</h2>
        <ul class="text-sm text-gray-700 dark:text-gray-200 space-y-1">
          ${data.contact.address ? `<li><strong>Location:</strong> ${escapeHtml(data.contact.address)}</li>` : ''}
          ${data.contact.email ? `<li><strong>Email:</strong> <a class="text-primary hover:underline" href="mailto:${escapeHtml(data.contact.email)}">${escapeHtml(data.contact.email)}</a></li>` : ''}
          ${data.contact.github ? `<li><strong>GitHub:</strong> <a class="text-primary hover:underline" href="${escapeHtml(data.contact.github)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.contact.github)}</a></li>` : ''}
          ${data.contact.linkedin ? `<li><strong>LinkedIn:</strong> <a class="text-primary hover:underline" href="${escapeHtml(data.contact.linkedin)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.contact.linkedin)}</a></li>` : ''}
          ${data.contact.web_site ? `<li><strong>Website:</strong> <a class="text-primary hover:underline" href="${escapeHtml(data.contact.web_site)}" target="_blank" rel="noopener noreferrer">${escapeHtml(data.contact.web_site)}</a></li>` : ''}
        </ul>
      </section>`;
    }

    // Fallback: pretty JSON at the end
    const pretty = JSON.stringify(data, null, 2);
    html += `<section class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Raw JSON</h2>
      <pre class="bg-gray-900 text-gray-100 dark:bg-gray-800 dark:text-gray-100 p-4 rounded overflow-auto text-sm font-mono">${escapeHtml(pretty)}</pre>
    </section>`;

    contentArea.innerHTML = html;
  }

  function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>\"'`]/g, function (char) {
      return ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#x60;'
      })[char];
    });
  }

  async function loadAvatar() {
    // Try to display images/avatar.jpg or use _avatar.php
    try {
      const imgUrl = '/images/avatar.jpg';
      const r = await fetch(imgUrl, { method: 'HEAD' });
      if (r.ok) {
        contentArea.innerHTML = `<div class="flex items-center justify-center"><img src="${imgUrl}" alt="Avatar" class="w-48 h-48 object-cover rounded-full shadow"/></div>`;
        return;
      }
    } catch (e) {
      // ignore
    }
    // fallback to iframe of _avatar.php
    contentArea.innerHTML = `<iframe src="/_avatar.php" class="w-full h-96 border-0 rounded"></iframe>`;
  }

  // Wire up file buttons
  fileButtons.forEach(btn => {
    btn.setAttribute('role', 'button');
    btn.setAttribute('tabindex', '0');
    btn.setAttribute('aria-pressed', 'false');

    btn.addEventListener('click', async (e) => {
      const file = btn.getAttribute('data-file');
      document.querySelectorAll('.file-btn').forEach(b => {
        b.classList.remove('bg-white','shadow-sm');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('bg-white','shadow-sm');
      btn.setAttribute('aria-pressed', 'true');
      if (file === 'detail') {
        await loadDetail();
      } else if (file === 'avatar') {
        await loadAvatar();
      }
    });

    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

  // Load default
  const defaultBtn = document.querySelector('.file-btn[data-file="detail"]');
  if (defaultBtn) defaultBtn.click();
});
