# OG Tags - Quick Start Guide

## For Users: Share Your Portfolio

### Copy → Paste → Share (3 Steps)

1. **Copy page URL**
   ```
   https://mdsabbir.dev/blog-details/how-to-build-apis
   ```

2. **Paste on social media**
   - Facebook: New Post → Paste URL
   - Twitter: New Tweet → Paste URL
   - LinkedIn: New Post → Paste URL

3. **Share!**
   Your image, title, and description auto-populate ✨

### What Gets Shared?

| Platform | Shows | Size |
|----------|-------|------|
| Facebook | Image + Title + Description | 1200x630 |
| Twitter | Large image card | 1200x630 |
| LinkedIn | Thumbnail + Title | 525x525 |
| WhatsApp | Preview image + link | 525x525 |

## For Developers: Add OG to New Pages

### Option 1: Simple (Copy-Paste)

```javascript
const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "Your Page Title",
  description: "Your page description...",
  alternates: { canonical: "/your-page" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/your-page`,
    siteName: "mdsabbir.dev",
    title: "Your Title | Md Sabbir Hossain",
    description: "Your description",
    images: [
      {
        url: "/assets/images/banner/banner-user-image-04.png",
        width: 525,
        height: 525,
        alt: "Alt text here",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Title | Md Sabbir Hossain",
    description: "Your description",
    images: ["/assets/images/banner/banner-user-image-04.png"],
  },
};
```

### Option 2: Using Utility (Better for DRY Code)

```javascript
import { generateOGMetadata, getArticleOGImage } from "@/lib/og-utils";

const SITE_URL = "https://mdsabbir.dev";

export async function generateMetadata({ params }) {
  const data = await fetchYourData(params.slug);

  return generateOGMetadata({
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/path/${params.slug}`,
    type: "article", // or "website"
    image: getArticleOGImage(data.imageSrc),
    publishedTime: data.createdAt?.toISOString(),
    tags: data.tags,
  });
}
```

## Pages Already Done ✅

### Static
- ✓ Home (/)
- ✓ About (/about)
- ✓ Contact (/contact)
- ✓ Blog (/blog)
- ✓ Projects (/project)
- ✓ Services (/service)

### Dynamic
- ✓ Blog Details (/blog-details/[slug])
- ✓ Project Details (/project-details/[slug])
- ✓ Service Details (/service-details/[slug])
- ✓ Blog Category (/blog/category/[category])
- ✓ Blog Tag (/blog/tag/[tag])

## Test Your Changes

### Using Terminal
```bash
# Check if OG tags exist
curl -s https://mdsabbir.dev/your-page | grep 'og:title'
```

### Using Tools
1. **Facebook**: developers.facebook.com/tools/debug/sharing/
2. **Twitter**: cards-dev.twitter.com/validator
3. **LinkedIn**: linkedin.com/post-inspector/

## Image Sizes

```
Website Pages:        525 x 525 px
Article/Blog Posts: 1200 x 630 px
```

## Utility Functions

```javascript
// From: lib/og-utils.js

generateOGMetadata({
  title,              // required
  description,        // required
  url,               // optional, defaults to SITE_URL
  type,              // "website" or "article"
  image,             // OG image object
  publishedTime,     // for articles
  tags,              // for articles
})

getFullImageUrl(imageSrc)        // Convert to absolute URL
getArticleOGImage(imageSrc)      // 1200x630 image
getWebsiteOGImage(imageSrc)      // 525x525 image
```

## Files Reference

```
lib/og-utils.js
  → Helper functions for OG tags

app/page.js
  → Home page OG

app/about/page.jsx
  → About page OG

app/contact/page.jsx
  → Contact page OG

app/(blogs)/blog/page.jsx
  → Blog list OG

app/(projects)/project/page.jsx
  → Projects list OG

app/(services)/service/page.jsx
  → Services page OG

app/(blogs)/blog-details/[slug]/page.jsx
  → Blog post OG (dynamic)

app/(projects)/project-details/[slug]/page.jsx
  → Project OG (dynamic)

app/(services)/service-details/[slug]/page.jsx
  → Service OG (dynamic)

app/(blogs)/blog/category/[category]/page.jsx
  → Category page OG (dynamic)

app/(blogs)/blog/tag/[tag]/page.jsx
  → Tag page OG (dynamic)
```

## Common OG Tag Properties

```javascript
// Basic
og:title              // Page title
og:description        // Page description
og:image              // Image URL
og:url                // Page URL

// Additional
og:type               // website or article
og:site_name          // Your site name
og:locale             // Language (en_US)
og:image:width        // Image width
og:image:height       // Image height
og:image:alt          // Image alt text

// For Articles
og:article:published_time   // ISO date
og:article:modified_time    // ISO date
og:article:author          // Author name
og:article:tag             // Tags

// Twitter
twitter:card          // summary_large_image
twitter:title         // Title
twitter:description   // Description
twitter:image         // Image URL
twitter:creator       // @handle
```

## Character Limits

```
Title:          55-60 characters (optimal)
Description:  150-160 characters (optimal)
URL:          No limit, must be absolute
Image Alt:    100-125 characters
```

## Deployment Checklist

Before deploying:
- [ ] All pages have OG tags
- [ ] Images are properly sized
- [ ] Titles under 60 chars
- [ ] Descriptions under 160 chars
- [ ] All URLs are absolute
- [ ] Tested with debugger tools

## Troubleshooting

### Image not showing?
```bash
1. Check URL is absolute (https://...)
2. Verify file exists and is public
3. Check dimensions match declared size
4. Use Facebook debugger → "Scrape Again"
```

### Old content still showing?
```
Facebook: Use debugger to force refresh
Twitter:  Wait 24-48 hours
LinkedIn: Wait up to 7 days
```

### Missing OG tag?
```bash
1. Verify metadata export exists
2. Check file is properly formatted
3. Restart dev server
4. Check with: curl -s URL | grep 'og:tag'
```

## Need More Info?

- **Technical Details**: Read `OG_IMPLEMENTATION.md`
- **Social Media Guide**: Read `SOCIAL_MEDIA_SHARING_GUIDE.md`
- **Full Checklist**: Read `OG_CHECKLIST.md`
- **Overview**: Read `README_OG_IMPLEMENTATION.md`

## Quick Links

- Facebook Debugger: https://developers.facebook.com/tools/debug/sharing/
- Twitter Validator: https://cards-dev.twitter.com/validator
- LinkedIn Inspector: https://www.linkedin.com/post-inspector/
- Open Graph Check: https://www.opengraphcheck.com/

---

✨ **You're ready to share!** Copy any portfolio URL and paste it on social media to see the magic happen. 🚀
