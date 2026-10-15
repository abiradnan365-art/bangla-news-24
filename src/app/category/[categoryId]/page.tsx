import { Suspense } from "react";

import { notFound } from "next/navigation";
import NewsCard from "@/components/NewsCard";

interface CategoryParams {
  categoryId: string;
}

interface ICategoryNews {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  category: string;
}

interface CategoryNewsData {
  title: string;
  data: ICategoryNews[];
}

const CategoryContent = async ({
  params,
}: {
  params: Promise<CategoryParams>;
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://news-api-v2.vercel.app/api/category/${categoryId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category news");
  }

  const result: CategoryNewsData = await res.json();
  const categoryNews = result.data;

  if (!Array.isArray(categoryNews) || categoryNews.length === 0) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold border-b-2 border-red-600 mb-5 mt-5">
        {result.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryNews.map((news) => (
          <NewsCard key={news.id} news={news} />
        ))}
      </div>
    </div>
  );
};

export default function CategoryNewsPage({
  params,
}: {
  params: Promise<CategoryParams>;
}) {
  return (
    <Suspense
      fallback={
        <div className="p-5">
         
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}