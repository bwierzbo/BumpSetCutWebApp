// A flywheel contribution's files in the private `training-data` bucket:
// stills (older app builds) and clips (every rally of a processed video).
export function contributionFiles(row: { frame_urls?: unknown; clip_urls?: unknown } | null | undefined): string[] {
  const list = (v: unknown) => (Array.isArray(v) ? (v as string[]) : []);
  return [...list(row?.frame_urls), ...list(row?.clip_urls)];
}
