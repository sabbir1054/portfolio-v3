# Open Graph (OG) Meta Tags Implementation Guide

## Overview
This document outlines the implementation of Open Graph meta tags across the portfolio website. OG tags enable proper display of content when shared on social media platforms like Facebook, Twitter, LinkedIn, WhatsApp, and more.

## What are Open Graph Tags?
Open Graph is a protocol that allows any web page to become a rich object in a social graph. These meta tags control:
- Page title when shared
- Description/preview text
- Image displayed (1200x630px optimal)
- URL and site name
- Content type (article, website, etc.)

## Implementation Details

### Core Setup (app/layout.js)
- **Base URL**: `https://mdsabbir.dev`
- **Default Image**: `/assets/images/banner/banner-user-image-04.png` (525x525px)
- **Site Name**: `mdsabbir.dev`
- **Default Type**: `website`

### OG Tags Implemented

#### 1. **Static Pages** ✅
All static pages now have complete OG tags:

| Page | Route | OG Type | Image |
|------|-------|---------|-------|
| Home | `/` | website | 525x525 |
| About | `/about` | website | 525x525 |
| Contact | `/contact` | website | 525x525 |
| Blog List | `/blog` | website | 525x525 |
| Projects | `/project` | website | 525x525 |
| Services | `/service` | website | 525x525 |

**Included Meta Tags:**
- `og:type` - Content type (website)
- `og:title` - Optimized page title
- `og:description` - Engaging preview text
- `og:url` - Full canonical URL
- `og:image` - Profile image with proper dimensions
- `og:image:width`, `og:image:height`, `og:image:alt`
- `og:site_name` - Brand name
- `og:locale` - Language/locale
- `twitter:card` - Twitter-specific formatting (summary_large_image)
- `twitter:title`, `twitter:description`, `twitter:images`

#### 2. **Dynamic Pages** ✅

##### Blog Details (`/blog-details/[slug]`)
- **OG Type**: `article`
- **Image Handling**:
  - Uses blog's custom image if available
  - Falls back to profile image if not
  - Optimal dimensions: 1200x630px (for article previews)
- **Article-Specific Tags**:
  - `og:article:published_time` - From `createdAt`
  - `og:article:modified_time` - From `updatedAt`
  - `og:article:author` - Blog author name
  - `og:article:tag` - Blog tags/categories
  - `twitter:creator` - Twitter handle

##### Project Details (`/project-details/[slug]`)
- **OG Type**: `website`
- **Image Handling**:
  - Uses project's featured image if available
  - Optimal dimensions: 1200x630px
  - Falls back to profile image
- **Includes**: Title, description from database

##### Service Details (`/service-details/[slug]`)
- **OG Type**: `website`
- **Image Handling**: Uses profile image (525x525px)
- **Dynamic Title**: Service name + "| Md Sabbir Hossain"
- **Description**: From service data

##### Blog Category (`/blog/category/[category]`)
- **OG Type**: `website`
- **Dynamic Title**: Category name + "- Blog | Md Sabbir Hossain"
- **Description**: Describes blogs in category
- **Image**: Profile image (525x525px)

##### Blog Tag (`/blog/tag/[tag]`)
- **OG Type**: `website`
- **Dynamic Title**: Tag name + "- Blog | Md Sabbir Hossain"
- **Description**: Describes blogs with tag
- **Image**: Profile image (525x525px)

## Key Features

### 1. **Proper Image Dimensions**
- **Website Pages**: 525x525px (profile image)
- **Article Pages**: 1200x630px (blog post images)
- All images include width, height, and alt text

### 2. **Twitter Card Integration**
All pages include Twitter-specific meta tags:
```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="...">
<meta name="twitter:description" content="...">
<meta name="twitter:images" content="...">
<meta name="twitter:creator" content="@sabbir1054">
```

### 3. **Article Metadata** (For Blog Posts)
Blog detail pages include:
- Publication date
- Last modified date
- Author information
- Tags/categories
- Article type

### 4. **Fallback Handling**
- Dynamic images from database with fallback to profile image
- Proper URL validation (handles both absolute and relative URLs)
- Decoding of URL parameters for category/tag pages

## Utility File: `lib/og-utils.js`

### Available Functions

#### `generateOGMetadata(options)`
Main function to generate complete OG metadata objects.

**Options:**
```javascript
{
  title: string,                    // Required
  description: string,              // Required
  url: string,                      // Optional, defaults to SITE_URL
  type: "website" | "article",      // Default: "website"
  image: object | object[],         // OG image object(s)
  canonicalUrl: string,             // Optional canonical URL
  authors: string[],                // For articles
  publishedTime: ISO string,        // For articles
  modifiedTime: ISO string,         // For articles
  tags: string[],                   // For articles
  twitterCreator: string,           // Twitter handle
}
```

**Returns:**
```javascript
{
  title,
  description,
  alternates: { canonical: ... },
  openGraph: { ... },
  twitter: { ... }
}
```

#### `getFullImageUrl(imageSrc)`
Converts relative URLs to absolute URLs.
- Handles external URLs (returns as-is)
- Handles relative paths (prepends SITE_URL)
- Returns default image if null

#### `getArticleOGImage(imageSrc)`
Returns OG image object optimized for articles (1200x630px)

#### `getWebsiteOGImage(imageSrc)`
Returns OG image object optimized for websites (525x525px)

## How to Add OG Tags to New Pages

### Static Page Example:
```javascript
const SITE_URL = "https://mdsabbir.dev";

export const metadata = {
  title: "Page Title",
  description: "Page description...",
  alternates: { canonical: "/page-path" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_URL}/page-path`,
    siteName: "mdsabbir.dev",
    title: "Page Title | Md Sabbir Hossain",
    description: "Engaging preview text",
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
    title: "Page Title | Md Sabbir Hossain",
    description: "Engaging preview text",
    images: ["/assets/images/banner/banner-user-image-04.png"],
  },
};
```

### Dynamic Page Example (Using Utility):
```javascript
import { generateOGMetadata, getArticleOGImage } from "@/lib/og-utils";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await fetchData(slug);

  if (!data) return { title: "Not Found" };

  return generateOGMetadata({
    title: data.title,
    description: data.description,
    url: `${SITE_URL}/path/${slug}`,
    type: "article",
    image: getArticleOGImage(data.imageSrc),
    publishedTime: data.createdAt?.toISOString(),
    tags: data.tags,
  });
}
```

## Testing OG Tags

### Online Tools
1. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/sharing/
2. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
3. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/inspect/
4. **Open Graph Checker**: https://www.opengraphcheck.com/

### Testing Steps
1. Go to the testing tool
2. Enter your page URL (must be publicly accessible)
3. The tool will:
   - Parse and display all OG tags
   - Show preview of how it appears when shared
   - Highlight any missing or incorrect tags
   - Provide optimization suggestions

### Local Testing (Terminal)
```bash
# View all meta tags for a page
curl -s https://mdsabbir.dev/about | grep -E 'og:|twitter:' | head -20

# Check specific page
curl -s https://mdsabbir.dev/blog | grep 'og:image'
```

## Social Media Preview Examples

### When Shared on Facebook
- Shows OG image (525x525 or 1200x630)
- Title from `og:title`
- Description from `og:description`
- Site name at bottom

### When Shared on Twitter
- Uses `twitter:card` type (summary_large_image)
- Image displayed prominently (1200x630 optimal)
- Title and description underneath

### When Shared on LinkedIn
- Shows thumbnail image
- Full title and description
- Clickable link back to page

### When Shared on WhatsApp/Telegram
- Shows image preview
- Page title
- Link snippet

## Best Practices

### 1. **Image Optimization**
- ✅ Keep images under 1MB
- ✅ Use proper dimensions (525x525 or 1200x630)
- ✅ Use high-quality images (PNG or JPG)
- ✅ Always include alt text

### 2. **Descriptions**
- ✅ Keep titles under 60 characters
- ✅ Keep descriptions 150-160 characters
- ✅ Avoid keyword stuffing
- ✅ Make descriptions engaging and descriptive

### 3. **URLs**
- ✅ Always use absolute URLs (https://...)
- ✅ Include trailing slashes where appropriate
- ✅ Ensure URLs are publicly accessible

### 4. **Content Types**
- ✅ Use `article` type for blog posts
- ✅ Use `website` type for general pages
- ✅ Include article metadata (dates, authors, tags)

## Maintenance

### When to Update OG Tags
1. **Page Title Changes** - Update `og:title`
2. **Page Description Changes** - Update `og:description`
3. **Image Updates** - Update image URL and dimensions
4. **Content Type Changes** - Update `og:type`
5. **Publishing Articles** - Include `publishedTime`

### Monitoring
- Periodically test pages with social media validators
- Check broken image links
- Monitor share counts across platforms
- Update images if they're not displaying properly

## Common Issues & Solutions

### Issue: Image not showing
**Solution:**
- Verify image URL is absolute (starts with https://)
- Check image file exists and is publicly accessible
- Ensure dimensions match declared width/height
- Try re-running social media debuggers (may cache old versions)

### Issue: Description truncated
**Solution:**
- Keep description under 160 characters
- Remove special characters that may break parsing
- Avoid line breaks in description text

### Issue: Wrong page title showing
**Solution:**
- Verify `og:title` is set correctly
- Check for HTML encoding issues
- Clear social media cache with debugger tools

### Issue: Old content still showing when shared
**Solution:**
- Use Facebook Sharing Debugger to flush cache
- Wait 24-48 hours for Twitter cache to clear
- Force refresh may be needed in some cases

## Future Enhancements

1. **Dynamic Image Generation**: Create custom OG images per page using dynamic image generation
2. **Schema Markup**: Add structured data (JSON-LD) for rich snippets
3. **Localization**: Support multiple languages with locale-specific OG tags
4. **A/B Testing**: Test different descriptions/images for engagement
5. **Analytics Integration**: Track social shares and engagement

## Related Documentation

- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/markup)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Facebook Sharing Best Practices](https://developers.facebook.com/docs/sharing/webmasters/)

## Summary

All pages of the portfolio now have proper Open Graph meta tags configured:
- ✅ 11 pages with complete OG implementations
- ✅ Dynamic content support for blogs, projects, and services
- ✅ Twitter Card integration
- ✅ Article metadata for blog posts
- ✅ Proper fallback handling
- ✅ Reusable utility functions for future implementations

When you share any page on social media, it will display with:
- Your profile/project image
- Properly formatted title and description
- Rich preview experience
- Professional appearance
- Increased click-through rates
