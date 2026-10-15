import React from 'react';
import Link from 'next/link';

interface Navs {
    slug: string;
    title: string;
    topicId: string | null;
    url: string;
    scrapable: boolean;
}
const NavLinks = async () => {
    const res = await fetch('https://news-api-v2.vercel.app/api/categories');
    const data = await res.json();
    const navs: Navs[] = data.data;
    const filterdNavs = navs.filter(n => n.scrapable);
    // console.log(navs);
    return (
        <div className='flex gap-4 items-center justify-center p-4 container max-w-6xl mx-auto relative'>
            <Link href={'/'}>হোম</Link>
            {
                filterdNavs.map((n, i) => <Link key={i} href={`/category/${n.slug}`}>{n.title}</Link>)
            }
        </div>
    );
};

export default NavLinks;