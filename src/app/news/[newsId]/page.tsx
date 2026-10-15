import Image from "next/image";
import React from "react";

interface NewsDetailsProps {
params: Promise<{
newsId: string;
}>;
}

interface Topic {
id: string | number;
name: string;
}

interface DescriptionBlock {
model?: {
blocks?: Array<{
model?: {
text?: string;
};
}>;
};
}

interface NewsBodyText {
type: "text" | "subheading";
text: string;
}

interface NewsBodyImage {
type: "image";
url: string;
altText?: string;
caption?: string;
width?: number;
height?: number;
}

interface NewsDetails {
topics?: Topic[];
title?: string;
byline?: Array<{ name: string }>;
firstPublished?: string;
imageUrl?: string;
description?: {
blocks?: DescriptionBlock[];
};
body?: Array<NewsBodyText | NewsBodyImage>;
tags?: string[];
}

const NewsDetails = async ({ params }: NewsDetailsProps) => {
const { newsId } = await params;


const res = await fetch(
    `https://news-api-v2.vercel.app/api/article/${newsId}`,
    {
        cache: "no-store",
    }
);

if (!res.ok) {
    return (
        <main className="container max-w-6xl mx-auto mt-4 px-4">
            <div className="rounded-2xl border-2 border-gray-200 p-8 text-center">
                <h1 className="text-2xl font-bold text-red-700">
                    Failed to load news
                </h1>
            </div>
        </main>
    );
}

const data = await res.json();
const newsDetails: NewsDetails | undefined = data?.data;

if (!newsDetails) {
    return (
        <main className="container max-w-6xl mx-auto mt-4 px-4">
            <div className="rounded-2xl border-2 border-gray-200 p-8 text-center">
                <h1 className="text-2xl font-bold text-red-700">
                    News not found
                </h1>
            </div>
        </main>
    );
}

return (
    <main className="container max-w-6xl mx-auto mt-4 px-4 pb-8">
        <article className="overflow-hidden rounded-2xl border-2 border-gray-200">

            {/* News Header */}
            <div className="flex flex-col gap-5 p-4 sm:p-6">

                {/* Categories */}
                {newsDetails.topics &&
                    newsDetails.topics.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {newsDetails.topics.map((topic) => (
                                <span
                                    key={topic.id}
                                    className="badge badge-error badge-outline"
                                >
                                    {topic.name}
                                </span>
                            ))}
                        </div>
                    )}

                {/* Title */}
                <h1 className="text-2xl font-bold leading-tight text-base-content sm:text-3xl md:text-4xl">
                    {newsDetails.title || "Untitled News"}
                </h1>

                {/* Author and Date */}
                <div className="flex flex-col gap-2 text-sm text-gray-500 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">

                    <p>
                        ✍️ {newsDetails.byline?.[0]?.name || "Unknown Author"}
                    </p>

                    {newsDetails.firstPublished && (
                        <p>
                            📅{" "}
                            {new Date(
                                newsDetails.firstPublished
                            ).toLocaleDateString("bn-BD", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </p>
                    )}
                </div>
            </div>

            {/* Main Image */}
            {newsDetails.imageUrl && (
                <div className="px-4 sm:px-6">
                    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src={newsDetails.imageUrl}
                            alt={newsDetails.title || "News image"}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* News Content */}
            <div className="p-4 sm:p-6">

                {/* Description */}
                {newsDetails.description?.blocks &&
                    newsDetails.description.blocks.length > 0 && (
                        <div className="mb-8 border-b border-gray-200 pb-6 text-lg font-medium leading-8">
                            {newsDetails.description.blocks.map(
                                (block, index) => {
                                    const text =
                                        block.model?.blocks?.[0]?.model?.text;

                                    if (!text) return null;

                                    return (
                                        <p key={index} className="mb-4 last:mb-0">
                                            {text}
                                        </p>
                                    );
                                }
                            )}
                        </div>
                    )}

                {/* News Body */}
                {newsDetails.body &&
                    newsDetails.body.length > 0 && (
                        <div className="space-y-8">

                            {newsDetails.body.map((item, index) => {

                                if (item.type === "text") {
                                    return (
                                        <p
                                            key={index}
                                            className="whitespace-pre-line text-base leading-8 text-base-content/90 sm:text-lg sm:leading-9"
                                        >
                                            {item.text}
                                        </p>
                                    );
                                }

                                if (item.type === "subheading") {
                                    return (
                                        <h2
                                            key={index}
                                            className="mt-8 border-l-4 border-red-700 pl-3 text-xl font-bold sm:text-2xl"
                                        >
                                            {item.text}
                                        </h2>
                                    );
                                }

                                if (item.type === "image") {
                                    return (
                                        <figure key={index} className="my-8">

                                            <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100">
                                                <Image
                                                    src={item.url}
                                                    alt={
                                                        item.altText ||
                                                        item.caption ||
                                                        newsDetails.title ||
                                                        "News image"
                                                    }
                                                    width={item.width || 1024}
                                                    height={item.height || 600}
                                                    className="h-auto w-full object-cover"
                                                />
                                            </div>

                                            {item.caption && (
                                                <figcaption className="mt-2 text-sm text-gray-500">
                                                    {item.caption}
                                                </figcaption>
                                            )}

                                        </figure>
                                    );
                                }

                                return null;
                            })}

                        </div>
                    )}

                {/* Tags */}
                {newsDetails.tags &&
                    newsDetails.tags.length > 0 && (
                        <div className="mt-10 border-t border-gray-200 pt-6">

                            <h3 className="mb-4 font-bold text-red-700">
                                Tags
                            </h3>

                            <div className="flex flex-wrap gap-2">
                                {newsDetails.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="badge badge-neutral"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>

                        </div>
                    )}

            </div>
        </article>
    </main>
);


};

export default NewsDetails;
