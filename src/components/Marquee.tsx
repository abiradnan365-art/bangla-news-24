import Link from "next/link";
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

interface Headlines {
    id: string,
    title: string
}

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10");
    const data = await res.json();
    const headlines: Headlines[] = data.data;

    // console.log(headlines);
    return (
        <div className="bg-red-700 text-white">
            <div className="flex items-center max-w-6xl mx-auto ">
                <div className="bg-red-900 px-2 py-1">সর্বশেষ</div>
            <MarqueeText pauseOnHover={true} duration={9} direction="right">
            {headlines.map(h => <Link href={`/news/${h.id}`} key={h.id} className="hover:underline">
                <span>{h.title}</span>
                <span className="mx-5">•</span>
            </Link>)}
            </MarqueeText>
            </div>
        </div>
    );
};

export default Marquee;