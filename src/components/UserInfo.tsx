

"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log("UserInfo session:", user);
    const handleSignOut = async () => {
        await authClient.signOut();
        // Optionally, you can redirect the user after signing out
        
    }

    return (
        <div>
            {
                user ? (
                    <div className='absolute right-4 flex gap-2'>
                        <Link href="/profile">
                        <div>{user.name}</div>
                        </Link>
                        <button onClick={handleSignOut} className='btn bg-red-700 text-white'>সাইন আউট</button>
                    </div>
                ) : (
                    <div className='absolute right-4 flex gap-2'>
                       <Link href="/signin"> <button className='btn'>সাইন ইন</button> </Link>
                       <Link href="/signup"> <button className='btn bg-red-700 text-white'>সাইন আপ</button> </Link>
                    </div>
                )
            }
           </div> 
    );
};

export default UserInfo;