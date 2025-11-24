# JJL Solutions Website

Professional IT consulting and support website for JJL Solutions.

## Folder Structure

```
jjlsolutions-site/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All website styles
├── images/
│   └── circuit-board-bg.png  # Background image
└── js/                 # For future JavaScript files
```

## Setup for GitHub Pages

1. Upload all files to your GitHub repository, maintaining the folder structure
2. In your GitHub repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: main (or master) → root folder
   - Save

3. Your site will be live at: `https://yourusername.github.io/repository-name/`

## Adding Your Custom Domain (jjlsolutions.com)

1. In GitHub Pages settings, add your custom domain: `jjlsolutions.com`
2. In GoDaddy DNS settings, add these records:
   - Type: A Record, Host: @, Points to: `185.199.108.153`
   - Type: A Record, Host: @, Points to: `185.199.109.153`
   - Type: A Record, Host: @, Points to: `185.199.110.153`
   - Type: A Record, Host: @, Points to: `185.199.111.153`
   - Type: CNAME, Host: www, Points to: `yourusername.github.io`

## Updating Content

- **Text/Content**: Edit `index.html`
- **Colors/Styling**: Edit `css/style.css`
- **Images**: Add to `images/` folder and reference as `images/your-image.png`

## Adding More Images

Simply place image files in the `images/` folder and reference them in your HTML:
```html
<img src="images/your-image.png" alt="Description">
```

Or in CSS:
```css
background-image: url('../images/your-image.png');
```

## Color Scheme

Current colors (defined in style.css):
- Primary Purple: #a78bfa
- Secondary Pink: #ec4899
- Dark Background: #18181b
- Text: #fafafa

To change colors, edit the `:root` variables in `css/style.css`.

## Contact Information

Update your contact details in `index.html`:
- Email: Line 253
- Phone: Line 264
