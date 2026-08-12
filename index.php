<!DOCTYPE html>
<html lang="en">
<?php include "_header.php" ?>
<body id="app" class="min-h-screen bg-gray-50 text-gray-900">
  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
      <aside class="w-full md:w-64 bg-gray-100 p-6 border-r">
        <div class="flex items-center space-x-3 mb-6">
          <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold"><?php echo strtoupper(substr($name,0,1)); ?></div>
          <div>
            <h1 class="text-lg font-semibold"><?php echo $name ?></h1>
            <p class="text-sm text-gray-500"><?php echo $title ?></p>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-xs font-semibold text-gray-600 uppercase mb-2">Files</h2>
          <ul id="fileList" class="space-y-2">
            <li><button data-file="detail" class="file-btn w-full text-left px-3 py-2 rounded hover:bg-gray-200 bg-white shadow-sm">detail.json</button></li>
            <li><button data-file="avatar" class="file-btn w-full text-left px-3 py-2 rounded hover:bg-gray-200">avatar.jpg</button></li>
          </ul>
        </div>

        <div class="mt-auto">
          <button id="themeToggle" class="w-full px-3 py-2 bg-primary text-white rounded">Toggle Theme</button>
        </div>
      </aside>

      <main class="flex-1 p-6 bg-white" id="viewer">
        <div id="contentArea" class="prose max-w-none font-sans">
          <div class="text-gray-500">Loading...</div>
        </div>
      </main>
    </div>
  </div>

  <script src="/js/app.js"></script>
  <?php include "_footer.html" ?>
</body>
</html>
