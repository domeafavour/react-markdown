import { marked, MarkedExtension, Tokens } from "marked";
import { parser } from "./parser";
import {
  BaseMarkdownElement,
  DefaultElementRenders,
  MarkdownElementRenderer,
  ReactMarkdownExtension,
} from "./typings";

export interface ReactMarkdownOptions<
  T extends Tokens.Generic = Tokens.Generic,
  E extends BaseMarkdownElement = BaseMarkdownElement
> {
  /** @default true */
  gfm?: boolean;
  breaks?: MarkedExtension["breaks"];
  extensions?: ReactMarkdownExtension<T, E>[];
  /** override default renders */
  renders?: Partial<DefaultElementRenders>;
}

export function useReactMarkdown<
  T extends Tokens.Generic = Tokens.Generic,
  E extends BaseMarkdownElement = BaseMarkdownElement
>(markdown: string, options?: ReactMarkdownOptions<T, E>) {
  const { gfm = true, extensions = [], renders, breaks } = options ?? {};
  const tokens = marked.use({ gfm, extensions, breaks }).lexer(markdown);

  const extendedParsers: Record<
    string,
    ReactMarkdownExtension<T, E>["parser"]
  > = {};
  const extendedRenders: Partial<Record<string, MarkdownElementRenderer<E>>> =
    {};

  extensions.forEach((ext) => {
    extendedParsers[ext.name] = ext.parser;
    extendedRenders[ext.name] = ext.render;
  });

  const elements = parser(
    tokens,
    extendedParsers as Record<
      string,
      // Close your eyes, this `any` type is safe.
      any
    >
  );
  return { elements, renders: { ...renders, ...extendedRenders } };
}
