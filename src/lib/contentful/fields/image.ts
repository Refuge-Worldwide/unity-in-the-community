import type { ProjectImage } from '../types';

export type RawImage = {
  url: string | null;
  width: number | null;
  height: number | null;
  title: string | null;
} | null;

export function toImage(raw: RawImage): ProjectImage | null {
  if (!raw || !raw.url || raw.width == null || raw.height == null) return null;
  return { url: raw.url, width: raw.width, height: raw.height, title: raw.title };
}
