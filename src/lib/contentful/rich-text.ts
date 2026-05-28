import type { Document } from '@contentful/rich-text-types';
import type { EmbeddedAsset, RichTextContent } from './types';

export type RawRichTextField = {
  json: Document;
  links: {
    assets: {
      block: Array<{
        sys: { id: string };
        url: string | null;
        width: number | null;
        height: number | null;
        title: string | null;
        description: string | null;
      }>;
    };
  };
} | null;

export const RICH_TEXT_FIELDS = /* GraphQL */ `
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        width
        height
        title
        description
      }
    }
  }
`;

export function toRichText(raw: RawRichTextField): RichTextContent | null {
  if (!raw) return null;
  const embeddedAssets: Record<string, EmbeddedAsset> = {};
  for (const asset of raw.links.assets.block) {
    if (!asset.url || asset.width == null || asset.height == null) continue;
    embeddedAssets[asset.sys.id] = {
      id: asset.sys.id,
      url: asset.url,
      width: asset.width,
      height: asset.height,
      title: asset.title,
      description: asset.description,
    };
  }
  return { document: raw.json, embeddedAssets };
}
