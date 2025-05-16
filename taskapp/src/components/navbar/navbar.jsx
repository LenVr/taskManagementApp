"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import useFirebaseAuth from '@/hooks/firebaseAuth';
import { getAuth, signOut } from "firebase/auth";
import { IoLogOut } from "react-icons/io5";
import { PiKeyReturn } from "react-icons/pi";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();
    const user = useFirebaseAuth();

    const navItems = [
        { path: '/user-profile', label: 'My profile' },
    ];

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div>
            {user ? (
                <div className={styles.topnav}>
                    <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    href={item.path}
                                    className={
                                        pathName === item.path
                                            ? styles.navbarLinkSelected
                                            : styles.navbarLink
                                    }
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.logOutBtnContainer}>
                        <IoLogOut
                            className={styles.iconBtn}
                            onClick={handleLogout}
                            title="Logout"
                        />
                    </div>
                </div>
            ) : (
                <div className={styles.topnav}>
                    <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
                        {(pathName === '/login' || pathName === '/register') && (
                            <li>
                                <Link href="/" onClick={() => setMenuOpen(false)}>
                                    <PiKeyReturn className={styles.iconBtn} title="Back" />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Navbar;