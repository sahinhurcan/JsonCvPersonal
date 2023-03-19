<head>
    <meta charset="UTF-8">
    <?php $name = json_decode(file_get_contents("data/detail.json"), true)['name']; ?>
    <?php $title = json_decode(file_get_contents("data/detail.json"), true)['title']; ?>
    <?php $about = json_decode(file_get_contents("data/detail.json"), true)['about']; ?>

    <title><?php echo $name ?> | <?php echo $title ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <!--BROWSER COLOR-->
    <meta name="theme-color" content="#333333">
    <meta name="msapplication-navbutton-color" content="#333333">
    <meta name="apple-mobile-web-app-status-bar-style" content="#333333">
    <!--CSS IMPORT-->
    <link rel="stylesheet" href="/css/style.css">

    <!--SEO META-->
    <meta name="author" content="<?php echo $name ?>">
    <meta name="description" content="<?php echo $name ?> - Personal Website, <?php echo $about ?>">
    <meta name="keywords" content="<?php echo $name ?>,developer">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/images/favicon.png">
  </head>