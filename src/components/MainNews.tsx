'use client';
import Image from "next/image";
import Link from "next/link";
interface MainNewsProps {
    news: {
        id: string ;
        title: string;
        description: string;
        imageUrl: string;
        category: string;
    }[];
}

const MainNews = ({ news }: MainNewsProps) => {
    const [firstNews, ...otherNews] = news;
    
   
    return ( 
    <div className="flex gap-3">
       <Link href={`/news/${firstNews.id}`} className="w-full">
        
            <div className="card bg-base-100 w-96 shadow-sm ">
                <figure>
                    <Image 
                    width={400}
                    height={400}
                    src={firstNews.imageUrl}
                    alt=""
                    />
                </figure>
                <div className="card-body">
                    <p className="text-red-600 font-semibold text-sm">{firstNews.category}</p>
                    <h2 className="card-title">{firstNews.title}</h2>
                    <p>{firstNews.description}</p>
                   
                </div>
            </div>
       </Link>
       {/* <Link href={`/news/${firstNews.id}`} className="w-full"> */}
            <div className="grid gap-2">
                
                {otherNews.slice(0,4).map(on => <Link href={`/news/${on.id}`} key={on.id}>
                    <div className="card bg-base-100 border border-gray-300 p-5" key={on.id}>
                        <p className="text-red-600 font-semibold text-sm">{firstNews.category}</p>
                        <div className="font-bold">{on.title}</div>
                    </div>
                </Link> )}
            </div>
         {/* </Link> */}
        </div>
    );
};

export default MainNews;