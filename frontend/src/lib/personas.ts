// Les 4 profils prioritaires du site (passation/cadrage/3-solution.md), et les
// personas d'exemple qu'on peut incarner pour tester chaque parcours (PRD : pas de connexion).

export type ProfilId = "entreprise" | "particulier" | "testateur" | "organisateur";

export type Profil = {
  id: ProfilId;
  label: string;
};

export const PROFILS: Profil[] = [
  { id: "entreprise", label: "Entreprise" },
  { id: "particulier", label: "Particulier" },
  { id: "testateur", label: "Testateur" },
  { id: "organisateur", label: "Organisateur d'action solidaire" },
];

export function trouverProfil(id: ProfilId): Profil | undefined {
  return PROFILS.find((profil) => profil.id === id);
}

export type UtilisateurExemple = {
  id: ProfilId;
  nom: string;
  role: string;
};

// Une personne d'exemple par profil, pour incarner un rôle sans connexion (PRD).
export const UTILISATEURS_EXEMPLE: UtilisateurExemple[] = [
  { id: "entreprise", nom: "Claire Dupont", role: "Responsable RSE, entreprise mécène" },
  { id: "particulier", nom: "Marc Lefèvre", role: "Particulier qui veut donner" },
  { id: "testateur", nom: "Hélène Morel", role: "Personne qui prépare un legs" },
  { id: "organisateur", nom: "Yanis Bertrand", role: "Organisateur d'une action solidaire" },
];
