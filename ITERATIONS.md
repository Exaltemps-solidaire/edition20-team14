# Plan d'itérations — Imagine for Margo (équipe KXPXPZ)

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation — ni fichier `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`). Le plan de livraison de l'équipe (`cadrage/6-plan-de-livraison.md`) a servi de base pour l'ordre des priorités : testateur, puis organisateur, puis carrousel.
- **Temps restant annoncé** : 60 minutes (répondu le 2026-11-18 lors de `/planifier-iterations`).
- **Tour de test de l'équipe** : 10 minutes.
- **Plan validé le 2026-11-18**, avec les retours des cadreurs intégrés ci-dessous.
- **Retours des cadreurs (2026-11-18)** : carrousel **avec défilement automatique**, dès l'itération 1 (ce n'est plus hors périmètre) ; le parcours visiteur part directement de la page d'accueil (pas d'écran de connexion/sélection de rôle qui la précède) — un clic sur le CTA « Je veux m'engager » mène à une **page de choix de profil** (4 CTA, un par rôle), puis à la page propre au rôle choisi.
- **Temps restant au début de l'itération 1** : 40 minutes (redemandé au début du `/iteration 1`). Capacité restante : une itération complète (codage ≤10 min + publication ~5 min + tour de test 10 min ≈ 25 min), avec une marge insuffisante pour une seconde itération complète dans la foulée — à réévaluer en fin d'itération 1.
- **Capacité** : une itération coûte au plus codage (≤10 min) + publication (~5 min) + tour de test (10 min) = ~25 min.

⚠️ **Note du 2026-11-18** : une incohérence a été détectée dans ce fichier avant la clôture de l'itération 1 (un contenu antérieur, contredisant les retours ci-dessus, s'y est retrouvé après une série d'éditions). Ce fichier a été réécrit en entier pour ne garder que l'état validé par les cadreurs et le code effectivement livré ; aucun contenu n'a été perdu de ce qui avait été validé.

## ✂️ Hors périmètre de ce build

Sortent du périmètre, à reporter à un prochain build (renseigné dans « À venir ») :
- la page persona organisateur réelle (priorité 3 de l'équipe) ;
- les parcours entreprise et particulier (déjà hors périmètre du PRD de cette version) ;
- chatbot Margo, pop-up email, bibliothèque « voir tout » (déjà hors périmètre du PRD).

## Itération 1 : L'application démarre sur l'accueil, avec un carrousel animé, et dispatche vers un profil

- **Dans le périmètre** :
  - squelette conforme au contrat de déployabilité : `.env.example` et `DEPLOIEMENT.md` (les services `api/` et `frontend/` sont déjà posés) ;
  - page d'accueil, premier écran de l'application : carrousel **à défilement automatique** (actions/événements/articles de presse, en dur), bloc de présentation avec chiffres clés (en dur) et les 3 CTA (« Voir plus », « Je veux m'engager », « Je veux agir ») ;
  - un sélecteur non bloquant, en en-tête (« Qui êtes-vous ? — pour tester »), permet d'incarner l'un des 4 personas d'exemple à tout moment, sans jamais empêcher l'accès à l'accueil (pas de connexion, conforme au PRD) ;
  - clic sur un CTA de l'accueil → page de choix de profil : 4 CTA, un par rôle (entreprise, particulier, testateur, organisateur) ;
  - clic sur un profil → page persona (contenu identique pour les 4, à titre de stub ; le contenu réel vient en itération 2 pour le testateur).
- **Hors périmètre** : contenu réel des pages persona, bouton « Voir tout », chatbot, pop-up email.
- **Critères d'acceptation** :
  - Étant donné l'application démarrée, le premier écran est la page d'accueil, avec un carrousel qui change de diapositive seul, sans action du visiteur.
  - Étant donné la page d'accueil, quand il clique sur un CTA (« Je veux m'engager » ou un autre), alors il arrive sur la page de choix de profil listant les 4 profils.
  - Étant donné la page de choix de profil, quand il clique sur un profil (ex. « Testateur »), alors il arrive sur une page persona dédiée à ce profil.
- **Hypothèse de l'équipe couverte** : aucune mesurée directement — cette itération pose la fondation du parcours sur laquelle les hypothèses de clics (testateur, organisateur) seront mesurées dès l'itération 2.
- **Codage estimé** : 10 minutes.
- **Tests unitaires prévus** : 1 à 3 tests sur la logique pure (défilement du carrousel, recherche d'un profil par identifiant), pas sur le balisage.
- **Étapes ajoutées à la démo** : ouverture de l'app → accueil (carrousel visible) → clic « Je veux m'engager » → choix de profil → clic sur un profil → page persona (stub).
- **Bilan** :
  - Codage réel : environ 7 minutes (dans le budget, pas d'alarme déclenchée).
  - Critères d'acceptation : les 3 sont satisfaits par le code livré.
  - Tests unitaires : 5 au total (2 API déjà existants pour `/health`/`/sante` + 3 frontend nouveaux — `carrousel.test.ts` : 2 tests sur `indexSuivant` ; `personas.test.ts` : 1 test sur `trouverProfil`/`PROFILS`) ; `npm test` passe.
  - Lint : `npm run lint` passe sans erreur (api + frontend).
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - Déploiement : `podman build`/`push` des deux images puis `podman compose -p team14 up -d --force-recreate`, suivant la recette du `/CLAUDE.md` du serveur. Bloqué un moment par le quota de pull anonyme Docker Hub (`toomanyrequests` sur `node:24-alpine`, affectant aussi des services de la plateforme comme `postgres.internal`/`temporal`, sans impact sur cette itération qui n'en a pas besoin) ; résolu après plusieurs tentatives espacées. Vérifié depuis la machine : `localhost:8080/` → 200, `localhost:8080/health` et `/sante` → `ok`, `localhost:8081/health` et `/sante` → `{"status":"ok"}`.
  - Signalé à PM Lab : `./scripts/signaler-version.sh 1` → version 1 enregistrée avec succès.
  - Reporté : rien de prévu n'a été coupé ; le contenu réel des pages persona reste pour l'itération 2, comme prévu.
  - **Modifications** :
    - `frontend/src/lib/carrousel.ts` + `.test.ts` : fonction pure `indexSuivant` (défilement circulaire), couvre le critère « carrousel animé ».
    - `frontend/src/lib/personas.ts` + `.test.ts` : les 4 profils et les 4 personas d'exemple, `trouverProfil` pour la page persona ; couvre les critères de choix de profil et le sélecteur non bloquant.
    - `frontend/src/app/donnees-accueil.ts` : contenu en dur du carrousel et des chiffres clés.
    - `frontend/src/app/page.tsx` : écran unique avec 3 états (accueil/profil/persona), carrousel auto-avancé par `useEffect`+`setInterval`, sélecteur de persona en en-tête, navigation par les CTA ; couvre les 3 critères d'acceptation.
    - `frontend/src/app/page.module.css` : styles de l'accueil, du carrousel et des CTA.
    - `frontend/src/app/layout.tsx` : titre/description de la page.
    - `.env.example`, `DEPLOIEMENT.md` : couvrent le point 3 de la DoD (contrat de déployabilité).
    - `api/Dockerfile`, `frontend/Dockerfile` : images de base qualifiées `docker.io/library/…`, requis par le `/CLAUDE.md` du serveur pour une résolution fiable hors terminal interactif.
    - `frontend/nginx.conf` : en-têtes de sécurité repris du gabarit de la plateforme, avec une CSP resserrée à `'self'` (pas de `script-src` externe, pas de `localhost:8501`/`:9000`).
    - `.gitignore` : ajout de `/podman-compose.yml` (fichier propre à cette VM, non portable, non commité).
    - `podman-compose.yml` (non commité, hors dépôt) : service `frontend` sur 8080, `api` sur 8081, réseau `core-network` externe, images tirées de `localhost:5000`.

## Itération 2 : La page persona testateur devient réelle

- **Temps restant au début de l'itération 2** : 30 minutes (redemandé au début du `/iteration 2`, le 2026-11-18). Capacité restante : une itération (codage ≤10 min + publication ~5 min + tour de test 10 min ≈ 25 min) — marge faible, pas de seconde itération complète à la suite sans réévaluer.
- **Dans le périmètre** : la page persona testateur (qui remplace le stub de l'itération 1) affiche les informations sur les libéralités (legs, donations, assurances-vie) et des CTA dédiés : prise de contact, demande d'informations, téléchargement du livret legs et donations (lien, pas de formulaire).
- **Hors périmètre** : page persona organisateur réelle (reste en stub), envoi réel d'un formulaire de contact (hors périmètre PRD : pas de CRM).
- **Critères d'acceptation** :
  - Étant donné la page de choix de profil, quand le visiteur clique sur « Testateur », alors il voit les informations sur les libéralités et les CTA dédiés.
  - Étant donné la page persona testateur, quand il clique sur le CTA de contact, alors une action visible se déclenche (ex. lien mailto ou confirmation à l'écran).
  - Étant donné le scénario complet (accueil → choix de profil → testateur), quand on compte les clics jusqu'au CTA libéralités, alors le nombre de clics est visible/mesurable pour l'équipe (⚠️ voir note ci-dessous).
- **Hypothèse de l'équipe couverte** : « La page persona testateur, avec ses CTA dédiés, permet à la personne qui prépare un legs de trouver l'information sur les libéralités sans aide » (mesure : nombre de clics jusqu'au CTA libéralités, cible **3 clics** — tranché par le développeur le 2026-11-18, voir note ci-dessous).
- **Codage estimé** : 8 minutes.
- **Fichiers prévus** : page persona testateur (contenu réel), données des CTA testateur (~3-4 fichiers).
- **Tests unitaires prévus** : 1 à 2 tests sur la structure des CTA testateur (ex. présence des 3 CTA attendus, libellés corrects).
- **Étapes ajoutées à la démo** : après le clic sur « Testateur », vérifier l'affichage des informations libéralités et cliquer sur le CTA de contact.
- **Bilan** :
  - Codage réel : environ 2 minutes (très en dessous du budget, pas d'alarme déclenchée).
  - Critères d'acceptation : les 3 sont satisfaits — page testateur réelle (legs, donation, assurance-vie), CTA de contact avec confirmation visible à l'écran (pas de mailto : aucune adresse de contact n'est donnée dans la passation, donc pas inventée), et un compteur de clics affiché sur la page persona rend le nombre de clics mesurable pour l'équipe.
  - Tests unitaires : 2 nouveaux (`donnees-testateur.test.ts` : présence des 3 CTA attendus, et répartition lien/confirmation) ; 7 au total, `npm test` passe.
  - Lint : `npm run lint` passe sans erreur. Build Next.js (`next build`) vérifié sans erreur TypeScript.
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - Déploiement : rebuild/push de l'image frontend seule (l'api n'a pas changé), `podman compose up -d --force-recreate`. Vérifié depuis la machine : `localhost:8080/` → 200, `/health` → `ok`, `localhost:8081/health` → `{"status":"ok"}`, et le livret statique répond 200.
  - Signalé à PM Lab : `./scripts/signaler-version.sh 2` → version 2 enregistrée avec succès.
  - Reporté : rien de prévu n'a été coupé.
  - ❓ Le livret legs et donations n'existe pas dans la passation (aucun PDF fourni par l'association) : le lien de téléchargement pointe vers un fichier texte placeholder qui le dit explicitement, plutôt que d'inventer un contenu. À signaler aux cadreurs : ont-ils le vrai document à fournir ?
  - **Modifications** :
    - `frontend/src/app/donnees-testateur.ts` + `.test.ts` : contenu réel (libéralités : legs, donation, assurance-vie) et structure des 3 CTA testateur, sourcés de `passation/cadrage/7-prd.md` et `passation/contexte/association.md`.
    - `frontend/public/livret-legs-et-donations.txt` : placeholder explicite pour le lien de téléchargement (document réel non fourni dans la passation).
    - `frontend/src/app/page.tsx` : `PersonaEcran` dispatche vers un nouveau `PersonaTestateurEcran` pour le profil testateur (contenu réel, 3 CTA, confirmation à l'écran, compteur de clics) ; compteur `clics` ajouté dans `Home`, incrémenté à chaque étape du parcours.
    - `frontend/src/app/page.module.css` : styles `.liberalites`, `.compteurClics`, et extension des styles `.ctas` aux liens (`a`) en plus des boutons.

⚠️ L'hypothèse de l'équipe ciblait « 1 clic depuis la page d'accueil » jusqu'au CTA libéralités, mais le scénario validé (PRD + retours cadreurs) passe par accueil → choix de profil → persona → CTA, soit 3 clics. Incohérence déjà présente dans la passation, pas introduite par le découpage. **Tranché par le développeur le 2026-11-18** : la cible retenue est 3 clics, conforme au parcours réellement validé ; le compteur de clics de l'itération 2 mesure contre cette cible corrigée.

✂️ **Temps restant annoncé en clôture de l'itération 2** : moins de 10 minutes. Conformément à la règle de la section 3 de `CLAUDE.md` (« quand le temps restant ne permet plus qu'une itération, consacre-la à stabiliser ce qui sera montré au pitch »), **pas de nouvelle itération n'est planifiée** : le reste du temps sert à vérifier que la version 2 déployée est stable, pas à coder autre chose. Les points ci-dessous restent en backlog pour un prochain build.

## Itération 3 : La page persona organisateur devient réelle

- **Temps restant au début de l'itération 3** : 25 minutes (redemandé au début du `/iteration 3`, le 2026-11-18 — révisé de 20 à 25 par le développeur pour tenir dans la capacité minimale ≈25 min). Dernière itération tenable avant le pitch : à consacrer à la stabilisation si elle dépasse son budget.
- **Dans le périmètre** : la page persona organisateur (remplace le stub de l'itération 1) affiche les actions possibles — je participe à un évènement, j'organise un évènement, je m'informe — et un CTA de contact, conformément au PRD (`passation/cadrage/7-prd.md`, étape 3 du plan).
- **Hors périmètre** : inscription réelle à un évènement, formulaire de contact avec envoi réel (pas de CRM, comme pour le testateur).
- **Critères d'acceptation** :
  - Étant donné la page de choix de profil, quand le visiteur clique sur « Organisateur d'action solidaire », alors il voit les 3 actions possibles (participer, organiser, s'informer) et un CTA de contact.
  - Étant donné la page persona organisateur, quand il clique sur le CTA de contact, alors une confirmation visible à l'écran se déclenche (même mécanisme que le testateur : pas d'adresse de contact dans la passation, pas de mailto inventé).
  - Étant donné le parcours complet (accueil → choix de profil → organisateur), l'organisateur atteint sa page persona sans aide externe (pas d'étape ambiguë, pas de blocage).
- **Hypothèse de l'équipe couverte** : « Le carrousel et les CTA de dispatch permettent à l'organisateur de trouver son point d'entrée dès la page d'accueil » (mesure : nombre d'étapes avant d'atteindre la page persona organisateur, cible 0 aide externe).
- **Codage estimé** : 5 minutes (contenu structurellement proche du testateur, déjà en place).
- **Fichiers prévus** : `frontend/src/app/donnees-organisateur.ts` (+ test), extension de `PersonaEcran` dans `page.tsx`.
- **Tests unitaires prévus** : 1 à 2, sur la structure des actions/CTA organisateur.
- **Étapes ajoutées à la démo** : après le clic sur « Organisateur d'action solidaire », vérifier l'affichage des 3 actions et du CTA de contact.
- **Bilan** :
  - Codage réel : moins d'1 minute (structure reprise du testateur).
  - Critères d'acceptation : les 3 sont satisfaits — 3 actions affichées, CTA de contact avec confirmation à l'écran, parcours sans aide externe (même dispatch que les autres profils).
  - Tests unitaires : 2 nouveaux (`donnees-organisateur.test.ts`) ; 9 au total, `npm test` passe.
  - Lint : `npm run lint` passe sans erreur. Build Next.js vérifié sans erreur.
  - Contrat de déployabilité : `./scripts/verifier-deployabilite.sh` ne signale aucune borne.
  - Déploiement : rebuild/push de l'image frontend seule, `podman compose up -d --force-recreate`. Vérifié depuis la machine : `localhost:8080/` → 200, `/health` → `ok`, `localhost:8081/health` → `{"status":"ok"}`.
  - Signalé à PM Lab : `./scripts/signaler-version.sh 3` → version 3 enregistrée avec succès.
  - Reporté : rien de prévu n'a été coupé.
  - **Modifications** :
    - `frontend/src/app/donnees-organisateur.ts` + `.test.ts` : contenu réel (3 actions, CTA de contact), sourcé de `passation/cadrage/7-prd.md`.
    - `frontend/src/app/page.tsx` : `PersonaEcran` dispatche vers un nouveau `PersonaOrganisateurEcran` pour le profil organisateur (même mécanisme de confirmation à l'écran que le testateur).

## À venir (non détaillé, backlog ordonné)

1. Pages persona entreprise et particulier (hors périmètre du PRD de cette version, à réévaluer si le temps le permet un autre build).
2. Bibliothèque « voir tout » des événements et actions par persona (hors périmètre PRD).
3. Chatbot Margo et pop-up de collecte d'email (hors périmètre PRD).
