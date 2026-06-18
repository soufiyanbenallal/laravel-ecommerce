import { render, screen } from "@testing-library/react";
import { CategoryCardPart } from "./category-card.part";
import { expect, test } from "vitest";

const mockCategory = {
  id: 1,
  name: "Electronics",
  slug: "electronics",
  icon: "📱",
  products_count: 150,
  color: "#FF6200"
};

test("renders category card with correct info", () => {
  render(<CategoryCardPart category={mockCategory} />);
  
  expect(screen.getByText("Electronics")).toBeDefined();
  expect(screen.getByText("150 produits")).toBeDefined();
  expect(screen.getByText("📱")).toBeDefined();
});
