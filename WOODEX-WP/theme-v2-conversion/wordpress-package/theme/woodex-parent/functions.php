<?php
if(!defined('ABSPATH'))exit;
function woodex_parent_setup(){add_theme_support('title-tag');add_theme_support('post-thumbnails');add_theme_support('custom-logo');add_theme_support('elementor');register_nav_menus(array('primary'=>'Primary Menu','footer'=>'Footer Menu'));}
add_action('after_setup_theme','woodex_parent_setup');
function woodex_parent_assets(){wp_enqueue_style('woodex-parent-style',get_stylesheet_uri(),array(),'1.0.0');}
add_action('wp_enqueue_scripts','woodex_parent_assets');
