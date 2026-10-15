"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const SignInPage = () => {
const handleGoogleSignIn = async () => {
try {
const { error } = await authClient.signIn.social({
provider: "google",
callbackURL: "/",
});


        if (error) {
            console.error("Google sign-in error:", error);
            toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    } catch (error) {
        console.error("Google sign-in error:", error);
        toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
    }
};

const handleGitHubSignIn = async () => {
    try {
        const { error } = await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
        });

        if (error) {
            console.error("GitHub sign-in error:", error);
            toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    } catch (error) {
        console.error("GitHub sign-in error:", error);
        toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
    }
};

const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof email !== "string" ||
        typeof password !== "string" ||
        !email.trim() ||
        !password
    ) {
        toast.error("অনুগ্রহ করে ইমেইল ও পাসওয়ার্ড দিন।");
        return;
    }

    try {
        const { data, error } = await authClient.signIn.email({
            email: email.trim(),
            password,
            callbackURL: "/",
        });

        if (error) {
            console.error("Error signing in:", error);

            toast.error(
                error.code === "INVALID_EMAIL_OR_PASSWORD"
                    ? "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়।"
                    : "সাইন ইন করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
            );

            return;
        }

        if (data) {
            console.log("User signed in successfully:", data);

            toast.success("সাইন ইন সফল হয়েছে!");

            redirect("/");
        }
    } catch (error) {
        console.error("Error signing in:", error);
        toast.error("একটি সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।");
    }
};

return (
    <div>
        <div className="mt-5">
            <form
                onSubmit={onSubmit}
                className="flex flex-col items-center gap-4"
            >
                <h2 className="font-bold text-2xl text-red-700">
                    সাইন ইন
                </h2>

                <p className="text-sm text-gray-500 text-center">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে
                    অ্যাকাউন্টে ঢুকুন।
                </p>

                <fieldset className="fieldset border-base-300 rounded-box w-xs p-4">
                    <label className="label">ইমেইল</label>

                    <input
                        name="email"
                        type="email"
                        className="input"
                        placeholder="আপনার ইমেইল"
                        autoComplete="email"
                        required
                    />

                    <label className="label">পাসওয়ার্ড</label>

                    <input
                        name="password"
                        type="password"
                        className="input"
                        placeholder="আপনার পাসওয়ার্ড"
                        autoComplete="current-password"
                        required
                    />

                    <button
                        type="submit"
                        className="btn btn-neutral mt-4 bg-red-700"
                    >
                        সাইন ইন করুন
                    </button>
                </fieldset>

                <p className="text-sm text-gray-500">
                    ----------------- অথবা -----------------
                </p>
            </form>

            <div className="flex flex-col items-center mt-4">
                <button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="btn btn-outline mt-4"
                >
                    Google দিয়ে চালিয়ে যান
                </button>

                <button
                    type="button"
                    onClick={handleGitHubSignIn}
                    className="btn btn-outline mt-4"
                >
                    GitHub দিয়ে চালিয়ে যান
                </button>

                <p className="mt-5">
                    অ্যাকাউন্ট নেই?{" "}
                    <Link
                        className="text-red-700 hover:underline"
                        href="/signup"
                    >
                        সাইন আপ করুন
                    </Link>
                </p>

                <Link
                    className="text-gray-500 mt-5 text-sm"
                    href="/"
                >
                    ← হোম পেজে ফিরে যান
                </Link>
            </div>
        </div>
    </div>
);


};

export default SignInPage;
