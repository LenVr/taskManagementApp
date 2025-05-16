"use client";

import { db } from "@/firebase/firebase"
import styles from "./page.module.css";
import Link from "next/link";
import useFirebaseAuth from "@/hooks/firebaseAuth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import TaskCard from "@/components/taskCards/taskCard";

export default function Home() {
  const user = useFirebaseAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      try {
        const q = query(
          collection(db, "tasks")
        );
        const querySnapshot = await getDocs(q);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [user]);

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert("Error signing in with Google: " + error.message);
    }
  };

  return (
    <section className={styles.mainSection}>
      {!user ? (
        <div className={styles.mainContainer}>
          <h2 className={styles.mainTitle}>Welcome to TaskApp</h2>
          <div className={styles.btnsContainer}>
            <Link href="/login" className={styles.btn}>Login</Link>
            <Link href="/register" className={styles.btn}>Register</Link>
          </div>
          <button className={styles.googleBtn} onClick={handleGoogleSignIn}>
            <Image
              alt="Google"
              width={1000}
              height={1000}
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
              className={styles.googleBtnLogo}
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      ) : (
        <div className={styles.mainContainer}>
          <div className={styles.tasksContainer}>
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}