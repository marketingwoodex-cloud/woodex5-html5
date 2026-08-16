<?php
if (!defined('ABSPATH')) exit;
function woodex_register_content_types(){
 foreach(array('woodex_service'=>array('Services','Service','dashicons-admin-tools'),'woodex_project'=>array('Portfolio','Project','dashicons-format-gallery'),'woodex_testimonial'=>array('Testimonials','Testimonial','dashicons-format-quote'),'woodex_faq'=>array('FAQs','FAQ','dashicons-editor-help')) as $type=>$data){register_post_type($type,array('labels'=>array('name'=>$data[0],'singular_name'=>$data[1]),'public'=>true,'show_in_rest'=>true,'menu_icon'=>$data[2],'supports'=>array('title','editor','thumbnail','excerpt')));}}
add_action('init','woodex_register_content_types');
