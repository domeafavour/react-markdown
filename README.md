# @domeadev/react-markdown

A lightweight, customizable React component for rendering Markdown content with TypeScript support and extensible rendering.

## Features

- 🚀 **Fast and Lightweight**: Built on top of [marked](https://marked.js.org/) for efficient parsing
- 🎨 **Fully Customizable**: Override any element renderer with custom React components
- 🔧 **TypeScript Support**: Full type safety with comprehensive TypeScript definitions
- 🧩 **Extensible**: Support for custom extensions and element types
- 📝 **GFM Support**: GitHub Flavored Markdown support out of the box
- 📚 **Storybook**: Interactive examples and documentation

## 📖 Documentation & Examples

**[View Live Storybook Documentation →](https://domeafavour.github.io/react-markdown/)**

Explore interactive examples, API documentation, and usage patterns in our Storybook deployment.

## Installation

### npm

```bash
npm install @domeadev/react-markdown
```

### yarn

```bash
yarn add @domeadev/react-markdown
```

### pnpm

```bash
pnpm add @domeadev/react-markdown
```

## Quick Start

```tsx
import { ReactMarkdown, useReactMarkdown } from "@domeadev/react-markdown";

function MyComponent() {
  const markdown = `
# Hello World

This is **bold** text and this is *italic* text.

- List item 1
- List item 2
- [ ] Todo item
- [x] Completed item

[Link to example](https://example.com)
  `;

  const { elements, renders } = useReactMarkdown(markdown);

  return <ReactMarkdown elements={elements} renders={renders} />;
}
```

## API Reference

### useReactMarkdown Hook

The main hook for parsing markdown content.

```tsx
const { elements, renders } = useReactMarkdown(markdown, options);
```

#### Parameters

- `markdown` (string): The markdown content to parse
- `options` (optional): Configuration options

#### Options

```tsx
interface ReactMarkdownOptions {
  /** Enable GitHub Flavored Markdown @default true */
  gfm?: boolean;
  /** Handle line breaks */
  breaks?: boolean;
  /** Custom extensions */
  extensions?: ReactMarkdownExtension[];
  /** Override default element renderers */
  renders?: Partial<DefaultElementRenders>;
}
```

### ReactMarkdown Component

The main component for rendering parsed markdown elements.

```tsx
<ReactMarkdown elements={elements} renders={renders} />
```

#### Props

- `elements`: Parsed markdown elements from `useReactMarkdown`
- `renders`: Element renderers (default + custom overrides)

## Customizing Renderers

You can customize how any markdown element is rendered:

```tsx
import { ReactMarkdown, useReactMarkdown } from "@domeadev/react-markdown";

function CustomMarkdown() {
  const markdown = "# Custom Heading\n\nThis is a **bold** paragraph.";

  const { elements } = useReactMarkdown(markdown, {
    renders: {
      // Custom heading renderer
      heading: ({ element, children }) => {
        const headingElement = element as MarkdownHeadingElement;
        return (
          <h1 className={`custom-h${headingElement.depth}`}>🎉 {children}</h1>
        );
      },
      // Custom paragraph renderer
      paragraph: ({ children }) => (
        <p className="custom-paragraph">{children}</p>
      ),
      // Custom strong (bold) renderer
      strong: ({ children }) => (
        <span className="font-bold text-blue-600">{children}</span>
      ),
    },
  });

  return <ReactMarkdown elements={elements} renders={renders} />;
}
```

## Available Element Types

The following markdown elements are supported with default renderers:

| Element        | Description             | Custom Props                           |
| -------------- | ----------------------- | -------------------------------------- |
| `heading`      | H1-H6 headings          | `depth: 1-6`                           |
| `paragraph`    | Paragraph text          | -                                      |
| `list`         | Ordered/unordered lists | `ordered: boolean`                     |
| `list_item`    | List items              | `task: boolean`, `checked?: boolean`   |
| `link`         | Links                   | `href: string`                         |
| `image`        | Images                  | `src: string`, `alt: string`           |
| `code`         | Code blocks             | `lang?: string`                        |
| `codespan`     | Inline code             | -                                      |
| `strong`       | Bold text               | -                                      |
| `emphasis`     | Italic text             | -                                      |
| `delete`       | Strikethrough text      | -                                      |
| `blockquote`   | Block quotes            | -                                      |
| `table`        | Tables                  | `align: TableAlign[]`                  |
| `table_header` | Table header            | -                                      |
| `table_body`   | Table body              | -                                      |
| `table_row`    | Table row               | -                                      |
| `table_cell`   | Table cell              | `header: boolean`, `align: TableAlign` |
| `br`           | Line break              | -                                      |
| `hr`           | Horizontal rule         | -                                      |
| `text`         | Plain text              | -                                      |
| `space`        | Whitespace              | -                                      |

## Creating Extensions

You can create custom extensions to handle new markdown syntax:

```tsx
import { ReactMarkdownExtension } from "@domeadev/react-markdown";

// Example: Custom mention extension
const mentionExtension: ReactMarkdownExtension = {
  name: "mention",
  level: "inline",
  start(src: string) {
    return src.indexOf("@");
  },
  tokenizer(src: string) {
    // Match @username pattern (letters, numbers, underscore, hyphen)
    const rule = /^@([a-zA-Z0-9_-]+)/;
    const match = rule.exec(src);

    if (match) {
      return {
        type: "mention",
        raw: match[0],
        username: match[1],
      };
    }
    return undefined;
  },
  parser: (token) => ({
    type: "mention",
    text: token.raw,
    username: token.username,
  }),
  render: ({ element }) => <span className="mention">@{element.username}</span>,
};

const { elements, renders } = useReactMarkdown(markdown, {
  extensions: [mentionExtension],
});
```

## Advanced Usage

### With Custom Styling

```tsx
import { ReactMarkdown, useReactMarkdown } from "@domeadev/react-markdown";
import "./markdown-styles.css";

function StyledMarkdown({ content }: { content: string }) {
  const { elements, renders } = useReactMarkdown(content, {
    renders: {
      heading: ({ element, children }) => {
        const HeadingTag = `h${element.depth}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag className={`heading-${element.depth} mb-4 font-bold`}>
            {children}
          </HeadingTag>
        );
      },
      code: ({ element }) => (
        <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">
          <code className={`language-${element.lang || "text"}`}>
            {element.text}
          </code>
        </pre>
      ),
      link: ({ element, children }) => (
        <a
          href={element.href}
          className="text-blue-600 hover:text-blue-800 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  });

  return (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown elements={elements} renders={renders} />
    </div>
  );
}
```

### With Task Lists

```tsx
function TaskListExample() {
  const todoMarkdown = `
## My Todo List

- [x] Complete the documentation
- [x] Add TypeScript support
- [ ] Write more tests
- [ ] Add more examples
  `;

  const { elements, renders } = useReactMarkdown(todoMarkdown, {
    renders: {
      list_item: ({ element, children }) => (
        <li className="flex items-center gap-2">
          {element.task && (
            <input
              type="checkbox"
              checked={element.checked}
              className="form-checkbox h-4 w-4 text-blue-600"
              readOnly
            />
          )}
          <span className={element.checked ? "line-through text-gray-500" : ""}>
            {children}
          </span>
        </li>
      ),
    },
  });

  return <ReactMarkdown elements={elements} renders={renders} />;
}
```

## Development

### Build

```bash
pnpm build
```

### Test

```bash
pnpm test
```

### Storybook Development

Start the development server:

```bash
pnpm storybook
```

Build Storybook for production:

```bash
pnpm build-storybook
```

The Storybook documentation is automatically deployed to GitHub Pages on every push to the `main` branch.

### GitHub Pages Setup

For repository maintainers, the GitHub Pages deployment is handled automatically via GitHub Actions. To enable this:

1. Go to your repository's **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. The workflow will automatically deploy Storybook to `https://[username].github.io/[repository-name]/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Dependencies

- [marked](https://marked.js.org/) - Fast markdown parser
- [@domeadev/react-elements-renderer](https://github.com/domeafavour/react-elements-renderer) - Efficient React element rendering

## Related Packages

- `@domeadev/react-elements-renderer` - The underlying element rendering engine
