// Contenu réel de la page persona organisateur (passation/cadrage/7-prd.md, étape 3 du plan :
// « actions possibles (participer, organiser, s'informer) et un CTA de contact »).

export const ORGANISATEUR_INTRO =
  "Plus de 200 actions solidaires sont organisées chaque année au profit d'Imagine for Margo. Voici comment vous impliquer.";

export const ACTIONS_ORGANISATEUR = [
  {
    titre: "Je participe à un évènement",
    texte: "Rejoignez une action solidaire déjà organisée près de chez vous.",
  },
  {
    titre: "J'organise un évènement",
    texte: "Montez votre propre action solidaire au profit de l'association.",
  },
  {
    titre: "Je m'informe",
    texte: "Consultez les actions passées et ce qu'elles ont permis de financer.",
  },
];

export type CtaOrganisateurId = "contact";

export type CtaOrganisateur = {
  id: CtaOrganisateurId;
  label: string;
};

// « Dans chaque page de personas, ajouter un bouton d'action pour convertir les visiteurs
// (prise de contact...) » (passation/cadrage/3-solution.md).
export const CTAS_ORGANISATEUR: CtaOrganisateur[] = [
  { id: "contact", label: "Être recontacté·e par l'association" },
];
