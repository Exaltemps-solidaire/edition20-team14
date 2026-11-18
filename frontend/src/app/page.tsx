"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CARROUSEL_ITEMS, CHIFFRES_CLES } from "./donnees-accueil";
import { indexSuivant } from "@/lib/carrousel";
import { PROFILS, UTILISATEURS_EXEMPLE, trouverProfil, type ProfilId } from "@/lib/personas";

type Ecran = "accueil" | "profil" | "persona";

const INTERVALLE_CARROUSEL_MS = 4000;

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("accueil");
  const [profilChoisi, setProfilChoisi] = useState<ProfilId | null>(null);
  const [utilisateurId, setUtilisateurId] = useState<ProfilId>(UTILISATEURS_EXEMPLE[0].id);
  const [indexCarrousel, setIndexCarrousel] = useState(0);

  useEffect(() => {
    const minuteur = setInterval(() => {
      setIndexCarrousel((actuel) => indexSuivant(actuel, CARROUSEL_ITEMS.length));
    }, INTERVALLE_CARROUSEL_MS);
    return () => clearInterval(minuteur);
  }, []);

  const utilisateurCourant = UTILISATEURS_EXEMPLE.find((u) => u.id === utilisateurId)!;

  return (
    <div className={styles.page}>
      <header className={styles.enTete}>
        <span>Vous incarnez : {utilisateurCourant.nom} — {utilisateurCourant.role}</span>
        <label>
          Qui êtes-vous ? (pour tester)
          <select
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(e.target.value as ProfilId)}
          >
            {UTILISATEURS_EXEMPLE.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nom} — {u.role}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className={styles.main}>
        {ecran === "accueil" && (
          <AccueilEcran
            indexCarrousel={indexCarrousel}
            onEngager={() => setEcran("profil")}
          />
        )}
        {ecran === "profil" && (
          <ProfilEcran
            onChoisir={(profil) => {
              setProfilChoisi(profil);
              setEcran("persona");
            }}
            onRetour={() => setEcran("accueil")}
          />
        )}
        {ecran === "persona" && profilChoisi && (
          <PersonaEcran profilId={profilChoisi} onRetour={() => setEcran("profil")} />
        )}
      </main>
    </div>
  );
}

function AccueilEcran({
  indexCarrousel,
  onEngager,
}: {
  indexCarrousel: number;
  onEngager: () => void;
}) {
  const diapo = CARROUSEL_ITEMS[indexCarrousel];
  return (
    <>
      <section className={styles.carrousel} aria-live="polite">
        <h2>{diapo.titre}</h2>
        <p>{diapo.texte}</p>
      </section>

      <section className={styles.presentation}>
        <h1>Imagine for Margo</h1>
        <p>
          Entreprise, particulier, personne qui prépare un legs, organisateur d&apos;une
          action solidaire : trouvez votre façon d&apos;agir avec Imagine for Margo.
        </p>
        <ul className={styles.chiffresCles}>
          {CHIFFRES_CLES.map((chiffre) => (
            <li key={chiffre.legende}>
              <strong>{chiffre.valeur}</strong>
              <span>{chiffre.legende}</span>
            </li>
          ))}
        </ul>
      </section>

      <div className={styles.ctas}>
        <button type="button" onClick={onEngager}>
          Voir plus
        </button>
        <button type="button" onClick={onEngager} className={styles.primary}>
          Je veux m&apos;engager
        </button>
        <button type="button" onClick={onEngager}>
          Je veux agir
        </button>
      </div>
    </>
  );
}

function ProfilEcran({
  onChoisir,
  onRetour,
}: {
  onChoisir: (profil: ProfilId) => void;
  onRetour: () => void;
}) {
  return (
    <section>
      <h1>Choisissez votre profil</h1>
      <div className={styles.ctas}>
        {PROFILS.map((profil) => (
          <button key={profil.id} type="button" onClick={() => onChoisir(profil.id)}>
            {profil.label}
          </button>
        ))}
      </div>
      <button type="button" onClick={onRetour}>
        ← Retour à l&apos;accueil
      </button>
    </section>
  );
}

function PersonaEcran({
  profilId,
  onRetour,
}: {
  profilId: ProfilId;
  onRetour: () => void;
}) {
  const profil = trouverProfil(profilId)!;
  return (
    <section>
      <h1>Page {profil.label}</h1>
      <p>Contenu à venir pour ce profil.</p>
      <button type="button" onClick={onRetour}>
        ← Retour au choix de profil
      </button>
    </section>
  );
}
