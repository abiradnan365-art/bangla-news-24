import NewsCard from "@/components/NewsCard";
import Link from "next/link";
interface ICategoryNews {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
}

const CategoryNews = async ({params}: {params: Promise<{categoryId: string}>}) => {
    const { categoryId } = await params;
    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${categoryId}`);
    const data = await res.json();
    const categoryNews = data.data;
    console.log(categoryNews);
    console.log(categoryId);
    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 border-red-600 mb-5 mt-5">{data.title}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categoryNews.map((news: ICategoryNews) => 
                    <NewsCard key={news.id} news={news}></NewsCard>
                )}
            </div>
            
        </div>
    );
};

export default CategoryNews;