import { describe, expect, it } from "vitest";
import { ACTIONS_ORGANISATEUR, CTAS_ORGANISATEUR } from "./donnees-organisateur";

describe("ACTIONS_ORGANISATEUR", () => {
  it("expose les 3 actions attendues par le PRD (participer, organiser, s'informer)", () => {
    expect(ACTIONS_ORGANISATEUR).toHaveLength(3);
  });
});

describe("CTAS_ORGANISATEUR", () => {
  it("expose le CTA de contact attendu par le PRD", () => {
    expect(CTAS_ORGANISATEUR).toHaveLength(1);
    expect(CTAS_ORGANISATEUR[0].id).toBe("contact");
  });
});
