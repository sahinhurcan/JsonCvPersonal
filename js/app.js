document.addEventListener('DOMContentLoaded', function () {
  const fileButtons = document.querySelectorAll('.file-btn');
  const contentArea = document.getElementById('contentArea');
  const themeToggle = document.getElementById('themeToggle');

  function setTheme(isDark) {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme === 'dark');

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.classList.toggle('dark');
    setTheme(isDark);
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

    // Skills
    if (Array.isArray(data.skills) && data.skills.length) {
      html += `<section class="mb-6">
        <h2 class="text-xl font-semibold mb-2">Skills</h2>
        <div class="flex flex-wrap gap-2">`;
      data.skills.forEach(s => {
        html += `<span class="px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-sm">${escapeHtml(s)}</span>`;
      });
      html += `</div></section>`;
    }

    // Work / experience
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
            <div class="text-sm text-gray-400">${escapeHtml(item.period || '')}</div>
          </div>
          ${item.description ? `<p class="mt-2 text-sm text-gray-700 dark:text-gray-200">${escapeHtml(item.description)}</p>` : ''}
        </div>`;
      });
      html += `</div></section>`;
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
    return str.replace(/[&<>"'`]/g, function (char) {
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
    // First check if /images/avatar.jpg exists by attempting to fetch its HEAD
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
    btn.addEventListener('click', async (e) => {
      const file = btn.getAttribute('data-file');
      document.querySelectorAll('.file-btn').forEach(b => b.classList.remove('bg-white','shadow-sm'));
      btn.classList.add('bg-white','shadow-sm');
      if (file === 'detail') {
        await loadDetail();
      } else if (file === 'avatar') {
        await loadAvatar();
      }
    });
  });

  // Load default
  document.querySelector('.file-btn[data-file="detail"]').click();
});
