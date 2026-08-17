# Manual WordPress Upload Guide

## Before upload

1. Back up WordPress files and database.
2. Install WordPress 6.5+ and use PHP 8.1+ where supported.
3. Have Elementor Free, XPRO, WPForms, and Novamira ready.
4. Confirm the parent theme package and child theme package.

## Upload order

1. Upload/install `woodex-parent-theme.zip` from Appearance → Themes → Add New → Upload Theme.
2. Upload/install `woodex-child-theme.zip`.
3. Activate the child theme.
4. Install/activate `woodex-core-plugin.zip` from Plugins → Add New → Upload Plugin.
5. Install/activate Elementor Free, XPRO, WPForms, and Novamira.
6. Open Woodex Core → Setup Wizard.
7. Confirm the backup warning.
8. Import `options.json`, `pages.json`, `menus.json`, and `media-manifest.json` through the importer or use them as the manual checklist.
9. Import Elementor JSON files from `elementor-templates/` through Elementor → Tools → Import Kit/Templates, depending on the installed Elementor version.
10. Build/save XPRO Header and Footer in the XPRO library and assign them globally.
11. Create the Woodex Main Menu and assign it to the primary location.
12. Set Home as the static front page.
13. Configure WPForms and its email/confirmation settings.
14. Enter the official WhatsApp and booking URL in Woodex Settings.
15. Test every page, menu, form, image, and mobile layout.

## Elementor rules

- Use Containers only.
- Use native Elementor widgets wherever possible.
- Do not use Inner Sections.
- Do not use Atomic Editor or Atomic Elements.
- Do not use Elementor Pro widgets.

## Important

The minimal Elementor JSON envelopes are import placeholders. Final populated Elementor/XPRO exports must be generated from the connected WordPress site because template IDs and widget schemas are site-specific.
