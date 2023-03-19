<!DOCTYPE html>
<html lang="en">
<?php include "_header.php" ?>
<body id="desktop">
    <main class="editor theme-dark">
      <div class="editor-header">
        <div class="action-buttons">
          <div class="a"></div>
          <div class="b"></div>
          <div class="c"></div>
        </div>
        <div class="title"><span class="file">detail.json</span><span class="desc"><?php echo $name ?></span></div>
      </div>
      <div class="editor-frame">
        <div class="file-menu">
          <div class="settings">
            <div class="icon"><i class="fa fa-paint-roller"></i></div>
            <ul>
              <li data-theme="theme-dark">Theme Dark</li>
              <li data-theme="theme-light">Theme Light</li>
              <li data-theme="theme-blues">Theme Blue</li>
              <li data-theme="theme-pinks">Theme Pink</li>
            </ul>
          </div>
          <div class="menu-title">Working Files</div>
          <ul>
            <li><a href="_detail.php" target="editor" class="active">detail<span>.json</span></a></li>
            <li><a href="_avatar.php" target="editor">avatar<span>.jpg</span></a></li>
          </ul>
        </div>
        <div class="file-frame">
          <iframe id="iframe" name="editor" src="_detail.php" onLoad="$.frameLoad();"></iframe>
        </div>
      </div>
    </main>
</body>
<?php include "_footer.html" ?>
</html>