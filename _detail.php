<!DOCTYPE html>
<html lang="en">
	<?php include "_header.php" ?>
	<body id="code" class="theme-dark">
		<div class="row t1 end">
			<div class="cmd">/**</div>
		</div>
		<div class="row t2 end">
			<?php $last_modified = date("d.m.Y", filemtime("data/detail.json")); ?>
			<?php $name = json_decode(file_get_contents("data/detail.json"), true)['name']; ?>
			<div class="cmd"><?php echo $name ?> CV - Update <?php echo $last_modified; ?></div>
		</div>
		<div class="row t1 end">
			<div class="cmd">**/</div>
		</div>
		<div id="replaceHtmlData">
		</div>
	</body>
	<?php include "_footer.html" ?>
</html>