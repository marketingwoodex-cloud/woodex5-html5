# Woodex Interior — Complete Elementor + JSON + AgentBridge System

## Master rules

1. Use Elementor Free native widgets wherever possible.
2. Build every layout with Elementor Containers.
3. Do not use Inner Sections.
4. Do not use Atomic Editor or Atomic Elements.
5. Use XPRO for the global header and footer.
6. Use WPForms for every contact/inquiry form.
7. Keep all content and page structure JSON-ready.
8. Use Novamira only as a structure/reference assistant.
9. Keep backups before theme, plugin, or database changes.

---

## 1. Complete package structure

```text
WP-INTERIOR/
├── wordpress-master-plan.md
├── wordpress-elementor-complete-system.md
├── agentbridge-simple-connect.md
├── source-html/
├── wordpress-package/
│   ├── wp-content/
│   │   ├── themes/
│   │   │   └── woodex-interior-child/
│   │   ├── plugins/                 # instructions only; never bundle premium plugin files
│   │   └── mu-plugins/
│   ├── elementor-json/
│   │   ├── site-settings.json
│   │   ├── global-colors.json
│   │   ├── global-fonts.json
│   │   ├── header-xpro.json
│   │   ├── footer-xpro.json
│   │   ├── homepage.json
│   │   ├── services-index.json
│   │   ├── service-detail.json
│   │   ├── portfolio-index.json
│   │   ├── project-detail.json
│   │   ├── process.json
│   │   ├── journal-index.json
│   │   ├── article-detail.json
│   │   └── contact.json
│   ├── content-json/
│   │   ├── site.json
│   │   ├── navigation.json
│   │   ├── services.json
│   │   ├── projects.json
│   │   ├── articles.json
│   │   ├── faqs.json
│   │   └── testimonials.json
│   ├── media/
│   └── docs/
```

### JSON separation

There are two JSON types:

#### Elementor import JSON

Used for Elementor template imports and saved sections. These are generated from WordPress/Elementor and should not be edited manually unless the format is understood.

#### Content JSON

Used as the source of truth for page text, services, projects, articles, navigation, FAQs, and testimonials. This makes the system ready for a future React or CMS migration.

---

## 2. Elementor native widget map

### Header

- Container
- Image or Site Logo widget
- WordPress Menu / XPRO menu widget
- Button widget
- Icon widget

### Hero

- Parent Container
- Heading widget
- Text Editor widget
- Button widget
- Image widget or background image
- Icon widget
- HTML widget only for the grid-line overlay if native controls cannot provide it

### Our Approach

- Container
- Heading
- Text Editor
- Icon List or nested Containers
- Counter widget only for verified metrics

### Core Services

- Container grid
- Heading
- Text Editor
- Button
- Icon
- Image widget where approved

### Selected Work

- Container grid
- Image
- Heading
- Text Editor
- Button
- Loop/grid widget only if available without Pro; otherwise native Containers and duplicated cards

### Process

- Containers
- Heading
- Icon List
- Text Editor
- Divider
- Accordion for mobile if required

### Journal

- Containers
- Image
- Heading
- Text Editor
- Button
- WordPress Posts widget only if available in the installed stack; otherwise manually managed cards or an approved addon

### Contact

- WPForms shortcode widget
- Heading
- Text Editor
- Button/WhatsApp link
- Icon List

### Footer

- Containers
- Site Logo
- Heading
- Text Editor
- WordPress Menu
- Button
- Icon
- Divider

---

## 3. Elementor template import system

### Import order

1. Site settings
2. Global colors
3. Global fonts
4. Header XPRO template
5. Footer XPRO template
6. Button and section saved styles
7. Homepage sections
8. Services index
9. Service detail template
10. Portfolio index
11. Project detail template
12. Process page
13. Journal index
14. Article detail template
15. Contact page
16. Thank-you page
17. Legal pages

### Template naming

Use predictable names:

- `WOODex / Global / Header`
- `WOODex / Global / Footer`
- `WOODex / Section / Hero Slide`
- `WOODex / Section / Core Services`
- `WOODex / Section / Selected Work`
- `WOODex / Page / Services Index`
- `WOODex / Template / Service Detail`
- `WOODex / Template / Project Detail`
- `WOODex / Template / Article Detail`
- `WOODex / Form / Free Consultation`

### Import acceptance

- [ ] All JSON imports complete without errors.
- [ ] No Atomic elements appear.
- [ ] No Inner Sections appear.
- [ ] Containers use correct direction, gap, width, and responsive settings.
- [ ] Header/footer assignments are global.
- [ ] All links point to WordPress page URLs.

---

## 4. Content JSON schema

### `site.json`

```json
{
  "brand": "Woodex Interior",
  "market": "Pakistan nationwide",
  "email": "hello@woodexinterior.com",
  "whatsapp": "PENDING_APPROVAL",
  "responseTime": "PENDING_APPROVAL",
  "tagline": "Design · build · deliver"
}
```

### `services.json`

```json
[
  {
    "slug": "commercial-interior",
    "group": "Interior Design",
    "title": "Commercial Interior",
    "promise": "Spaces built to perform, not just look good.",
    "summary": "",
    "deliverables": [],
    "timelineFactors": [],
    "costFactors": [],
    "heroImage": "",
    "relatedProjects": [],
    "seo": {"title": "", "description": ""}
  }
]
```

### `projects.json`

```json
[
  {
    "slug": "quiet-house",
    "title": "The Quiet House",
    "category": "Residential",
    "city": "PENDING_APPROVAL",
    "area": "PENDING_APPROVAL",
    "duration": "PENDING_APPROVAL",
    "heroImage": "",
    "gallery": [],
    "brief": "",
    "response": "",
    "result": "",
    "relatedServices": []
  }
]
```

### `articles.json`

Required fields:

- slug
- title
- category
- excerpt
- date
- reading time
- hero image
- body/content
- related services
- related projects
- SEO metadata

---

## 5. WPForms system

### Form

`Woodex Free Consultation Form`

### Fields

- Full name
- Email
- WhatsApp/phone
- City
- Project type
- Service needed
- Approximate area
- Timeline
- Budget range
- Message
- Floor plan upload
- Consent checkbox

### Configuration

- Email notification to approved Woodex inbox.
- Confirmation message or redirect to Thank You.
- Honeypot/spam protection.
- File upload restrictions.
- WhatsApp CTA next to the form.
- No fake WhatsApp number in production.

---

## 6. XPRO complete setup

### Header

- Build with Containers only.
- Use the existing WordPress menu.
- Use XPRO responsive controls.
- Save to XPRO library.
- Assign globally.
- Test on every page.

### Footer

- Build with Containers only.
- Use four-column desktop layout.
- Stack to one column on mobile.
- Add legal links.
- Save to XPRO library.
- Assign globally.

### XPRO QA

- [ ] Header does not duplicate.
- [ ] Footer does not duplicate.
- [ ] Desktop menu hidden on mobile.
- [ ] Mobile menu hidden on desktop.
- [ ] Services dropdown stays inside viewport.
- [ ] Active page state works.
- [ ] Logo returns home.

---

## 7. Simple AgentBridge connection

### What AgentBridge does

AgentBridge provides an authenticated WordPress MCP endpoint so an AI client can inspect and manage WordPress content, themes, plugins, media, menus, pages, options, and templates.

### Endpoint

```text
https://interior.woodex.com.pk/wp-json/agentbridge/v1/mcp
```

### Use a WordPress Application Password

Do not use the normal administrator password. Create a temporary WordPress Application Password for a temporary implementation administrator with the minimum required capability. Revoke it after the build.

### Claude Code

```bash
claude mcp add wordpress \
  --env WP_API_URL="https://interior.woodex.com.pk/wp-json/agentbridge/v1/mcp" \
  --env WP_API_USERNAME="IMPLEMENTATION_USERNAME" \
  --env WP_API_PASSWORD="APPLICATION_PASSWORD" \
  -- npx -y @automattic/mcp-wordpress-remote@latest
```

### Claude Desktop / Cursor / Hermes-compatible MCP client

```json
{
  "mcpServers": {
    "wordpress": {
      "type": "http",
      "url": "https://interior.woodex.com.pk/wp-json/agentbridge/v1/mcp",
      "headers": {
        "Authorization": "Basic BASE64_USERNAME_AND_APPLICATION_PASSWORD"
      }
    }
  }
}
```

### Simple connection test

1. Open the MCP client configuration.
2. Add the endpoint.
3. Add the temporary WordPress username.
4. Add the WordPress Application Password.
5. Restart the MCP client.
6. Run `get_site_info`.
7. Run `list_themes`.
8. Run `list_plugins`.
9. Confirm Elementor, XPRO, WPForms, and Novamira.
10. Create a backup before write operations.

### Safe first commands

- `get_site_info`
- `list_themes`
- `list_plugins`
- `list_posts`
- `get_option`

Do not begin with:

- `eval_php`
- `run_sql` writes
- `delete_file`
- `delete_post`
- theme switching
- plugin deletion

### Permission issue troubleshooting

If AgentBridge returns `401` or `rest_forbidden`:

- Confirm the application password belongs to the exact WordPress username.
- Confirm the account has `manage_options`.
- Confirm Application Passwords are enabled.
- Check security plugins and Hostinger firewall rules.
- Confirm the endpoint is not blocked by Basic Auth restrictions.
- Generate a new Application Password.
- Test with `get_site_info` before write operations.

---

## 8. Complete build sequence

### Phase 1 — WordPress environment

- [ ] Theme ZIP received.
- [ ] Child ZIP received.
- [ ] Parent theme installed.
- [ ] Child theme installed.
- [ ] Elementor Free active.
- [ ] XPRO active.
- [ ] WPForms active.
- [ ] Novamira active.
- [ ] Backup created.

### Phase 2 — Design system

- [ ] Global colors.
- [ ] Global fonts.
- [ ] Container defaults.
- [ ] Button defaults.
- [ ] Responsive settings.
- [ ] Motion settings.

### Phase 3 — Templates

- [ ] Header XPRO.
- [ ] Footer XPRO.
- [ ] Homepage.
- [ ] Services index.
- [ ] Service detail.
- [ ] Portfolio index.
- [ ] Project detail.
- [ ] Process.
- [ ] Journal index.
- [ ] Article detail.
- [ ] Contact.
- [ ] Thank-you.
- [ ] Legal pages.

### Phase 4 — Content

- [ ] Import JSON content data into the relevant page/content workflow.
- [ ] Add all 15 services.
- [ ] Add projects.
- [ ] Add articles.
- [ ] Add local images.
- [ ] Add approved contact details.

### Phase 5 — Launch

- [ ] Create menu.
- [ ] Assign menu location.
- [ ] Set homepage.
- [ ] Configure WPForms.
- [ ] Test email/WhatsApp.
- [ ] Test mobile.
- [ ] Test accessibility.
- [ ] Test performance.
- [ ] Publish.

---

## Immediate next action

Upload `theme.zip` and `child.zip`, then connect AgentBridge using a temporary WordPress Application Password. The prepared package and JSON-ready content are ready for the Elementor build.
