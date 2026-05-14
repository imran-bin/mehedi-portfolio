<?php
/**
 * Plugin Name: Mehedi Portfolio
 * Description: A custom WordPress plugin to display different sections of Mehedi Hassan Sagar's portfolio.
 * Version: 1.0
 * Author: Mehedi Hassan Sagar
 * Author URI: https://mehedisagar.com
 */

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

// Register shortcodes
function mehedi_register_shortcodes() {
    add_shortcode('mehedi_hero', 'mehedi_hero_section');
    add_shortcode('mehedi_biography', 'mehedi_biography_section');
    add_shortcode('mehedi_about', 'mehedi_about_section');
    add_shortcode('mehedi_political', 'mehedi_political_section');
    add_shortcode('mehedi_vision', 'mehedi_vision_section');
    add_shortcode('mehedi_social_work', 'mehedi_social_work_section');
    add_shortcode('mehedi_videos', 'mehedi_videos_section');
    add_shortcode('mehedi_gallery', 'mehedi_gallery_section');
    add_shortcode('mehedi_problem_form', 'mehedi_problem_form_section');
    add_shortcode('mehedi_faq', 'mehedi_faq_section');
    add_shortcode('mehedi_all_sections', 'mehedi_all_sections');
}

add_action('init', 'mehedi_register_shortcodes');

// Hero Section
function mehedi_hero_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/hero.php');
    return ob_get_clean();
}

// Biography Section
function mehedi_biography_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/biography.php');
    return ob_get_clean();
}

// About Section
function mehedi_about_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/about.php');
    return ob_get_clean();
}

// Political Section
function mehedi_political_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/political.php');
    return ob_get_clean();
}

// Vision Section
function mehedi_vision_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/vision.php');
    return ob_get_clean();
}

// Social Work Section
function mehedi_social_work_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/social-work.php');
    return ob_get_clean();
}

// Videos Section
function mehedi_videos_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/videos.php');
    return ob_get_clean();
}

// Gallery Section
function mehedi_gallery_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/gallery.php');
    return ob_get_clean();
}

// Problem Form Section
function mehedi_problem_form_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/problem-form.php');
    return ob_get_clean();
}

// FAQ Section
function mehedi_faq_section() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/faq.php');
    return ob_get_clean();
}

// All Sections Section
function mehedi_all_sections() {
    ob_start();
    include(plugin_dir_path(__FILE__) . 'templates/hero.php');
    include(plugin_dir_path(__FILE__) . 'templates/biography.php');
    include(plugin_dir_path(__FILE__) . 'templates/about.php');
    include(plugin_dir_path(__FILE__) . 'templates/political.php');
    include(plugin_dir_path(__FILE__) . 'templates/vision.php');
    include(plugin_dir_path(__FILE__) . 'templates/social-work.php');
    include(plugin_dir_path(__FILE__) . 'templates/videos.php');
    include(plugin_dir_path(__FILE__) . 'templates/gallery.php');
    include(plugin_dir_path(__FILE__) . 'templates/problem-form.php');
    include(plugin_dir_path(__FILE__) . 'templates/faq.php');
    return ob_get_clean();
}

// Enqueue styles and scripts
function mehedi_enqueue_assets() {
    wp_enqueue_style(
        'mehedi-portfolio-css',
        plugin_dir_url(__FILE__) . 'assets/css/mehedi-portfolio.css',
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'assets/css/mehedi-portfolio.css')
    );
    wp_enqueue_script(
        'mehedi-portfolio-js',
        plugin_dir_url(__FILE__) . 'assets/js/mehedi-portfolio.js',
        array('jquery'),
        filemtime(plugin_dir_path(__FILE__) . 'assets/js/mehedi-portfolio.js'),
        true
    );
}

add_action('wp_enqueue_scripts', 'mehedi_enqueue_assets');
