<?php
if(!defined('ABSPATH'))exit;
function woodex_child_assets(){wp_enqueue_style('woodex-parent',get_template_directory_uri().'/style.css');wp_enqueue_style('woodex-child',get_stylesheet_uri(),array('woodex-parent'),'1.0.0');}
add_action('wp_enqueue_scripts','woodex_child_assets');
