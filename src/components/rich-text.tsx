import { Children, Fragment, isValidElement, type ReactNode } from 'react';
import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import type { RichTextContent } from '@/lib/contentful/types';

function unwrapParagraphs(children: ReactNode): ReactNode {
  return Children.map(children, (child) =>
    isValidElement<{ children: ReactNode }>(child) && child.type === 'p'
      ? child.props.children
      : child
  );
}

function renderTextWithBreaks(text: string): ReactNode {
  const parts = text.split('\n');
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && <br />}
    </Fragment>
  ));
}

function buildOptions(content: RichTextContent): Options {
  return {
    renderText: renderTextWithBreaks,
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const id = node.data.target?.sys?.id as string | undefined;
        const asset = id ? content.embeddedAssets[id] : undefined;
        if (!asset) return null;
        return (
          <Image
            src={asset.url}
            alt={asset.description ?? asset.title ?? ''}
            width={asset.width}
            height={asset.height}
            className="h-auto w-full rounded-sm md:rounded-md"
          />
        );
      },
      [BLOCKS.LIST_ITEM]: (_node, children) => <li>{unwrapParagraphs(children)}</li>,
    },
  };
}

export function RichText({ content }: { content: RichTextContent }) {
  return <>{documentToReactComponents(content.document, buildOptions(content))}</>;
}

export function PlainRichText({ document }: { document: Document }) {
  return <>{documentToReactComponents(document, { renderText: renderTextWithBreaks })}</>;
}
