# Hostinger Upload Guide

## Required before upload

- WordPress installed on Hostinger.
- Parent theme ZIP available.
- Elementor Free installed.
- XPRO installed.
- WPForms installed.
- Novamira installed.
- Database and files backed up.

## Upload order

1. Install the parent theme.
2. Update `Template:` in the child theme `style.css` with the actual parent theme slug.
3. Zip `wordpress-package/wp-content/themes/woodex-interior-child/` and upload the child theme.
4. Activate the child theme.
5. Zip `wordpress-package/wp-content/plugins/woodex-core/` and install it as a plugin.
6. Activate Woodex Core.
7. Install/activate Elementor, XPRO, WPForms, and Novamira.
8. Import media from `source-html/assets/images/`.
9. Build/import XPRO Header and Footer.
10. Create pages and menu from the WordPress master plan.
11. Set Home as the static front page.
12. Configure Woodex Settings.
13. Configure WPForms email and booking/WhatsApp links.
14. Test mobile, desktop, forms, links, and accessibility.

## Important

The parent theme and child theme cannot be safely packaged as a complete install until the actual parent theme ZIP and child ZIP are supplied. The current child theme is a scaffold with a placeholder parent slug.
