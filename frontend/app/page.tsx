"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true); // toggle login / signup
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e:any) => {
    e.preventDefault();

    const url = isLogin
        ? "http://localhost:4000/auth/login"
        : "http://localhost:4000/auth/register";

    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.success) {
        alert(data.message);  // ✔ FIXED

        if (isLogin) {
            localStorage.setItem("auth", "true");
            router.push("/tasks");
        } else {
            setIsLogin(true);
        }
    } else {
        alert(data.message);
    }
};


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
                <h2 className="text-xl font-bold mb-4 text-center">
                    {isLogin ? "Login" : "Sign Up"}
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full p-2 border mb-3 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border mb-4 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {isLogin ? "Login" : "Create Account"}
                </button>

                {/* Toggle Button */}
                <p className="text-center mt-4 text-sm">
                    {isLogin ? (
                        <>
                            Don’t have an account?{" "}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setIsLogin(false)}
                            >
                                Sign Up
                            </span>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <span
                                className="text-blue-600 cursor-pointer"
                                onClick={() => setIsLogin(true)}
                            >
                                Login
                            </span>
                        </>
                    )}
                </p>
            </form>
        </div>
    );
}

