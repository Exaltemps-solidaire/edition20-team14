import { describe, expect, it } from "vitest";
import { CTAS_TESTATEUR } from "./donnees-testateur";

describe("CTAS_TESTATEUR", () => {
  it("expose les 3 CTA attendus par le PRD (contact, information, livret)", () => {
    expect(CTAS_TESTATEUR).toHaveLength(3);
    expect(CTAS_TESTATEUR.map((cta) => cta.id)).toEqual(["contact", "information", "livret"]);
  });

  it("le CTA livret est un lien, les deux autres sont des confirmations à l'écran", () => {
    const livret = CTAS_TESTATEUR.find((cta) => cta.id === "livret");
    expect(livret?.type).toBe("lien");
    expect(livret?.href).toBeTruthy();

    const confirmations = CTAS_TESTATEUR.filter((cta) => cta.id !== "livret");
    expect(confirmations.every((cta) => cta.type === "confirmation")).toBe(true);
  });
});
