export const cataloguePageSize = 8;

export function paginateProducts<T>(items: readonly T[], requestedPage: number, pageSize = cataloguePageSize) {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const page = Math.min(Math.max(1, requestedPage), pageCount);
  const startIndex = (page - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, items.length);

  return {
    page,
    pageCount,
    startIndex,
    endIndex,
    items: items.slice(startIndex, endIndex),
  };
}
