import Link from "next/link";

interface MostReadProps {
    id: number;
    title: string;
}

const MostRead = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read");
    const data = await res.json();
    const news : MostReadProps[] = data.data;
    console.log(news);
    return (
        <div className="card bg-base-400 border border-base-300 p-3  shadow-sm">
            <h1 className="font-bold text-lg">সর্বাধিক পঠিত</h1>
            <div>
                {news.map((n, i) => <Link href={`/news/${n.id}`} key={i}>
                    <div className="flex gap-2 mt-3" key={i}> <p className="font-bold text-red-700 text-lg">{i+1}</p> <h2 className= "font-semibold">{n.title}</h2></div>
                </Link>)}
            </div>
        </div>
    );
};

export default MostRead;