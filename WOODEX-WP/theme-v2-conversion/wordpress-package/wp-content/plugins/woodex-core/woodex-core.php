<?php
/**
 * Plugin Name: Woodex Core
 * Description: Woodex Interior content types, settings, shortcodes, and setup foundation for Elementor Free + XPRO.
 * Version: 0.1.0
 * Author: Woodex Interior
 * Text Domain: woodex-core
 */
if (!defined('ABSPATH')) exit;
define('WOODEX_CORE_VERSION','0.1.0');
define('WOODEX_CORE_DIR',plugin_dir_path(__FILE__));
require_once WOODEX_CORE_DIR.'includes/post-types.php';
require_once WOODEX_CORE_DIR.'includes/settings.php';
require_once WOODEX_CORE_DIR.'includes/shortcodes.php';
register_activation_hook(__FILE__,function(){woodex_register_content_types();flush_rewrite_rules();});
register_deactivation_hook(__FILE__,function(){flush_rewrite_rules();});
