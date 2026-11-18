"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { CARROUSEL_ITEMS, CHIFFRES_CLES } from "./donnees-accueil";
import { CTAS_TESTATEUR, LIBERALITES_INTRO, LIBERALITES_ITEMS } from "./donnees-testateur";
import { indexSuivant } from "@/lib/carrousel";
import { PROFILS, UTILISATEURS_EXEMPLE, trouverProfil, type ProfilId } from "@/lib/personas";

type Ecran = "accueil" | "profil" | "persona";

const INTERVALLE_CARROUSEL_MS = 4000;

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("accueil");
  const [profilChoisi, setProfilChoisi] = useState<ProfilId | null>(null);
  const [utilisateurId, setUtilisateurId] = useState<ProfilId>(UTILISATEURS_EXEMPLE[0].id);
  const [indexCarrousel, setIndexCarrousel] = useState(0);
  // Clics depuis l'accueil : mesure l'hypothèse de l'équipe (cible 1 clic, cf. ITERATIONS.md ⚠️).
  const [clics, setClics] = useState(0);

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
            onEngager={() => {
              setClics((c) => c + 1);
              setEcran("profil");
            }}
          />
        )}
        {ecran === "profil" && (
          <ProfilEcran
            onChoisir={(profil) => {
              setClics((c) => c + 1);
              setProfilChoisi(profil);
              setEcran("persona");
            }}
            onRetour={() => setEcran("accueil")}
          />
        )}
        {ecran === "persona" && profilChoisi && (
          <PersonaEcran
            profilId={profilChoisi}
            clics={clics}
            onCtaCliquee={() => setClics((c) => c + 1)}
            onRetour={() => setEcran("profil")}
          />
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
  clics,
  onCtaCliquee,
  onRetour,
}: {
  profilId: ProfilId;
  clics: number;
  onCtaCliquee: () => void;
  onRetour: () => void;
}) {
  const profil = trouverProfil(profilId)!;

  if (profilId === "testateur") {
    return <PersonaTestateurEcran clics={clics} onCtaCliquee={onCtaCliquee} onRetour={onRetour} />;
  }

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

function PersonaTestateurEcran({
  clics,
  onCtaCliquee,
  onRetour,
}: {
  clics: number;
  onCtaCliquee: () => void;
  onRetour: () => void;
}) {
  const [confirmation, setConfirmation] = useState<string | null>(null);

  return (
    <section>
      <h1>Page Testateur — préparer un legs</h1>
      <p>{LIBERALITES_INTRO}</p>
      <ul className={styles.liberalites}>
        {LIBERALITES_ITEMS.map((item) => (
          <li key={item.titre}>
            <strong>{item.titre}</strong>
            <span>{item.texte}</span>
          </li>
        ))}
      </ul>

      <div className={styles.ctas}>
        {CTAS_TESTATEUR.map((cta) =>
          cta.type === "lien" ? (
            <a
              key={cta.id}
              href={cta.href}
              download
              className={styles.primary}
              onClick={onCtaCliquee}
            >
              {cta.label}
            </a>
          ) : (
            <button
              key={cta.id}
              type="button"
              onClick={() => {
                onCtaCliquee();
                setConfirmation(`Votre demande (« ${cta.label} ») a été enregistrée.`);
              }}
            >
              {cta.label}
            </button>
          )
        )}
      </div>

      {confirmation && (
        <p role="status" aria-live="polite">
          {confirmation}
        </p>
      )}

      <p className={styles.compteurClics}>
        Clics depuis la page d&apos;accueil pour arriver jusqu&apos;ici : {clics}
      </p>

      <button type="button" onClick={onRetour}>
        ← Retour au choix de profil
      </button>
    </section>
  );
}
