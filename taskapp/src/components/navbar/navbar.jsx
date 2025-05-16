"use client";

import Link from 'next/link';
import React, { useState } from 'react';
import styles from './navbar.module.css';
import { usePathname } from 'next/navigation';
import useFirebaseAuth from '@/hooks/firebaseAuth';

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const pathName = usePathname();
    const user = useFirebaseAuth();

    const navItems = [
        { path: '/user-profile', label: 'My profile' },
        { path: '/settings', label: 'Settings' },
    ];

    return (
        <div className={styles.topnav}>
            <button
                className={styles.hamburger}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle navigation"
            >
                ☰
            </button>
            {user && (
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
            )}
        </div>
    );
}

export default Navbar;