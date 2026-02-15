import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BlogCard = ({
  post,
  showDate = true,
  className = "",
}) => {
  const {
    id,
    title,
    excerpt,
    featured_image_url,
    image_position,
    author: authorData,
    created_date,
    read_time,
  } = post;

  const author =
    typeof authorData === "string"
      ? authorData
      : authorData?.name || "Unknown Author";
  const safeTitle = String(title || "Untitled");
  const safeExcerpt = String(excerpt || "");

  return (
    <Link
      to={`/blog/${id}/`}
      className={`group cursor-pointer block ${className}`}
    >
      <article className="flex flex-col h-full">
        {/* Image Container */}
        <div className="aspect-[4/3] overflow-hidden mb-5">
          <img
            src={
              featured_image_url || "/assets/blog/placeholder-blog.jpg"
            }
            alt={safeTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ objectPosition: image_position || "center" }}
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1">
          <h3 className="font-stevens-display text-xl sm:text-2xl font-semibold text-white mb-3 leading-snug line-clamp-2 group-hover:text-stevens-red transition-colors duration-200">
            {safeTitle}
          </h3>

          {showDate && created_date && (
            <p className="text-white/70 font-stevens-condensed mb-2">
              {new Date(created_date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          )}

          {author ? (
            <p className="text-white/70 font-stevens-condensed mb-4">
              By {author}
            </p>
          ) : read_time ? (
            <p className="text-white/70 mb-4">
              {read_time} min read
            </p>
          ) : null}

          <p className="text-white/80 leading-relaxed line-clamp-3 mb-5">
            {safeExcerpt}
          </p>
        </div>

        {/* Read More Button */}
        <div className="mt-auto">
          <div className="w-full border-2 border-stevens-red text-stevens-red group-hover:bg-stevens-red group-hover:text-white font-medium py-stevens-md transition-all duration-300 flex items-center justify-center">
            Read More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogCard;
