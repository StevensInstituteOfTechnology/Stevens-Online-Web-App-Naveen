# Adding New Blog Posts to blogs.json

## Quick Reference.

To add a new blog post to `blogs.json`, follow this structure:

```json
{
  "posts": [
    {
      "id": "unique-blog-id",
      "title": "Blog Post Title",
      "subtitle": "Optional subtitle",
      "excerpt": "Brief description for card previews",
      "featured_image_url": "/assets/blog/image-name.jpg",
      "category": "Engineering Management | Mastering Computer Science | Online MBA Success | Other Programs",
      "author": "Author Name",
      "author_bio": "Optional author bio",
      "author_image": "/assets/blog/authors/author-image.jpg",
      "created_date": "2025-01-01T10:00:00Z",
      "updated_date": "2025-01-01T10:00:00Z",
      "read_time": 8,
      "tags": ["Tag1", "Tag2"],
      "social_sharing": true,
      "content": [
        {
          "type": "paragraph",
          "text": "Paragraph text with **bold** formatting",
          "bold": ["bold"],
          "links": [
            {
              "text": "link text",
              "url": "https://example.com"
            }
          ]
        },
        {
          "type": "heading",
          "level": 2,
          "text": "Section Heading"
        },
        {
          "type": "list",
          "style": "unordered",
          "items": [
            {
              "text": "List item with **bold** text",
              "bold": ["bold"],
              "links": []
            }
          ]
        }
      ],
      "related_posts": ["other-blog-id"]
    }
  ]
}
```

## Key Points

- **Categories**: Must match exactly one of the four categories above
- **Content Array**: Each content block has a `type` (paragraph, heading, list)
- **Bold Text**: Store bold words in the `bold` array AND mark them with `**text**` in content
- **Links**: Include both `text` and `url` for each link
- **Lists**: Can be `"ordered"` or `"unordered"` style
- **IDs**: Use kebab-case (lowercase with hyphens)

## Content Types

1. **Paragraph**: Regular text with optional bold formatting and links
2. **Heading**: Use `level` 2-6 for H2-H6 tags
3. **List**: Unordered (bullets) or ordered (numbers) with items array

See `example_blog.json` for a complete reference.
