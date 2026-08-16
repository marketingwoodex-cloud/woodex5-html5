<?php get_header(); ?><main><?php while(have_posts()):the_post(); ?><article <?php post_class('woodex-page'); ?>><?php the_content(); ?></article><?php endwhile; ?></main><?php get_footer(); ?>
