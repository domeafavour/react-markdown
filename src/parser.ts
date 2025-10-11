import { Token, Tokens } from "marked";
import { AnyTokenParserFunc, DefaultParsers, MarkdownElement } from "./typings";
import {
  createBlockquoteElement,
  createBrElement,
  createCodeElement,
  createCodespanElement,
  createDeleteElement,
  createEmphasisElement,
  createHeadingElement,
  createHrElement,
  createImageElement,
  createLinkElement,
  createListElement,
  createListItemElement,
  createParagraphElement,
  createSpaceElement,
  createStrongElement,
  createTableBodyElement,
  createTableCellElement,
  createTableElement,
  createTableHeaderElement,
  createTableRowElement,
  createTextElement,
} from "./utils/elements";

export const defaultParsers: DefaultParsers = {
  space: () => createSpaceElement(),
  hr: () => createHrElement(),
  br: () => createBrElement(),
  heading: (token, parser) =>
    createHeadingElement(token.depth, parser(token.tokens)),
  list: (token, parser) =>
    createListElement(token.ordered, parser(token.items)),
  list_item: (token, parser) =>
    createListItemElement(
      token.task,
      token.checked,
      parser(token.tokens.flatMap((t) => (t as Tokens.Text).tokens ?? []))
    ),
  link: (token, parser) => createLinkElement(token.href, parser(token.tokens)),
  code: (token) => createCodeElement(token.text, token.lang),
  image: (token) => createImageElement(token.href, token.title ?? token.text),
  paragraph: (token, parser) => createParagraphElement(parser(token.tokens)),
  strong: (token, parser) => createStrongElement(parser(token.tokens)),
  em: (token, parser) => createEmphasisElement(parser(token.tokens)),
  codespan: (token) => createCodespanElement(token.text),
  blockquote: (token, parser) => createBlockquoteElement(parser(token.tokens)),
  del: (token, parser) => createDeleteElement(parser(token.tokens)),
  table: (token, parser) =>
    createTableElement(token.align, [
      createTableHeaderElement([
        createTableRowElement(
          token.header.map((cell) =>
            createTableCellElement(true, cell.align, parser(cell.tokens))
          )
        ),
      ]),
      createTableBodyElement(
        token.rows.map((row) =>
          createTableRowElement(
            row.map((cell) =>
              createTableCellElement(false, cell.align, parser(cell.tokens))
            )
          )
        )
      ),
    ]),
};

/**
 * (marked)tokens to markdown elements
 * @param tokens
 * @returns
 */
export function parser(
  tokens: Token[],
  extended?: Record<string, AnyTokenParserFunc>
): MarkdownElement[] {
  const elements: MarkdownElement[] = [];
  for (const token of tokens) {
    const p = { ...defaultParsers, ...extended }[
      token.type as keyof DefaultParsers
    ] as AnyTokenParserFunc | undefined;
    elements.push(
      p
        ? p(token, (childTokens) => parser(childTokens, extended))
        : createTextElement(token.raw)
    );
  }
  return elements;
}
