import { describe, expect, it } from "vitest";
import { indexSuivant } from "./carrousel";

describe("indexSuivant", () => {
  it("avance à l'index suivant", () => {
    expect(indexSuivant(0, 3)).toBe(1);
  });

  it("revient au début après le dernier élément", () => {
    expect(indexSuivant(2, 3)).toBe(0);
  });
});
