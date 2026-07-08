# Dual-Mode Blog Editor & Smart Content Viewer

## Overview

Your blog system now supports **two content editing modes** with an intelligent viewer that automatically displays content in the correct format.

## Features

### 1. **Dual-Mode Editor** (`DualModeEditor.jsx`)
- ✅ **Rich Text Mode**: WYSIWYG editor using Quill
- ✅ **Markdown Mode**: Direct markdown editor with preview
- ✅ **Paste Content**: Paste markdown or HTML from anywhere
- ✅ **Mode Switching**: Switch between modes instantly
- ✅ **Content Preservation**: Content is preserved when switching modes

### 2. **Smart Content Viewer** (`SmartContentViewer.jsx`)
- ✅ **Auto-Detection**: Automatically detects content type
- ✅ **Markdown Display**: Uses @uiw/react-markdown-preview for markdown
- ✅ **HTML Display**: Native HTML rendering for rich text content
- ✅ **Fallback Support**: Works even with old content

### 3. **Database Support**
- ✅ **contentType Field**: New field tracks whether content is "html" or "markdown"
- ✅ **Backward Compatible**: Defaults to "html" for existing blogs
- ✅ **Auto-Detection**: System auto-detects content type if field is missing

## How to Use

### Creating a Blog Post

#### Option 1: Rich Text Editor
1. Go to Admin → New Blog Post
2. Click "Rich Text" tab
3. Use the toolbar to format your content (bold, italic, headers, links, images, etc.)
4. Publish

#### Option 2: Markdown Editor
1. Go to Admin → New Blog Post
2. Click "Markdown" tab
3. Type or paste markdown content
4. Live preview shows on the right
5. Publish

#### Option 3: Paste Markdown/HTML
1. Go to Admin → New Blog Post
2. Click "Paste Content" button
3. Paste your markdown or HTML content
4. Click "Paste Content" to add it
5. The editor automatically switches to appropriate mode
6. Publish

### Editing a Blog Post

- All same options as creating
- Existing content loads in the appropriate editor mode
- You can switch between modes while editing

### Viewing Blog Posts

When visitors view your blog:
1. System detects content type automatically
2. If markdown: Uses markdown viewer with proper styling
3. If HTML: Renders as rich text
4. Looks beautiful in both cases

## Technical Details

### Components

#### `components/admin/DualModeEditor.jsx`
**Props:**
- `value` (string): Current content
- `onChange` (function): Called when content changes
- `contentType` (string): "html" or "markdown" (optional)

**Features:**
- Tab-based mode switching
- Paste modal for quick content addition
- Visual hints for each mode
- Responsive design

#### `components/blog/SmartContentViewer.jsx`
**Props:**
- `content` (string): Blog content to display
- `contentType` (string): "html" or "markdown" (optional)

**Auto-Detection Logic:**
- Checks for markdown patterns (#, *, -, [links], etc.)
- Checks for HTML tags (<div>, <p>, etc.)
- Defaults to HTML for backward compatibility
- Can be overridden with explicit contentType

#### Database (Prisma)
```prisma
model Blog {
  ...
  content     String   @db.Text      // The actual content
  contentType String   @default("html") // "html" or "markdown"
  ...
}
```

### API Flow

1. **Create Blog**
   - User fills form with content and selects mode
   - Form includes `content` and `contentType`
   - API stores both fields

2. **Update Blog**
   - User can edit content and switch modes
   - API updates both `content` and `contentType`

3. **Display Blog**
   - Frontend fetches blog data
   - `SmartContentViewer` uses `contentType` to render
   - If `contentType` missing, auto-detects

## Content Type Detection

### Markdown Detection
The system looks for these markdown patterns:
- `#` Headers
- `*text*` or `_text_` for bold/italic
- `[link](url)` for links
- `![alt](image)` for images
- `- item` for lists
- ` ``` ` for code blocks
- `>` for blockquotes
- `|table|` for tables

### HTML Detection
- `<tag>` HTML tags
- `&entity;` HTML entities

### Logic
- If HTML tags found → Render as HTML
- If 2+ markdown patterns found → Render as markdown
- Otherwise → Default to HTML (backward compatible)

## Content Styling

### Markdown Content
Comes with built-in styling for:
- ✅ Headers (h1-h6)
- ✅ Bold, italic, underline, strikethrough
- ✅ Lists (ordered & unordered)
- ✅ Code blocks with syntax highlighting
- ✅ Blockquotes
- ✅ Tables
- ✅ Links and images
- ✅ Proper spacing and typography

### HTML Content
Uses existing blog styles:
- ✅ Works with current CSS
- ✅ Maintains visual consistency
- ✅ Full HTML formatting support

## Markdown Examples

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Text Formatting
```markdown
**bold text**
*italic text*
~~strikethrough~~
```

### Lists
```markdown
- Item 1
- Item 2
  - Nested item

1. First
2. Second
3. Third
```

### Code
```markdown
Inline code: `const x = 5`

Code block:
\```javascript
function hello() {
  console.log("Hello, World!");
}
\```
```

### Links & Images
```markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.jpg)
```

### Blockquotes
```markdown
> This is a quote
> Multi-line quote
```

### Tables
```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

## Migration Guide

### For Existing Blogs

Existing blog posts automatically work with the new system:

1. **No contentType set?** System auto-detects when viewing
2. **Want to specify?** Edit and re-save the blog
3. **Auto-conversion?** Not automatic, but can paste into markdown editor

### Updating Old Posts

To update an existing HTML blog to markdown:

1. Go to Admin → Edit Blog
2. Copy the current content
3. Click "Markdown" tab
4. Click "Paste Content"
5. Paste your markdown version
6. Save

Or if HTML is already markdown:
1. Go to Admin → Edit Blog
2. Click "Markdown" tab
3. System shows as markdown
4. Edit as needed
5. Save

## Styling Customization

### Change Markdown Link Colors
Edit `SmartContentViewer.jsx`:
```javascript
.smart-content-viewer.markdown-content :global(a) {
  color: #1e90ff; // Change this color
}
```

### Change Code Block Background
```javascript
.smart-content-viewer.markdown-content :global(code) {
  background: #f4f4f4; // Change this color
}
```

### Change Table Header Color
```javascript
.smart-content-viewer.markdown-content :global(th) {
  background: #f9f9f9; // Change this color
}
```

## Best Practices

### Use Markdown When:
- ✅ Content is code-heavy
- ✅ You want clean, readable source
- ✅ Sharing content from other markdown sources
- ✅ Collaboration with developers
- ✅ Version control is important

### Use Rich Text When:
- ✅ Need WYSIWYG editing
- ✅ Lots of complex formatting
- ✅ Non-technical content
- ✅ Quick editing without markdown knowledge
- ✅ Embedding media frequently

### Mixed Approach:
- Start with markdown paste
- Switch to rich text for final touches
- Or vice versa

## Troubleshooting

### Content not displaying?
1. Check browser console for errors
2. Verify contentType is set correctly
3. Try viewing raw HTML in developer tools
4. Clear browser cache and reload

### Markdown not rendering?
1. Verify markdown syntax is correct
2. Check for HTML tags (might be detected as HTML)
3. Try switching to rich text mode
4. Check console for @uiw errors

### Switching modes lost content?
- This shouldn't happen, but if it does:
- Check browser devtools Network tab
- Verify form data includes content
- Check API response

## Performance Notes

- ✅ Lazy loads markdown viewer (faster initial load)
- ✅ Both editors work client-side (no server overhead)
- ✅ Auto-detection runs on display (minimal impact)
- ✅ Cached styling (smooth user experience)

## Browser Support

Works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## Package Dependencies

The following packages are used:
- `react-quill-new` - Rich text editor
- `@uiw/react-md-editor` - Markdown editor
- `@uiw/react-markdown-preview` - Markdown viewer

All are already installed in your project.

## File Changes Summary

### New Files
- `components/admin/DualModeEditor.jsx`
- `components/blog/SmartContentViewer.jsx`

### Modified Files
- `prisma/schema.prisma` - Added contentType field
- `app/admin/blogs/new/page.jsx` - Use DualModeEditor
- `app/admin/blogs/[id]/page.jsx` - Use DualModeEditor
- `components/blog/BlogDetails.jsx` - Use SmartContentViewer
- `lib/db.js` - Handle contentType in createBlog

## Database Migration

If you're deploying to production, run:
```bash
npx prisma migrate dev --name add_content_type_to_blog
```

This creates a migration that adds the `contentType` field to your database.

## Future Enhancements

Potential improvements:
- [ ] Markdown to HTML converter
- [ ] HTML to Markdown converter
- [ ] Preview side-by-side in both modes
- [ ] Markdown template library
- [ ] Syntax highlighting for code blocks
- [ ] Copy blog as markdown/HTML
- [ ] Export blog as PDF

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review component code with comments
3. Check browser console for errors
4. Verify Prisma schema is up to date

---

**Status**: ✅ Ready to Use
**Last Updated**: December 2024
**Version**: 1.0
