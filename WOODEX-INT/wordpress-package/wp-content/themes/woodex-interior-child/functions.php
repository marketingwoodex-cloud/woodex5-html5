<?php
if(!defined('ABSPATH')) exit;
function woodex_child_styles(){wp_enqueue_style('parent-style',get_template_directory_uri().'/style.css');wp_enqueue_style('woodex-child',get_stylesheet_directory_uri().'/style.css',array('parent-style'),'1.0.0');}
add_action('wp_enqueue_scripts','woodex_child_styles');
