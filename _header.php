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

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">

    <!-- Tailwind CDN (quick, no build) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      /* Tailwind base configuration for this project */
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: '#0ea5e9',
              accent: '#7c3aed'
            },
            fontFamily: {
              sans: ['Inter', 'ui-sans-serif', 'system-ui']
            }
          }
        }
      }
    </script>

    <!--CSS IMPORT (legacy styles kept for now) -->
    <link rel="stylesheet" href="/css/style.css">

    <!--SEO META-->
    <meta name="author" content="<?php echo $name ?>">
    <meta name="description" content="<?php echo $name ?> - Personal Website, <?php echo $about ?>">
    <meta name="keywords" content="<?php echo $name ?>,developer">
    <meta name="robots" content="index, follow">
    <link rel="icon" href="/images/favicon.png">
  </head>
