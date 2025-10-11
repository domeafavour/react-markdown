import { Tokens } from "marked";
import { ReactNode } from "react";
import { BaseMarkdownElement, ReactMarkdownExtension } from "../typings";

export interface MentionToken extends Tokens.Generic {
  type: "mention";
  raw: string;
  username: string;
}

export interface MentionElement extends BaseMarkdownElement {
  type: "mention";
  username: string;
}

export interface MentionOptions {
  onMentionClick?: (username: string) => void;
  mentionClass?: string;
}

export function createMentionExtension(
  options: MentionOptions = {}
): ReactMarkdownExtension<MentionToken, MentionElement> {
  const { onMentionClick, mentionClass = "mention" } = options;
  return {
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
        } as MentionToken;
      }
      return undefined;
    },
    parser(token) {
      return {
        type: "mention",
        text: token.raw,
        username: token.username,
      };
    },
    render({ element }): ReactNode {
      const handleClick = onMentionClick
        ? () => onMentionClick(element.username)
        : undefined;

      return (
        <span
          className={mentionClass}
          data-username={element.username}
          onClick={handleClick}
          style={{
            cursor: onMentionClick ? "pointer" : "default",
          }}
        >
          @{element.username}
        </span>
      );
    },
  };
}
