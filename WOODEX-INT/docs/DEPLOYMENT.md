# Deployment Guide

## GitHub Pages

1. Create a new GitHub repository, for example `woodex-interior`.
2. Upload the contents of this folder to the repository root.
3. Commit to the `main` branch.
4. Open repository Settings → Pages.
5. Select “Deploy from a branch”.
6. Select `main` and `/root`.
7. Save and wait for deployment.
8. Confirm `index.html` loads.
9. Confirm relative links work on the published URL.

## Static hosting

The website needs no server runtime. Upload the complete folder while preserving:

- HTML files
- `assets/`
- `services/`
- JSON files

## Custom domain checklist

- Add domain in hosting dashboard.
- Add DNS records.
- Enable HTTPS.
- Verify homepage, services, portfolio, contact, and 404.
- Update sitemap domain in production.
- Add analytics only after privacy approval.
