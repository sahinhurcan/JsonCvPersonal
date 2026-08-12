<!DOCTYPE html>
<html lang="en">
<?php include "_header.php" ?>
<body id="app" class="min-h-screen bg-gray-50 text-gray-900">
  <?php $data = json_decode(file_get_contents("data/detail.json"), true); ?>
  <?php $contact = $data['contact'] ?? []; ?>
  <?php $skills = isset($data['skills']) ? $data['skills'] : []; ?>

  <div class="min-h-screen flex items-center justify-center p-6">
    <div class="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-4">

      <!-- LEFT: Profile / Navigation -->
      <aside class="col-span-1 bg-gray-100 p-6 space-y-6">
        <div class="flex items-center space-x-3">
          <div class="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold"><?php echo strtoupper(substr($data['name'] ?? '',0,1)); ?></div>
          <div>
            <h1 class="text-lg font-semibold"><?php echo htmlspecialchars($data['name'] ?? ''); ?></h1>
            <p class="text-sm text-gray-600"><?php echo htmlspecialchars($data['title'] ?? ''); ?></p>
          </div>
        </div>

        <div class="space-y-1">
          <?php if(!empty($contact['email'])): ?>
            <a href="mailto:<?php echo htmlspecialchars($contact['email']); ?>" class="block text-sm text-primary hover:underline"><?php echo htmlspecialchars($contact['email']); ?></a>
          <?php endif; ?>
          <?php if(!empty($contact['web_site'])): ?>
            <a href="<?php echo htmlspecialchars($contact['web_site']); ?>" target="_blank" rel="noopener noreferrer" class="block text-sm text-primary hover:underline"><?php echo htmlspecialchars($contact['web_site']); ?></a>
          <?php endif; ?>
          <?php if(!empty($contact['linkedin'])): ?>
            <a href="<?php echo htmlspecialchars($contact['linkedin']); ?>" target="_blank" rel="noopener noreferrer" class="block text-sm hover:underline">LinkedIn</a>
          <?php endif; ?>
          <?php if(!empty($contact['github'])): ?>
            <a href="<?php echo htmlspecialchars($contact['github']); ?>" target="_blank" rel="noopener noreferrer" class="block text-sm hover:underline">GitHub</a>
          <?php endif; ?>
        </div>

        <div>
          <h2 class="text-xs font-semibold text-gray-600 uppercase mb-2">Top Skills</h2>
          <div class="flex flex-wrap gap-2">
            <?php
              $flat = [];
              if(is_array($skills)){
                foreach($skills as $group) if(is_array($group)) foreach($group as $s) $flat[] = $s;
              }
              $flat = array_slice($flat,0,8);
              foreach($flat as $s){
                echo '<span class="px-2 py-1 bg-white rounded-full text-xs shadow-sm">'.htmlspecialchars($s).'</span>';
              }
            ?>
          </div>
        </div>

        <div class="mt-auto">
          <button id="themeToggle" class="w-full btn-primary" aria-pressed="false">Toggle theme</button>
          <a href="#rawjson" class="block mt-3 text-center text-sm text-gray-600 hover:underline">View raw JSON</a>
        </div>
      </aside>

      <!-- RIGHT: Content viewer -->
      <main class="col-span-3 p-8" id="viewer">
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
