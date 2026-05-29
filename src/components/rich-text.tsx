import { documentToReactComponents, type Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, type Document } from '@contentful/rich-text-types';
import Image from 'next/image';
import type { RichTextContent } from '@/lib/contentful/types';

function buildOptions(content: RichTextContent): Options {
  return {
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
    },
  };
}

export function RichText({ content }: { content: RichTextContent }) {
  return <>{documentToReactComponents(content.document, buildOptions(content))}</>;
}

export function PlainRichText({ document }: { document: Document }) {
  return <>{documentToReactComponents(document)}</>;
}
