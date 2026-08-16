<?php
if (!defined('ABSPATH')) exit;
function woodex_register_settings(){register_setting('woodex_settings','woodex_site_settings',array('sanitize_callback'=>'woodex_sanitize_settings'));}
function woodex_sanitize_settings($input){$out=array();foreach(array('email','whatsapp','booking_url','service_area','response_time') as $key){$out[$key]=isset($input[$key])?sanitize_text_field($input[$key]):'';}return $out;}
add_action('admin_init','woodex_register_settings');
function woodex_settings_menu(){add_options_page('Woodex Settings','Woodex Settings','manage_options','woodex-settings','woodex_settings_page');}
add_action('admin_menu','woodex_settings_menu');
function woodex_settings_page(){if(!current_user_can('manage_options'))return;$values=get_option('woodex_site_settings',array());?><div class="wrap"><h1>Woodex Settings</h1><form method="post" action="options.php"><?php settings_fields('woodex_settings');foreach(array('email'=>'Email','whatsapp'=>'WhatsApp','booking_url'=>'Booking URL','service_area'=>'Service area','response_time'=>'Response time') as $key=>$label):?><p><label><strong><?php echo esc_html($label);?></strong><br><input class="regular-text" name="woodex_site_settings[<?php echo esc_attr($key);?>]" value="<?php echo esc_attr($values[$key]??'');?>"></label></p><?php endforeach;submit_button('Save Woodex settings');?></form></div><?php}
