# JJL Computer Solutions Website

Professional IT consulting and support website for JJL Computer Solutions.

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

## Contact Form Setup

The contact form uses Web3Forms (free service). To activate it:

1. Go to https://web3forms.com
2. Enter your email address
3. You'll receive an Access Key via email
4. Open `index.html` and find line ~245: `<input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE">`
5. Replace `YOUR_ACCESS_KEY_HERE` with your actual access key
6. Save and push to GitHub

That's it! Form submissions will be emailed to you. No backend needed.

## Cloudflare Pages Deployment

This site uses Cloudflare Pages with Functions for dynamic features.

### Deployment Settings

In Cloudflare Pages dashboard:
- **Build command**: (none - static site)
- **Build output directory**: `/` (root)
- **Framework preset**: None

### Facebook Reviews API

The `/api/reviews` endpoint fetches reviews from your Facebook page.

**Required Environment Variables** (set in Cloudflare Pages → Settings → Environment variables):

| Variable | Description |
|----------|-------------|
| `FB_PAGE_ID` | Your Facebook Page ID (numeric ID, not username) |
| `FB_PAGE_TOKEN` | Facebook Page Access Token with `pages_read_engagement` permission |

**Optional KV Namespace** (for caching):

1. Create a KV namespace in Cloudflare dashboard
2. Bind it to your Pages project as `REVIEWS_CACHE`
3. The function will cache reviews for 24 hours

**Getting a Facebook Page Token**:

1. Go to [Facebook Developers](https://developers.facebook.com)
2. Create an app (Business type)
3. Add the Facebook Login and Pages API products
4. Generate a Page Access Token with `pages_read_engagement` permission
5. For long-lived tokens, exchange the short-lived token via the Graph API

**If tokens are missing or invalid**: The reviews section simply won't appear on the homepage (graceful degradation).
