"use client"

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignUpPage = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = {
            name: String(formData.get("name") ?? ""),
            email: String(formData.get("email") ?? ""),
            password: String(formData.get("password") ?? ""),
            image: String(formData.get("image") ?? "") || undefined,
        };
        // console.log(user);
        const { data, error } = await authClient.signUp.email({
            ...user,
            callbackURL: "/"
        });
        if (data) {
            console.log("User signed up successfully:", data);
            redirect("/");
        }

        if (error) {
            console.error("Error signing up:", error);
        }
    };
    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
        console.log("Google sign-in data:", data);
    };
    const handleGitHubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github"
        });
        console.log("GitHub sign-in data:", data);
    };

    return (
        <div className="mt-5">
            <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
                <h2 className='font-bold text-2xl text-red-700'>সাইন আপ</h2>
                <fieldset className="fieldset border-base-300 rounded-box w-xs  p-4">

                    <label className="label">নাম</label>
                    <input name="name" type="text" className="input" placeholder="নাম" />

                    <label className="label">Image</label>
                    <input name="image" type="url" className="input" placeholder="Image" />

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className="input" placeholder="ইমেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input" placeholder="পাসওয়ার্ড" />

                    <button type="submit" className="btn btn-neutral mt-4 bg-red-700">সাইন আপ করুন</button>
                </fieldset>
            </form>
            <button className="btn btn-outline mt-4" onClick={handleGoogleSignIn}>Sign in with Google</button>
            <button className="btn btn-outline mt-4" onClick={handleGitHubSignIn}>Sign in with GitHub</button>
        </div>
    );
};

export default SignUpPage;