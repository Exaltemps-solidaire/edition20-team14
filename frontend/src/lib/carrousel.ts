// Logique pure du défilement automatique du carrousel de l'accueil (sans timer),
// pour rester testable sans horloge simulée.

export function indexSuivant(actuel: number, total: number): number {
  if (total <= 0) return 0;
  return (actuel + 1) % total;
}
