import {
  MarkdownBlockquoteElement,
  MarkdownBrElement,
  MarkdownCodeElement,
  MarkdownCodespanElement,
  MarkdownDeleteElement,
  MarkdownElement,
  MarkdownEmphasisElement,
  MarkdownHeadingElement,
  MarkdownHrElement,
  MarkdownImageElement,
  MarkdownLinkElement,
  MarkdownListElement,
  MarkdownListItemElement,
  MarkdownParagraphElement,
  MarkdownSpaceElement,
  MarkdownStrongElement,
  MarkdownTableBodyElement,
  MarkdownTableCellElement,
  MarkdownTableElement,
  MarkdownTableHeaderElement,
  MarkdownTableRowElement,
  MarkdownTextElement,
  TableAlign,
} from "../typings";

export function createSpaceElement(): MarkdownSpaceElement {
  return { type: "space", text: "" };
}

export function createHrElement(): MarkdownHrElement {
  return { type: "hr", text: "" };
}

export function createBrElement(): MarkdownBrElement {
  return { type: "br", text: "" };
}

export function createHeadingElement(
  depth: number,
  children: MarkdownElement[]
): MarkdownHeadingElement {
  return {
    type: "heading",
    text: "",
    depth,
    children,
  };
}

export function createListElement(
  ordered: boolean,
  children: MarkdownElement[]
): MarkdownListElement {
  return {
    type: "list",
    text: "",
    ordered,
    children,
  };
}

export function createListItemElement(
  task: boolean,
  checked: boolean | undefined,
  children: MarkdownElement[]
): MarkdownListItemElement {
  return {
    type: "list_item",
    text: "",
    task,
    checked,
    children,
  };
}

export function createLinkElement(
  href: string,
  children: MarkdownElement[]
): MarkdownLinkElement {
  return {
    type: "link",
    text: "",
    href,
    children,
  };
}

export function createCodeElement(
  text: string,
  lang?: string
): MarkdownCodeElement {
  return {
    type: "code",
    text,
    lang,
  };
}

export function createImageElement(
  src: string,
  alt: string
): MarkdownImageElement {
  return {
    type: "image",
    text: "",
    src,
    alt,
  };
}

export function createParagraphElement(
  children: MarkdownElement[]
): MarkdownParagraphElement {
  return {
    type: "paragraph",
    text: "",
    children,
  };
}

export function createStrongElement(
  children: MarkdownElement[]
): MarkdownStrongElement {
  return {
    type: "strong",
    text: "",
    children,
  };
}

export function createEmphasisElement(
  children: MarkdownElement[]
): MarkdownEmphasisElement {
  return {
    type: "emphasis",
    text: "",
    children,
  };
}

export function createCodespanElement(text: string): MarkdownCodespanElement {
  return {
    type: "codespan",
    text,
  };
}

export function createBlockquoteElement(
  children: MarkdownElement[]
): MarkdownBlockquoteElement {
  return {
    type: "blockquote",
    text: "",
    children,
  };
}

export function createDeleteElement(
  children: MarkdownElement[]
): MarkdownDeleteElement {
  return {
    type: "delete",
    text: "",
    children,
  };
}

export function createTableCellElement(
  header: boolean,
  align: TableAlign,
  children: MarkdownElement[]
): MarkdownTableCellElement {
  return {
    type: "table_cell",
    header,
    align,
    text: "",
    children,
  };
}

export function createTableRowElement(
  children: MarkdownElement[]
): MarkdownTableRowElement {
  return {
    type: "table_row",
    text: "",
    children,
  };
}

export function createTableHeaderElement(
  children: MarkdownElement[]
): MarkdownTableHeaderElement {
  return {
    type: "table_header",
    text: "",
    children,
  };
}

export function createTableBodyElement(
  children: MarkdownElement[]
): MarkdownTableBodyElement {
  return {
    type: "table_body",
    text: "",
    children,
  };
}

export function createTableElement(
  align: TableAlign[],
  children: MarkdownElement[]
): MarkdownTableElement {
  return {
    type: "table",
    text: "",
    align,
    children,
  };
}

export function createTextElement(text: string): MarkdownTextElement {
  return {
    type: "text",
    text,
  };
}
