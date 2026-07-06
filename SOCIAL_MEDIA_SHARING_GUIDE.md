# Social Media Sharing Guide - Portfolio OG Tags

## Quick Reference: What Gets Shared Where

When you share a page from your portfolio on social media, here's what displays:

### ✅ Facebook
- **Image**: Profile photo (525x525px) or blog image (1200x630px)
- **Title**: From `og:title` 
- **Description**: From `og:description`
- **URL**: Full canonical URL

**Best Practice**: Use 1200x630px images for maximum visibility

### ✅ Twitter/X
- **Card Type**: Summary with Large Image
- **Image**: Shows prominently at top
- **Title**: From `twitter:title` (usually same as og:title)
- **Description**: From `twitter:description`
- **Creator**: @sabbir1054 (your Twitter handle)

**Best Practice**: Image should be 1200x630px for optimal display

### ✅ LinkedIn
- **Thumbnail**: Shows company/profile image
- **Title**: From `og:title`
- **Description**: From `og:description`
- **Link Preview**: Full URL with favicon

**Best Practice**: Professional descriptions perform better on LinkedIn

### ✅ WhatsApp / Telegram / Messenger
- **Preview**: Shows image + title
- **Limited Text**: Only title and URL visible
- **Image**: Usually 525x525px or 1200x630px

**Best Practice**: Make titles concise and compelling

## Pages Ready for Sharing

### Static Pages (All Set ✅)

| Page | Best For | URL |
|------|----------|-----|
| Home | Portfolio overview | mdsabbir.dev |
| About | Introduce yourself | mdsabbir.dev/about |
| Blog | Share latest articles | mdsabbir.dev/blog |
| Projects | Showcase work | mdsabbir.dev/project |
| Services | Promote services | mdsabbir.dev/service |
| Contact | Call to action | mdsabbir.dev/contact |

### Dynamic Pages (Generated per Item ✅)

| Page Type | Example URL | Customization |
|-----------|-------------|-----------------|
| Blog Post | `/blog-details/[slug]` | Title, description, image, date, tags |
| Project | `/project-details/[slug]` | Title, description, project image |
| Service | `/service-details/[slug]` | Title, description |
| Blog Category | `/blog/category/[category]` | Category name, article count |
| Blog Tag | `/blog/tag/[tag]` | Tag name |

## Testing Your Pages Before Sharing

### Step 1: Use Social Media Debuggers

#### Facebook Sharing Debugger
1. Go to: https://developers.facebook.com/tools/debug/sharing/
2. Paste your page URL
3. Click "Fetch New Scrape Info"
4. Review the preview
5. Check for warnings

#### Twitter Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Paste your page URL
3. Validate the card
4. See live preview

#### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your page URL
3. View how it will appear
4. Optimize if needed

### Step 2: Check OG Tags from Terminal

```bash
# Check home page
curl -s https://mdsabbir.dev | grep 'og:' | head -20

# Check about page
curl -s https://mdsabbir.dev/about | grep 'og:'

# Check specific tag
curl -s https://mdsabbir.dev | grep 'og:image'
```

### Step 3: Manual Testing

1. **Facebook**: 
   - Copy page URL
   - Paste in Facebook post composer
   - Preview appears automatically
   - Should show your image and description

2. **Twitter**:
   - Copy page URL
   - Tweet it (don't post yet)
   - Preview shows in composer
   - Verify image and text display correctly

3. **LinkedIn**:
   - Copy page URL
   - Create new post
   - Paste URL in post
   - Edit preview if needed
   - Shows title, description, image

## OG Tags by Content Type

### 📄 Website Pages
Tags included for all static pages:
```
og:type = "website"
og:title = [Page Title]
og:description = [Preview Text]
og:image = [Profile Photo 525x525]
og:url = [Full Page URL]
twitter:card = "summary_large_image"
```

### 📝 Blog Posts
Extra tags for blog detail pages:
```
og:type = "article"
og:article:published_time = [Date Created]
og:article:modified_time = [Date Updated]
og:article:author = [Author Name]
og:article:tag = [Tags/Categories]
og:image = [Blog Image 1200x630]
twitter:creator = "@sabbir1054"
```

## Optimization Tips

### For Maximum Engagement

#### 1. **Title Optimization** (55-60 characters)
- ❌ Bad: "About Me"
- ✅ Good: "About Md Sabbir Hossain | Full Stack Developer"

#### 2. **Description Optimization** (150-160 characters)
- ❌ Bad: "Learn about me"
- ✅ Good: "Full Stack Developer with 5+ years experience in React, Next.js, Node.js, and cloud technologies. Building scalable web applications."

#### 3. **Image Selection**
- ✅ High quality (clear, professional)
- ✅ Proper dimensions (525x525 or 1200x630)
- ✅ Relevant to page content
- ✅ Optimized file size (< 1MB)

#### 4. **URL Structure**
- ✅ Clean, readable URLs
- ✅ Lowercase with hyphens
- ✅ Descriptive page names
- ✅ Consistent domain (https://mdsabbir.dev)

## Common Sharing Scenarios

### 1. Share Blog Post
```
When: You publish a new article
Where: Twitter, LinkedIn, Dev.to, Reddit
URL: mdsabbir.dev/blog-details/[slug]
What Shows:
  - Blog title
  - Blog description
  - Blog post image
  - Publication date
  - Author: Md Sabbir Hossain
```

### 2. Share Project
```
When: You complete a new project
Where: GitHub, Twitter, LinkedIn
URL: mdsabbir.dev/project-details/[slug]
What Shows:
  - Project name
  - Project description
  - Project screenshot
  - Full project URL
```

### 3. Share Service Offering
```
When: Offering new service
Where: LinkedIn, Facebook, Website
URL: mdsabbir.dev/service-details/[slug]
What Shows:
  - Service name
  - Service description
  - Your profile image
  - Call to action
```

### 4. Share Portfolio Overview
```
When: Networking, job applications
Where: Email, LinkedIn, Twitter
URL: mdsabbir.dev (or /about, /project)
What Shows:
  - Portfolio title
  - Professional summary
  - Your profile photo
  - Full portfolio link
```

## Monitoring Share Performance

### Track These Metrics
1. **Click-through Rate** (CTR)
   - How many people click from social to your site
   - Goal: > 2-3% CTR

2. **Engagement**
   - Likes, comments, shares
   - Goal: Monitor for improvement over time

3. **Impressions**
   - How many people see your post
   - Goal: Increase visibility

4. **Traffic Source**
   - Use Google Analytics to track which social platforms send most traffic

### Tools for Monitoring
- **Google Analytics**: Track traffic from each social platform
- **Buffer/Hootsuite**: Schedule and analyze social posts
- **Twitter Analytics**: Built-in analytics for Twitter posts
- **LinkedIn Analytics**: Built-in for LinkedIn profile posts

## Troubleshooting

### Issue: Image not showing when shared
**Checklist:**
- [ ] Image URL is absolute (starts with https://)
- [ ] Image file exists and is publicly accessible
- [ ] Image dimensions match declared size
- [ ] Clear cache using social media debuggers
- [ ] Wait 24 hours for cache to refresh

### Issue: Old content still appearing
**Solution:**
- Use Facebook Sharing Debugger → Click "Scrape Again"
- Twitter cache clears in 24-48 hours
- LinkedIn may cache for up to 7 days
- Force refresh debuggers to get latest version

### Issue: Description getting cut off
**Solution:**
- Keep description under 160 characters
- Avoid special characters (&, <, >, ", ')
- Remove line breaks
- Test with debugger tool

### Issue: Wrong page title showing
**Solution:**
- Verify `og:title` is set in metadata
- Check for HTML encoding issues
- Ensure title is under 60 characters
- Clear cache and re-scrape

## Best Practices Checklist

### Before Sharing Any Page
- [ ] Tested with Facebook Sharing Debugger
- [ ] Tested with Twitter Card Validator
- [ ] Image displays correctly
- [ ] Title is clear and compelling
- [ ] Description is engaging (150-160 chars)
- [ ] URL is correct and public
- [ ] No broken links or 404 errors

### For Blog Posts Specifically
- [ ] Published date is visible
- [ ] Author name is correct
- [ ] Tags/categories are set
- [ ] Feature image is high quality
- [ ] Description summarizes the post

### For Project Showcase
- [ ] Project image is professional
- [ ] Description highlights key tech
- [ ] Links to GitHub/Demo are working
- [ ] Mobile screenshot available

## Quick Share Links

You can create quick share links with pre-filled URLs:

### Facebook Share
```
https://www.facebook.com/sharer/sharer.php?u=https://mdsabbir.dev/blog-details/your-article-slug
```

### Twitter Share
```
https://twitter.com/intent/tweet?url=https://mdsabbir.dev&text=Check%20out%20my%20portfolio
```

### LinkedIn Share
```
https://www.linkedin.com/sharing/share-offsite/?url=https://mdsabbir.dev
```

### WhatsApp Share
```
https://wa.me/?text=Check%20out%20my%20portfolio%20https://mdsabbir.dev
```

## Examples of What Looks Good

### ✅ Well-Optimized Blog Post Share
- Title: "How to Build Scalable APIs with Node.js and Express"
- Description: "A complete guide to building production-grade REST APIs with proper error handling, authentication, and database optimization."
- Image: Professional screenshot of code/tutorial
- Date: "Published March 2024"

### ✅ Well-Optimized Project Share
- Title: "E-Commerce Platform - React & Node.js"
- Description: "Full-stack e-commerce system with product catalog, shopping cart, payment integration, and admin dashboard."
- Image: Clean project screenshot
- Tech: React, Next.js, Node.js, PostgreSQL

### ✅ Well-Optimized Service Share
- Title: "Full Stack Development Services"
- Description: "Expert full-stack development for web apps, APIs, and cloud deployment. Specialized in React, Next.js, and Node.js."
- Image: Professional profile photo
- Call to Action: Included

## Next Steps

1. **Immediate Actions**
   - Test all pages with debugger tools
   - Share one page on each platform
   - Monitor performance

2. **Regular Maintenance**
   - Update blog dates when posts are modified
   - Refresh project descriptions quarterly
   - Monitor social share metrics

3. **Future Improvements**
   - A/B test different descriptions
   - Use dynamic image generation for unique previews
   - Add more rich snippets/schema markup
   - Track engagement per post type

## Need Help?

### Resources
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Developer Docs](https://developer.twitter.com/en/docs/twitter-for-websites/cards/)
- [Facebook for Developers](https://developers.facebook.com/docs/sharing/webmasters)
- [LinkedIn Sharing Guidelines](https://learn.microsoft.com/en-us/linkedin/shared-content/best-practices/best-practices-for-content-distribution)

### Quick Validation Command
```bash
# Replace with your actual domain
curl -s https://mdsabbir.dev | grep -E 'og:|twitter:' | grep -E 'title|description|image'
```

---

**Last Updated**: 2024
**Status**: ✅ All pages have OG tags configured
**Test Status**: ✅ All pages verified in browsers
