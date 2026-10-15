import Image from "next/image";
import Link from "next/link";
interface News {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
}

const NewsCard = ({ news }: { news: News }) => {
    // console.log(news);
    return (
        <Link href={`/news/${news.id}`} className="w-full">
            <div className="card bg-base-100 w-full  shadow-sm ">
                <figure>
                    <Image
                        width={400}
                        height={400}
                        src={news.imageUrl}
                        alt={news.imageAlt}
                    />
                </figure>
                <div className="card-body">
                    <p className="text-red-600 font-semibold text-sm">{news.category}</p>
                    <h2 className="card-title">{news.title}</h2>
                    <p className="line-clamp-3">{news.description}</p>

                </div>
            </div>
        </Link>
    );
};

export default NewsCard;