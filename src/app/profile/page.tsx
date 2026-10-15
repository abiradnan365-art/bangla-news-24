import { authClient } from "@/lib/auth-client";


const ProfilePage = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;
    console.log("UserInfo session:", user);
    return (
        <div>
            Profile Page
        </div>
    );
};

export default ProfilePage;