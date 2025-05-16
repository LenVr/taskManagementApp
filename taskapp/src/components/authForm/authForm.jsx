"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function AuthForm() {
    const [form, setForm] = useState({ email: "", password: "", name: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    const isRegister = pathname === "/register";

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const auth = getAuth();

        try {
            if (isRegister) {
                const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password);
                if (form.name) {
                    await updateProfile(userCredential.user, { displayName: form.name });
                }
                router.push("/");
            } else {
                await signInWithEmailAndPassword(auth, form.email, form.password);
                router.push("/");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{isRegister ? "Register" : "Login"}</h2>
            {isRegister && (
                <div>
                    <label>Name</label>
                    <input
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            <div>
                <label>Email</label>
                <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Password</label>
                <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : isRegister ? "Register" : "Login"}
            </button>
        </form>
    );
}