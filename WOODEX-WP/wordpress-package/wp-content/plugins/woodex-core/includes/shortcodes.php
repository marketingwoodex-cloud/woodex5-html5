<?php
if (!defined('ABSPATH')) exit;
function woodex_contact_shortcode(){return '<div class="woodex-contact-cta"><strong>Start a Woodex project</strong><br><a href="'.esc_url(home_url('/contact/')).'">Get in touch →</a></div>';}
add_shortcode('woodex_contact_cta','woodex_contact_shortcode');
function woodex_whatsapp_shortcode($atts){$settings=get_option('woodex_site_settings',array());$number=preg_replace('/[^0-9]/','',$settings['whatsapp']??'');if(!$number)return '';return '<a class="woodex-whatsapp" href="https://wa.me/'.esc_attr($number).'">Chat on WhatsApp →</a>';}
add_shortcode('woodex_whatsapp','woodex_whatsapp_shortcode');
