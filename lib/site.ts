export const siteName = "Silicon Index";

/** Builds a page title like "M4 Pro | Silicon Index". */
export function pageTitle(page?: string): string {
  return page ? `${page} | ${siteName}` : siteName;
}
