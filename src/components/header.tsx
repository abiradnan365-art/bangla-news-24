import React from 'react';
import Image from 'next/image';
import NavLinks from './NavLinks';
import UserInfo from './UserInfo';
const Header = () => {
    const date = new Date().toLocaleDateString("bn-BD",
        {
            dateStyle: "full",
        });

    return (
        <header className =" container max-w-6xl mx-auto relative" >
            <div className='flex justify-center items-center p-4  '>

                <div className='flex items-center gap-2 '>
                    <Image
                        className='w-10 h-10'
                        height={50}
                        width={50}
                        src={"/logo.webp"}
                        alt=''
                    />
                    <div>
                        <h2 className="text-2xl font-bold text-red-700">Bangla News 24</h2>
                        <p className="text-sm text-gray-500">{date}</p>
                    </div>


                </div>
                <UserInfo />

            </div>
            <NavLinks />
        </header>

    );
};

export default Header;