import type { Meta, StoryObj } from "@storybook/react-vite";
import { createElement } from "react";
import { ReactMarkdown } from "../ReactMarkdown";
import { MarkdownHeadingElement } from "../typings";
import { useReactMarkdown } from "../useReactMarkdown";
import "./react-markdown.css";

// Wrapper component for stories that uses the hook
function ReactMarkdownStory({
  markdown,
  ...options
}: { markdown: string } & Parameters<typeof useReactMarkdown>[1]) {
  const markdownProps = useReactMarkdown(markdown, options);
  return <ReactMarkdown {...markdownProps} />;
}

const meta: Meta<typeof ReactMarkdownStory> = {
  title: "Components/ReactMarkdown",
  component: ReactMarkdownStory,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "A React component for rendering Markdown content with custom styling and element rendering.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    markdown: {
      control: "text",
      description: "Markdown content to render",
    },
  },
  decorators: [
    (Story) => (
      <div className="markdown-story-wrapper">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReactMarkdownStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic example
export const Basic: Story = {
  args: {
    markdown: `# Hello World

This is a simple markdown example with **bold text** and *italic text*.`,
  },
};

// Comprehensive example with various markdown elements
export const Comprehensive: Story = {
  args: {
    markdown: `# Markdown Demo

## Headings

# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading

## Text Formatting

This is **bold text** and this is *italic text*.

You can also use ~~strikethrough~~ text.

## Lists

### Unordered List
- Item 1
- Item 2
  - Nested item 1
  - Nested item 2
- Item 3

### Ordered List
1. First item
2. Second item
3. Third item

## Links and Images

Here's a [link to Google](https://www.google.com).

## Code

### Inline Code
Use \`console.log()\` for debugging.

### Code Block
\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}
\`\`\`

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

## Horizontal Rule

---

## Tables

| Name | Age | City |
|------|-----|------|
| John | 25 | New York |
| Jane | 30 | San Francisco |
| Bob | 35 | Chicago |

`,
  },
};

// Simple text example
export const SimpleText: Story = {
  args: {
    markdown: `Just some plain text with **bold** and *italic* formatting.`,
  },
};

// Lists example
export const Lists: Story = {
  args: {
    markdown: `## Todo List

- [x] Complete project setup
- [x] Write documentation
- [ ] Add tests
- [ ] Deploy to production

## Shopping List

1. Milk
2. Bread
3. Eggs
4. Butter`,
  },
};

// Code example
export const Code: Story = {
  args: {
    markdown: `## Code Examples

### Inline Code
The \`useState\` hook is used for state management in React.

### JavaScript Code Block
\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

### TypeScript Code Block
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const user: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};
\`\`\``,
  },
};

// Tables example
export const Tables: Story = {
  args: {
    markdown: `## Product Comparison

| Feature | Basic | Pro | Enterprise |
|---------|-------|-----|------------|
| Users | 1 | 10 | Unlimited |
| Storage | 1GB | 100GB | 1TB |
| Support | Email | Priority | 24/7 Phone |
| Price | $9/month | $29/month | $99/month |

## Team Members

| Name | Role | Location |
|------|------|----------|
| **Alice Johnson** | Frontend Developer | New York |
| Bob Smith | Backend Developer | San Francisco |
| Carol Davis | UI/UX Designer | London |`,
  },
};

// Blockquotes example
export const Blockquotes: Story = {
  args: {
    markdown: `## Famous Quotes

> "The only way to do great work is to love what you do."
> 
> — Steve Jobs

> "Innovation distinguishes between a leader and a follower."
> 
> — Steve Jobs

> "Stay hungry, stay foolish."
> 
> — Steve Jobs`,
  },
};

// Links example
export const Links: Story = {
  args: {
    markdown: `## Useful Links

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Storybook Documentation](https://storybook.js.org/docs)

### Tools
- [VS Code](https://code.visualstudio.com/)
- [GitHub](https://github.com)
- [npm](https://www.npmjs.com/)

### Learning Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [freeCodeCamp](https://www.freecodecamp.org/)
- [Codecademy](https://www.codecademy.com/)`,
  },
};

// Empty content
export const Empty: Story = {
  args: {
    markdown: "",
  },
};

// Mixed content
export const MixedContent: Story = {
  args: {
    markdown: `# Project README

## Overview
This is a **React Markdown** component that renders markdown content.

## Features
- ✅ Headings (H1-H6)
- ✅ Text formatting (*italic*, **bold**, ~~strikethrough~~)
- ✅ Lists (ordered and unordered)
- ✅ Links and images
- ✅ Code blocks and inline code
- ✅ Tables
- ✅ Blockquotes
- ✅ Horizontal rules

## Installation

\`\`\`bash
npm install react-markdown
\`\`\`

## Usage

\`\`\`tsx
import { ReactMarkdown } from './ReactMarkdown';
import { useReactMarkdown } from './useReactMarkdown';

function App() {
  const markdown = '# Hello World';
  const props = useReactMarkdown(markdown);
  return <ReactMarkdown {...props} />;
}
\`\`\`

> **Note:** This component uses a custom parser and renderer for optimal performance.

---

For more information, visit our [documentation](https://example.com).`,
  },
};

// Custom rendering example
export const CustomRendering: Story = {
  args: {
    markdown: `# Custom Rendering Example

## Custom Headings
This heading will be rendered with custom styling.

### Subheading
Another heading with different styling.

**Bold text** and *italic text* are also customized.

> This blockquote has custom styling too!`,
    renders: {
      heading: ({ element, children }) => {
        const headingElement = element as MarkdownHeadingElement;
        return createElement(
          `h${headingElement.depth}`,
          {
            style: {
              color: "#e91e63",
              borderLeft: "4px solid #e91e63",
              paddingLeft: "16px",
              marginLeft: "-20px",
            },
          },
          children
        );
      },
      strong: ({ children }) => (
        <strong
          style={{
            color: "#9c27b0",
            backgroundColor: "#f3e5f5",
            padding: "2px 4px",
            borderRadius: "3px",
          }}
        >
          {children}
        </strong>
      ),
      blockquote: ({ children }) => (
        <blockquote
          style={{
            backgroundColor: "#fff3e0",
            borderLeft: "4px solid #ff9800",
            padding: "16px",
            margin: "16px 0",
            borderRadius: "4px",
            fontStyle: "italic",
          }}
        >
          {children}
        </blockquote>
      ),
    },
  },
};
