import { ElementsRenderer } from "@domeadev/react-elements-renderer";
import { Tokens } from "marked";
import { createElement } from "react";
import {
  BaseMarkdownElement,
  DefaultElementRenders,
  MarkdownElement,
  MarkdownHeadingElement,
  MarkdownImageElement,
  MarkdownLinkElement,
  MarkdownListElement,
  MarkdownListItemElement,
  MarkdownTableCellElement,
} from "./typings";
import { useReactMarkdown } from "./useReactMarkdown";

interface Props<
  T extends Tokens.Generic = Tokens.Generic,
  E extends BaseMarkdownElement = BaseMarkdownElement
> extends ReturnType<typeof useReactMarkdown<T, E>> {}

export type ReactMarkdownProps = Props;

const defaultRenders: DefaultElementRenders = {
  br: () => <br />,
  hr: () => <hr />,
  heading: ({ element, children }) => {
    const headingElement = element as MarkdownHeadingElement;
    return createElement(`h${headingElement.depth}`, {}, children);
  },
  blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  list: ({ element, children }) => {
    const listElement = element as MarkdownListElement;
    return listElement.ordered ? <ol>{children}</ol> : <ul>{children}</ul>;
  },
  list_item: ({ children, element }) => {
    const itemElement = element as MarkdownListItemElement;
    return (
      <li>
        {itemElement.task ? (
          <input type="checkbox" checked={itemElement.checked} />
        ) : null}
        {children}
      </li>
    );
  },
  link: ({ element, children }) => {
    const linkElement = element as MarkdownLinkElement;
    return (
      <a href={linkElement.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  },
  code: ({ element }) => (
    <pre>
      <code>{element.text}</code>
    </pre>
  ),
  codespan: ({ element }) => <code>{element.text}</code>,
  image: ({ element }) => {
    const imageElement = element as MarkdownImageElement;
    return <img src={imageElement.src} alt={imageElement.alt} />;
  },
  delete: ({ children }) => <del>{children}</del>,
  emphasis: ({ children }) => <em>{children}</em>,
  strong: ({ children }) => <strong>{children}</strong>,
  paragraph: ({ children }) => <p>{children}</p>,
  table: ({ children }) => <table>{children}</table>,
  table_header: ({ children }) => <thead>{children}</thead>,
  table_body: ({ children }) => <tbody>{children}</tbody>,
  table_row: ({ children }) => <tr>{children}</tr>,
  table_cell: ({ element, children }) => {
    const tableCellElement = element as MarkdownTableCellElement;
    const Comp = tableCellElement.header ? "th" : "td";
    return <Comp align={tableCellElement.align ?? undefined}>{children}</Comp>;
  },
  text: ({ element }) => element.text,
  space: () => null,
};

export function ReactMarkdown({ elements, renders }: Props) {
  return (
    <ElementsRenderer
      elements={elements}
      getElementKey={(element, index) => `${element.type}:${index}`}
      getChildElements={(e) => e.children as MarkdownElement[]}
      renderElement={({ element, children, index, childElements }) => {
        const render = { ...defaultRenders, ...renders }[element.type];
        return render
          ? render({
              children,
              index,
              childElements,
              element,
            })
          : element.text;
      }}
    />
  );
}
