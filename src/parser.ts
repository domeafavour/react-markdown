import { Token as MarkedToken, Tokens } from "marked";
import { MarkdownElement } from "./typings";
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

/**
 * (marked)tokens to markdown elements
 * @param tokens
 * @returns
 */
export function parser(tokens: MarkedToken[]): MarkdownElement[] {
  const elements: MarkdownElement[] = [];

  for (const token of tokens) {
    switch (token.type) {
      case "space": {
        elements.push(createSpaceElement());
        break;
      }
      case "hr": {
        elements.push(createHrElement());
        break;
      }
      case "br": {
        elements.push(createBrElement());
        break;
      }
      case "heading": {
        const headingToken = token as Tokens.Heading;
        elements.push(
          createHeadingElement(headingToken.depth, parser(headingToken.tokens))
        );
        break;
      }
      case "list": {
        const listToken = token as Tokens.List;
        elements.push(
          createListElement(listToken.ordered, parser(listToken.items))
        );
        break;
      }
      case "list_item": {
        const listItemToken = token as Tokens.ListItem;
        elements.push(
          createListItemElement(
            listItemToken.task,
            listItemToken.checked,
            parser(
              listItemToken.tokens.flatMap(
                (t) => (t as Tokens.Text).tokens ?? []
              )
            )
          )
        );
        break;
      }
      case "link": {
        const linkToken = token as Tokens.Link;
        elements.push(
          createLinkElement(linkToken.href, parser(linkToken.tokens))
        );
        break;
      }
      case "code": {
        const codeToken = token as Tokens.Code;
        elements.push(createCodeElement(codeToken.text, codeToken.lang));
        break;
      }
      case "image": {
        const imageToken = token as Tokens.Image;
        elements.push(
          createImageElement(
            imageToken.href,
            imageToken.title ?? imageToken.text
          )
        );
        break;
      }
      case "paragraph": {
        const paragraphToken = token as Tokens.Paragraph;
        elements.push(createParagraphElement(parser(paragraphToken.tokens)));
        break;
      }
      case "strong": {
        const strongToken = token as Tokens.Strong;
        elements.push(createStrongElement(parser(strongToken.tokens)));
        break;
      }
      case "em": {
        const emToken = token as Tokens.Em;
        elements.push(createEmphasisElement(parser(emToken.tokens)));
        break;
      }
      case "codespan": {
        elements.push(createCodespanElement((token as Tokens.Codespan).text));
        break;
      }
      case "blockquote": {
        const blockquoteToken = token as Tokens.Blockquote;
        elements.push(createBlockquoteElement(parser(blockquoteToken.tokens)));
        break;
      }
      case "del": {
        const delToken = token as Tokens.Del;
        elements.push(createDeleteElement(parser(delToken.tokens)));
        break;
      }
      case "table": {
        const tableToken = token as Tokens.Table;
        elements.push(
          createTableElement(tableToken.align, [
            createTableHeaderElement([
              createTableRowElement(
                tableToken.header.map((cell) =>
                  createTableCellElement(true, cell.align, parser(cell.tokens))
                )
              ),
            ]),
            createTableBodyElement(
              tableToken.rows.map((row) =>
                createTableRowElement(
                  row.map((cell) =>
                    createTableCellElement(
                      false,
                      cell.align,
                      parser(cell.tokens)
                    )
                  )
                )
              )
            ),
          ])
        );
        break;
      }
      default: {
        elements.push(createTextElement(token.raw));
        break;
      }
    }
  }
  return elements;
}
