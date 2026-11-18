# Architecture Decision Record (ADR)

Journal des décisions d'architecture prises pendant le hackathon (dépendance nouvelle, stockage, pattern structurant).

Une entrée par décision, ajoutée à la fin, au format :

```
### AAAA-MM-JJ — <titre court>

- **Décision** : ce qui a été choisi
- **Contexte** : le problème à résoudre
- **Alternatives envisagées** : les autres options, et pourquoi elles sont écartées
- **Conséquences** : les compromis acceptés
```

Le fichier est un journal : on ajoute, on ne réécrit pas. Pour revenir sur une décision, une nouvelle entrée le dit explicitement.

---

## Décisions

### 2026-11-18 — CSP : `script-src` inclut `'unsafe-inline'`

- **Décision** : la `Content-Security-Policy` servie par `frontend/nginx.conf` déclare explicitement `script-src 'self' 'unsafe-inline'`, au lieu de laisser `script-src` hériter de `default-src 'self'`.
- **Contexte** : l'export statique de Next.js (App Router) embarque le payload d'hydratation React dans des balises `<script>` inline sans nonce (`self.__next_f.push(...)`). Sans `'unsafe-inline'` explicite, le navigateur bloque ces scripts : React n'hydrate jamais, et plus aucun gestionnaire d'événement ne répond — tous les CTA, le carrousel et le sélecteur de persona restent inertes, alors que le HTML statique s'affiche et que les contrôles `curl`/`/health` répondent 200. C'est un bug silencieux : rien ne le signale côté serveur, seul un navigateur qui applique la CSP le révèle. Remonté par le développeur après démo (« les CTA ne fonctionnent pas »), alors que les bilans des itérations 1 à 4 affirmaient le contraire sur la seule base de vérifications `curl`.
- **Alternatives envisagées** : nonce CSP par requête — nécessiterait une génération dynamique côté nginx (`sub_filter` ou équivalent) injectée à la fois dans l'en-tête et dans chaque balise `<script>` de l'export statique, incompatible avec un export 100 % statique sans logique serveur supplémentaire ; hors budget d'une itération de hackathon. Abandonner l'export statique pour un serveur Next (`next start`) — interdit par le gabarit du serveur (port 8080 réservé au conteneur publié, pas de serveur de dev, et le contrat de déployabilité impose l'export statique servi par nginx).
- **Conséquences** : toute injection HTML qui parviendrait à écrire un `<script>` dans la page serait exécutée (XSS classique) — risque accepté ici car l'application ne rend aucun contenu utilisateur non maîtrisé (tout le contenu est en dur, aucun champ de saisie n'est réinjecté dans le DOM). À revoir si une fonctionnalité future affiche du contenu saisi par un visiteur.
