export const maxComparisonProducts = 3;

export function toggleComparisonProduct(selectedSlugs: string[], slug: string): string[] {
  if (selectedSlugs.includes(slug)) {
    return selectedSlugs.filter((currentSlug) => currentSlug !== slug);
  }
  if (selectedSlugs.length >= maxComparisonProducts) {
    return selectedSlugs;
  }
  return [...selectedSlugs, slug];
}
