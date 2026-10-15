import MainNews from "@/components/MainNews";

import MostRead from "@/components/MostRead";
import NewsCard from "@/components/NewsCard";
import Link from "next/link";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
  }[];
}

export default async function Home() {
  const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
  const data = await res.json();
  const sections = data.data;
  const mainNews = sections[0].articles
  const otherSections = sections.slice(1);

  // console.log(otherSections);
  return (

   
     

      <div className="grid gap-5 grid-cols-3 mt-5">
        {/* news section */}
      
        <div className="col-span-2 ">
          <MainNews news={mainNews}></MainNews>

          <div className="grid gap-5 mt-5">
            {otherSections.map((os: IOtherSection) => <div className=" " key={os.curationId}><h1 className="font-bold border-b-2 pb-1 border-red-700 ">{os.title}</h1>

              <div className="grid grid-cols-3 gap-5 mt-5">
                {os.articles.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

            </div>)}
          </div>
        </div>
              
        {/* most read section */}
        <div className=" col-span-1 ">
          <MostRead />
        </div>

      </div>
      
  
  );
}
