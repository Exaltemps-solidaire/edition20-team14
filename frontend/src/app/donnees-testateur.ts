// Contenu réel de la page persona testateur (passation/cadrage/7-prd.md, étape 3 du scénario,
// et passation/contexte/association.md : « legs, donations, assurances-vie »).

export const LIBERALITES_INTRO =
  "Préparer un legs, une donation ou une assurance-vie au bénéfice d'Imagine for Margo, c'est permettre à l'association de financer la recherche sur le cancer pédiatrique sur le long terme.";

export const LIBERALITES_ITEMS = [
  {
    titre: "Le legs",
    texte: "Vous désignez Imagine for Margo dans votre testament, pour tout ou partie de votre patrimoine.",
  },
  {
    titre: "La donation",
    texte: "Vous transmettez un bien ou une somme à l'association de votre vivant.",
  },
  {
    titre: "L'assurance-vie",
    texte: "Vous désignez Imagine for Margo comme bénéficiaire de votre contrat d'assurance-vie.",
  },
];

export type CtaTestateurId = "contact" | "information" | "livret";

export type CtaTestateur = {
  id: CtaTestateurId;
  label: string;
  type: "confirmation" | "lien";
  href?: string;
};

// « Dans chaque page de personas, ajouter un bouton d'action pour convertir les visiteurs
// (prise de contact, demande d'infos...) » (passation/cadrage/3-solution.md).
export const CTAS_TESTATEUR: CtaTestateur[] = [
  { id: "contact", label: "Être recontacté·e par l'association", type: "confirmation" },
  { id: "information", label: "Demander des informations sur les libéralités", type: "confirmation" },
  {
    id: "livret",
    label: "Télécharger le livret legs et donations",
    type: "lien",
    href: "/livret-legs-et-donations.txt",
  },
];
