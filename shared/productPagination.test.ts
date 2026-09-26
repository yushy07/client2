import { describe, expect, it } from "vitest";
import { cataloguePageSize, paginateProducts } from "./productPagination";

describe("catalogue product pagination", () => {
  const products = Array.from({ length: 18 }, (_, index) => `product-${index + 1}`);

  it("shows eight items per page and reports a correct final page", () => {
    const first = paginateProducts(products, 1);
    const last = paginateProducts(products, 3);

    expect(cataloguePageSize).toBe(8);
    expect(first.items).toEqual(products.slice(0, 8));
    expect(last.items).toEqual(products.slice(16, 18));
    expect(last.pageCount).toBe(3);
  });

  it("clamps invalid page requests into the available page range", () => {
    expect(paginateProducts(products, 0).page).toBe(1);
    expect(paginateProducts(products, 999).page).toBe(3);
  });
});
