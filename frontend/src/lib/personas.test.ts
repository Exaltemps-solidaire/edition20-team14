import { describe, expect, it } from "vitest";
import { PROFILS, trouverProfil } from "./personas";

describe("trouverProfil", () => {
  it("retrouve le profil testateur par son identifiant, parmi les 4 profils prioritaires", () => {
    expect(trouverProfil("testateur")?.label).toBe("Testateur");
    expect(PROFILS.map((profil) => profil.id)).toEqual([
      "entreprise",
      "particulier",
      "testateur",
      "organisateur",
    ]);
  });
});
