<!DOCTYPE html>
<html lang="en">
	<?php include "_header.php" ?>
	<?php
		// include the json_to_html.php file
		require_once 'json_to_html.php';

		// read the JSON file
		$json_data = file_get_contents('data/detail.json');

		// convert the JSON data to a PHP array
		$data = json_decode($json_data, true);

		// use the function to convert the JSON data to HTML
		$html = convertJsonToHtml($data, 1);
	?>
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
		<?php echo $html ?>
		</div>
	</body>
	<?php include "_footer.html" ?>
</html>