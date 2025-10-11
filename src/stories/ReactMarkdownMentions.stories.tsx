import type { Meta, StoryObj } from "@storybook/react-vite";
import { ReactMarkdown } from "../ReactMarkdown";
import { useReactMarkdown } from "../useReactMarkdown";
import { createMentionExtension } from "./mentionExtension";
import "./react-markdown.css";

// Wrapper component for mention stories
function ReactMarkdownWithMentions({
  markdown,
  onMentionClick,
  mentionClass = "mention",
}: {
  markdown: string;
  onMentionClick?: (username: string) => void;
  mentionClass?: string;
}) {
  const mentionExtension = createMentionExtension({
    onMentionClick,
    mentionClass,
  });
  const markdownProps = useReactMarkdown(markdown, {
    extensions: [mentionExtension],
  });
  return <ReactMarkdown {...markdownProps} />;
}

const meta: Meta<typeof ReactMarkdownWithMentions> = {
  title: "Components/ReactMarkdown/Extension Examples/Mentions",
  component: ReactMarkdownWithMentions,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "ReactMarkdown with support for @mention syntax using marked extensions. Mentions are automatically styled and can be made interactive.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    markdown: {
      control: "text",
      description: "Markdown content with @mention support",
    },
    onMentionClick: {
      action: "mention-clicked",
      description: "Callback when a mention is clicked",
    },
    mentionClass: {
      control: "text",
      description: "CSS class for mention elements",
    },
  },
  decorators: [
    (Story) => (
      <div className="markdown-story-wrapper">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReactMarkdownWithMentions>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic mention example
export const BasicMentions: Story = {
  args: {
    markdown: `# Team Communication

Hey @john, can you review the PR? 

@alice and @bob should also take a look at the new features.

Thanks @everyone for the great work!`,
  },
};

// Mentions in various contexts
export const MentionsInList: Story = {
  args: {
    markdown: `## Project Assignments

### Frontend Team
- @alice - Component library
- @bob - User interface
- @charlie - State management

### Backend Team
- @dave - API development
- @eve - Database design
- @frank - Authentication

### DevOps
- @grace - CI/CD pipeline
- @henry - Infrastructure

Please coordinate with @john (project manager) for any questions.`,
  },
};

// Complex markdown with mentions
export const MentionsWithOtherElements: Story = {
  args: {
    markdown: `## Code Review Notes

> @alice Please review the **authentication module** before we merge.

### Changes Made:
1. Updated login flow (reviewed by @bob)
2. Added \`JWT\` token validation
3. Implemented password reset feature

\`\`\`javascript
// TODO: @charlie - optimize this function
function validateUser(user) {
  return user.isValid();
}
\`\`\`

**Next Steps:**
- [ ] Testing (@dave)
- [ ] Documentation (@eve)
- [ ] Deployment (@frank)

---

Thanks @team for all the hard work! 🚀`,
  },
};

// Mentions in tables
export const MentionsInTable: Story = {
  args: {
    markdown: `## Task Assignment

| Task | Assignee | Status | Reviewer |
|------|----------|--------|----------|
| Login Page | @alice | ✅ Complete | @bob |
| Dashboard | @charlie | 🚧 In Progress | @dave |
| API Integration | @eve | ⏳ Pending | @frank |
| Testing | @grace | 🚧 In Progress | @henry |

**Note:** Please tag @manager when tasks are completed.`,
  },
};

// Comprehensive example
export const ComplexMentions: Story = {
  args: {
    markdown: `# Sprint Planning Meeting Notes

## Attendees
@john (Scrum Master), @alice (Frontend Lead), @bob (Backend Lead), @charlie (Designer)

## Sprint Goals
1. **User Authentication**
   - Implementation: @alice, @bob
   - Design Review: @charlie
   - Testing: @dave

2. **Dashboard Features**
   - UI Components: @alice
   - API Endpoints: @bob
   - User Testing: @eve

## Action Items
> **Important:** All tasks must be reviewed by @john before merging.

### This Week
- [ ] @alice: Complete login component
- [ ] @bob: Implement JWT authentication
- [ ] @charlie: Finalize design mockups
- [ ] @dave: Set up testing environment

### Next Week
- [ ] @eve: Conduct user interviews
- [ ] @frank: Deploy to staging environment
- [ ] @grace: Security audit

## Code Review Process
1. Create PR and tag relevant reviewers
2. Get approval from @alice (Frontend) or @bob (Backend)
3. Final approval from @john
4. Notify @team in Slack

\`\`\`bash
# Deploy command (run by @frank only)
npm run deploy --env=staging
\`\`\`

**Meeting scheduled by @john for next Friday at 2 PM.**

---

*Questions? Contact @john or @alice*`,
  },
};

// Interactive mentions with click handling
export const InteractiveMentions: Story = {
  args: {
    markdown: `# Interactive Mentions

Click on any mention to trigger an action:

- @alice (Frontend Developer)
- @bob (Backend Developer) 
- @charlie (Designer)
- @dave (DevOps Engineer)

> Try clicking on @alice to see the interaction!`,
    onMentionClick: (username: string) => {
      alert(`Clicked on @${username}!`);
    },
    mentionClass: "interactive-mention",
  },
};

// Edge cases
export const EdgeCases: Story = {
  args: {
    markdown: `# Mention Edge Cases

## Valid mentions:
- @user123
- @alice_bob
- @john-doe

## Not mentions (should render as text):
- email@domain.com
- @123 (starts with number)
- @ (empty)
- @user with space after

## In code blocks:
\`\`\`
// This @mention should not be processed
const user = '@alice';
\`\`\`

Inline code: \`@bob\` should not be processed either.`,
  },
};
