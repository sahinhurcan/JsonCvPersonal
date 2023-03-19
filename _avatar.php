<!DOCTYPE html>
<html lang="en">
  <?php include "_header.php" ?>
  <?php $name = json_decode(file_get_contents("data/detail.json"), true)['name']; ?>
  <!--CONTENT SCOPE-->
  <body id="image" class="theme-dark">
    <img src="images/avatar.jpg" alt="<?php echo $name ?> Avatar">
    <small>250 x 250 pixels (Natural: 460 x 460 pixels)</small>
  </body>
  <?php include "_footer.html" ?>
</html>