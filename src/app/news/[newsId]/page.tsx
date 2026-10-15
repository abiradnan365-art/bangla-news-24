import Image from "next/image";

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
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Failed to load news
        </h1>
      </main>
    );
  }

  const data = await res.json();
 console.log(data);
  const newsDetails: NewsDetails | undefined = data?.data;

  if (!newsDetails) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          News not found
        </h1>
      </main>
    );
  }

  return (
    <main className="bg-base-200 min-h-screen py-10">
      <article className="max-w-4xl mx-auto bg-base-100 rounded-2xl shadow-sm overflow-hidden">

        {/* Header */}
        <div className="p-6 md:p-10">

          {/* Category */}
          {newsDetails.topics && newsDetails.topics.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
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
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
            {newsDetails.title || "Untitled News"}
          </h1>

          {/* Author + Date */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-base-content/60 mb-8">

            <span>
              ✍️ {newsDetails.byline?.[0]?.name || "Unknown Author"}
            </span>

            {newsDetails.firstPublished && (
              <span>
                📅{" "}
                {new Date(
                  newsDetails.firstPublished
                ).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}

          </div>

          {/* Main Image */}
          {newsDetails.imageUrl && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-8">
              <Image
                src={newsDetails.imageUrl}
                alt={newsDetails.title || "News image"}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Description */}
          {newsDetails.description?.blocks &&
            newsDetails.description.blocks.length > 0 && (
              <div className="text-lg md:text-xl font-medium leading-8 mb-10">

                {newsDetails.description.blocks.map(
                  (block, index) => {
                    const text =
                      block.model?.blocks?.[0]?.model?.text;

                    if (!text) return null;

                    return (
                      <p key={index} className="mb-4">
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

                  {/* Text */}
                  if (item.type === "text") {
                    return (
                      <p
                        key={index}
                        className="text-lg leading-9 text-base-content/90 whitespace-pre-line"
                      >
                        {item.text}
                      </p>
                    );
                  }

                  {/* Subheading */}
                  if (item.type === "subheading") {
                    return (
                      <h2
                        key={index}
                        className="text-2xl md:text-3xl font-bold mt-10 mb-4"
                      >
                        {item.text}
                      </h2>
                    );
                  }

                  {/* Image */}
                  if (item.type === "image") {
                    return (
                      <figure key={index} className="my-10">

                        <div className="relative w-full overflow-hidden rounded-xl">

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
                            className="w-full h-auto object-cover"
                          />

                        </div>

                        {item.caption && (
                          <figcaption className="text-sm text-base-content/60 mt-2">
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
              <div className="border-t mt-12 pt-6">

                <h3 className="font-semibold mb-3">
                  Tags
                </h3>

                <div className="flex flex-wrap gap-2">

                  {newsDetails.tags.map(
                    (tag, index) => (
                      <span
                        key={index}
                        className="badge badge-neutral"
                      >
                        #{tag}
                      </span>
                    )
                  )}

                </div>

              </div>
            )}

        </div>
      </article>
    </main>
  );
};

export default NewsDetails;

