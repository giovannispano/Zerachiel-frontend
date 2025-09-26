"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import styles from "./page.module.css";

export default function DashboardPage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className={styles.unauth}>
        Non autenticato. <Link href="/">Vai al login</Link>
      </p>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.welcome}>
          Benvenuto,{" "}
          <span className={styles.name}>
            {user.first_name} {user.last_name}
          </span>
        </h1>
        <p className={styles.sub}>
          Email: {user.email} • Codice Fiscale: {user.tax_code}
        </p>
      </header>

      <section className={styles.cards} aria-label="Accesso rapido">
        <Link
          href="/Dashboard/Richieste"
          className={styles.card}
          aria-label="Vai a Richieste"
        >
          <div className={styles.cardIcon}>📥</div>
          <h3>Richieste</h3>
          <p>Controlla e gestisci le richieste aperte</p>
        </Link>
      </section>
    </div>
  );
}
