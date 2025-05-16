"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import useFirebaseAuth from '@/hooks/firebaseAuth';
import { getAuth, signOut } from "firebase/auth";

import { IoLogOut } from "react-icons/io5";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();
    const user = useFirebaseAuth();

    const navItems = [
        { path: '/user-profile', label: 'My profile' },
        { path: '/settings', label: 'Settings' },
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
            {user && (
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
                            className={styles.logOutBtn}
                            onClick={handleLogout}
                            style={{ cursor: "pointer" }}
                            title="Logout"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Navbar;