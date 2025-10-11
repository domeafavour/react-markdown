import { Tokens } from "marked";

export interface BaseMarkdownElement {
  type: string;
  text: string;
  children?: BaseMarkdownElement[];
}

export type TableAlign = Tokens.TableCell["align"];

export interface MarkdownHrElement extends BaseMarkdownElement {
  type: "hr";
}

export interface MarkdownBrElement extends BaseMarkdownElement {
  type: "br";
}

export interface MarkdownHeadingElement extends BaseMarkdownElement {
  type: "heading";
  /** 1 | 2 | 3 | 4 | 5 | 6 */
  depth: number;
}

export interface MarkdownListElement extends BaseMarkdownElement {
  type: "list";
  ordered: boolean;
}

export interface MarkdownLinkElement extends BaseMarkdownElement {
  type: "link";
  href: string;
}

/** <pre /> */
export interface MarkdownCodeElement extends BaseMarkdownElement {
  type: "code";
  lang?: string;
}

export interface MarkdownImageElement extends BaseMarkdownElement {
  type: "image";
  src: string;
  alt: string;
}

export interface MarkdownParagraphElement extends BaseMarkdownElement {
  type: "paragraph";
}

export interface MarkdownListItemElement extends BaseMarkdownElement {
  type: "list_item";
  task: boolean;
  checked?: boolean;
}

export interface MarkdownStrongElement extends BaseMarkdownElement {
  type: "strong";
}

export interface MarkdownEmphasisElement extends BaseMarkdownElement {
  type: "emphasis";
}

/** <code /> */
export interface MarkdownCodespanElement extends BaseMarkdownElement {
  type: "codespan";
}

export interface MarkdownBlockquoteElement extends BaseMarkdownElement {
  type: "blockquote";
}

export interface MarkdownDeleteElement extends BaseMarkdownElement {
  type: "delete";
}

export interface MarkdownTableElement extends BaseMarkdownElement {
  type: "table";
  align: TableAlign[];
}

export interface MarkdownTableHeaderElement extends BaseMarkdownElement {
  type: "table_header";
}

export interface MarkdownTableBodyElement extends BaseMarkdownElement {
  type: "table_body";
}

export interface MarkdownTableRowElement extends BaseMarkdownElement {
  type: "table_row";
}

export interface MarkdownTableCellElement extends BaseMarkdownElement {
  type: "table_cell";
  header: boolean;
  align: TableAlign;
}

export interface MarkdownSpaceElement extends BaseMarkdownElement {
  type: "space";
}

export interface MarkdownTextElement extends BaseMarkdownElement {
  type: "text";
}

export type MarkdownElement =
  | MarkdownHrElement
  | MarkdownBrElement
  | MarkdownHeadingElement
  | MarkdownListElement
  | MarkdownLinkElement
  | MarkdownCodeElement
  | MarkdownImageElement
  | MarkdownParagraphElement
  | MarkdownListItemElement
  | MarkdownStrongElement
  | MarkdownEmphasisElement
  | MarkdownCodespanElement
  | MarkdownBlockquoteElement
  | MarkdownDeleteElement
  | MarkdownTableElement
  | MarkdownTableHeaderElement
  | MarkdownTableBodyElement
  | MarkdownTableRowElement
  | MarkdownTableCellElement
  | MarkdownSpaceElement
  | MarkdownTextElement;
