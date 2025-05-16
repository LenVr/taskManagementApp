"use client";

import "../firebase/firebase"
import styles from "./page.module.css";
import Link from "next/link";
import useFirebaseAuth from "@/hooks/firebaseAuth";

export default function Home() {
  const user = useFirebaseAuth();

  return (
    <section className={styles.mainSection}>
      {!user ? (
        <div className={styles.mainContainer}>
          <h2>Welcome to TaskApp</h2>
          <div className={styles.btnsContainer}>
            <Link href="/login" className={styles.btn}>Login</Link>
            <Link href="/register" className={styles.btn}>Register</Link>
          </div>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <p>Hola {user.displayName || user.email}</p>
        </div>
      )}
    </section>
  );
}