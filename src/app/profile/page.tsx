"use client";

import { authClient } from "@/lib/auth-client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const ProfileContent = ({
    user,
}: {
    user: { id: string; name?: string | null; email: string };
}) => {
    const [name, setName] = useState(user.name || "");
    const [loading, setLoading] = useState(false);
    const [signingOut, setSigningOut] = useState(false);


    const router = useRouter();

    const handleSignOut = async () => {
        setSigningOut(true);

        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");
            router.push("/signin");
            router.refresh();
        } catch (error) {
            console.error("Sign-out error:", error);
            toast.error("কিছু একটা সমস্যা হয়েছে।");
        } finally {
            setSigningOut(false);
        }
    };

    const handleUpdateName = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const trimmedName = name.trim();

        if (!trimmedName) {
            toast.error("নাম লিখুন।");
            return;
        }

        if (trimmedName === (user.name || "")) {
            toast.info("নামে কোনো পরিবর্তন করা হয়নি।");
            return;
        }

        setLoading(true);

        try {
            const { error } = await authClient.updateUser({
                name: trimmedName,
            });

            if (error) {
                console.error("Name update error:", error);
                toast.error(error.message || "নাম আপডেট করা যায়নি।");
                return;
            }

            toast.success("নাম সফলভাবে আপডেট হয়েছে!");
        } catch (error) {
            console.error("Name update error:", error);
            toast.error("কিছু একটা সমস্যা হয়েছে।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-3xl">

                {/* Profile Heading */}
                <div className="mb-5">
                    <h2 className="text-xl font-bold text-red-700">
                        আমার প্রোফাইল
                    </h2>

                    <p className="text-sm text-gray-500">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* User Information Card */}
                <div className="mb-4 flex flex-col items-center justify-between gap-4 rounded-xl border border-red-100 bg-red-50/40 p-5 sm:flex-row">

                    <div className="flex w-full items-center gap-3">

                        {/* Avatar */}
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-100 text-xl font-bold uppercase text-red-700">
                            {user.name?.trim().charAt(0) || "U"}
                        </div>

                        {/* Name and Email */}
                        <div className="min-w-0">
                            <h3 className="font-semibold text-gray-800">
                                {user.name || "ব্যবহারকারী"}
                            </h3>

                            <p className="break-all text-sm text-gray-500">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        disabled={signingOut}
                        className="btn btn-outline btn-error btn-sm shrink-0"
                    >
                        {signingOut ? "সাইন আউট হচ্ছে..." : "↪ সাইন আউট"}
                    </button>
                </div>

                {/* Edit Profile Card */}
                <div className="rounded-xl border border-red-100 bg-red-50/40 p-6">

                    <h3 className="mb-6 font-bold text-red-700">
                        ব্যক্তিগত তথ্য
                    </h3>

                    <form onSubmit={handleUpdateName}>

                        <div className="mb-5">
                            <label
                                htmlFor="name"
                                className="mb-2 block text-sm text-gray-700"
                            >
                                নাম
                            </label>

                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-red-600 focus:ring-1 focus:ring-red-600"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn w-full border-none bg-red-700 text-white shadow-md hover:bg-red-800 disabled:opacity-60"
                        >
                            {loading ? "আপডেট হচ্ছে..." : "নাম আপডেট করুন"}
                        </button>

                    </form>
                </div>
            </div>
        </div>
    );


};

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;


    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <span className="loading loading-spinner loading-lg text-red-700"></span>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
                <h2 className="text-xl font-bold text-red-700">
                    আপনাকে সাইন ইন করতে হবে
                </h2>

                <p className="text-center text-sm text-gray-500">
                    প্রোফাইল দেখতে প্রথমে আপনার অ্যাকাউন্টে সাইন ইন করুন।
                </p>

                <button
                    type="button"
                    onClick={() => routerToSignIn()}
                    className="btn border-none bg-red-700 text-white hover:bg-red-800"
                >
                    সাইন ইন করুন
                </button>
            </div>
        );
    }

    return <ProfileContent key={user.id} user={user} />;


};

const routerToSignIn = () => {
    window.location.href = "/signin";
};

export default ProfilePage;
