# Sector 36 - Fan Website

A fan-focused website for the hard military sci-fi novel "Sector 36" set in The Viridian Shroud universe.

## Project Structure

```
sector36/
├── index.html              # Home page
├── story.html              # Synopsis, characters, quotes, themes
├── universe.html           # Technology, factions, map, timeline
├── classified.html         # In-universe classified documents
├── behind-the-scenes.html  # Craft essays and worldbuilding process
├── about.html              # Author bio and purchase links
├── css/
│   └── styles.css          # Main stylesheet
├── js/
│   └── main.js             # JavaScript functionality
└── assets/
    └── images/
        ├── banner.jpg      # Hero banner image (place your image here)
        ├── map.jpg         # Viridian Shroud star map (place your image here)
        └── cover.jpg       # Book cover image (place your image here)
```

## Setup Instructions

1. **Add Your Images**
   
   Place your images in the `assets/images/` folder:
   - `banner.jpg` - Hero banner for the homepage (recommended: 1920x1080 or larger)
   - `map.jpg` - The Viridian Shroud star map (recommended: 1600x900 or larger)
   - `cover.jpg` - Book cover image (recommended: 600x900 or similar book aspect ratio)

2. **Update Links**
   
   Search for `href="#"` in all HTML files and replace with your actual URLs:
   - Substack subscription link
   - Amazon purchase link
   - Apple Books purchase link
   - Kobo purchase link
   - Barnes & Noble purchase link
   - Google Play purchase link
   - Social media links (Twitter/X, Goodreads, etc.)
   - Contact email address

3. **Customize Author Information**
   
   Edit `about.html` to add:
   - Author name
   - Author bio
   - Author photo (optional)
   - Contact information

4. **Configure Newsletter Form**
   
   The newsletter forms are currently set up as placeholders. To make them functional:
   - Integrate with a service like Mailchimp, ConvertKit, or Buttondown
   - Update the form `action` attribute with your form endpoint
   - Or add JavaScript handling for your preferred email service

## Running Locally

This is a static site, so you can run it with any local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Deployment

This site can be deployed to any static hosting service:

- **GitHub Pages** - Push to a GitHub repo and enable Pages
- **Netlify** - Drag and drop the folder or connect to Git
- **Vercel** - Import the project
- **Cloudflare Pages** - Connect to your Git repository
- **AWS S3 + CloudFront** - Upload files to S3 bucket

## Features

- **Responsive Design** - Works on all device sizes
- **Military Sci-Fi Aesthetic** - Dark theme with accent colors and terminal-style elements
- **Classified Documents** - Authentic-looking briefings with redactions and classification markings
- **Interactive Tabs** - Technology, factions, map, and timeline on The Universe page
- **Email Capture** - Newsletter signup forms throughout the site
- **Accessible** - Semantic HTML and ARIA labels for screen readers

## Customization

### Colors

Edit the CSS custom properties in `css/styles.css` to change the color scheme:

```css
:root {
  --color-accent-primary: #00d4aa;    /* Main accent (teal) */
  --color-accent-secondary: #0099cc;  /* Secondary accent (blue) */
  --color-accent-warning: #ff6b35;    /* Warning/Consortium (orange) */
  --color-accent-danger: #dc3545;     /* Danger/Top Secret (red) */
  --color-accent-classified: #c9a227; /* Classified marking (gold) */
}
```

### Fonts

The site uses Google Fonts:
- **Orbitron** - Display/heading font (sci-fi aesthetic)
- **Inter** - Body text
- **JetBrains Mono** - Monospace for code/terminal elements

### Adding New Classified Documents

Use this template in `classified.html`:

```html
<div class="classified-doc">
  <div class="classified-header">
    <span class="classified-marking marking-top-secret">TOP SECRET</span>
    <span class="classified-id">DOC-XXX-XXXX-XXXX</span>
  </div>
  <div class="classified-body">
    <!-- Document content -->
  </div>
  <div class="classified-footer">
    <span>CLASSIFICATION LEVEL</span>
    <span>Page X of X</span>
  </div>
</div>
```

Use `<span class="redacted">XXXXXXXXX</span>` for inline redactions.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome for Android)

## License

Content © 2025 [Author Name]. All rights reserved.

---

*"In shadow we serve."*
