# Déploiement

La procédure qui fait foi est celle du `/CLAUDE.md` à la racine du serveur de hackathon (voir
[docs/guidelines-deploiement.md](docs/guidelines-deploiement.md)) : ce fichier résume comment ce
dépôt s'y conforme, pas une procédure alternative.

## Les deux services

- `api/` : Node sans dépendance, écoute sur le port `8081` (variable `PORT`, voir `.env.example`),
  répond sur `GET /health` et `GET /sante`. `Dockerfile` à la racine du dossier.
- `frontend/` : export statique Next.js servi par nginx sur le port `80` du conteneur (publié en
  `8080` sur la VM), avec `/health` et `/sante` en fichiers statiques. `Dockerfile` à la racine du
  dossier.

Le front appelle l'API en chemin relatif (`/api/v1/...`) : aucune URL absolue, aucun CORS à
configurer. Aucun des deux services ne lit de secret pour l'instant.

## Construire et publier les images

```bash
podman build -t localhost:5000/team14/api:dev api
podman build -t localhost:5000/team14/frontend:dev frontend
podman push localhost:5000/team14/api:dev
podman push localhost:5000/team14/frontend:dev
```

## Lancer

Un `podman-compose.yml` à la racine du serveur (`/srv/team14/app/podman-compose.yml`, hors de ce
dépôt) rejoint `core-network`, publie `8080` (frontend) et `8081` (api), et nomme les services
internes par leur adresse `.internal`. Voir la recette du `/CLAUDE.md` du serveur pour son
contenu exact et la commande `podman compose up -d --force-recreate`.

## Vérifier

Depuis le serveur :

```bash
curl -s localhost:8080/ && curl -s localhost:8081/health
```

Depuis un navigateur, une fois en ligne : `$URL_PUBLIQUE/health` et `$URL_PUBLIQUE/sante`
doivent répondre 200 avec un corps non vide (une page de réveil répond aussi 200 : vérifier le
corps, pas seulement le code).
