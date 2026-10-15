"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";  

const SignInPage = () => {

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries()) as { email: string; password: string };
        const { data, error } = await authClient.signIn.email({
            ...user,
            callbackURL: "/"
        });
        if (data) {
            console.log("User signed in successfully:", data);
            redirect("/");
        }
        if (error) {
            console.error("Error signing in:", error);
        }

    }
    return (
        <div className="mt-5">
            <form onSubmit={onSubmit} className="flex flex-col items-center gap-4">
                <h2 className='font-bold text-2xl text-red-700'>সাইন ইন</h2>
                <fieldset className="fieldset border-base-300 rounded-box w-xs  p-4">

                    

                    <label className="label">ইমেইল</label>
                    <input name="email" type="email" className="input" placeholder="ইমেইল" />

                    <label className="label">পাসওয়ার্ড</label>
                    <input name="password" type="password" className="input" placeholder="পাসওয়ার্ড" />

                    <button className="btn btn-neutral mt-4 bg-red-700">সাইন ইন করুন</button>
                </fieldset>
            </form>
        </div>
    );
};

export default SignInPage;