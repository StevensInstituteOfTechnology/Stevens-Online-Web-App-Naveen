import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BlogDetail from "@/components/blog/BlogDetail";
import BlogList from "@/components/blog/BlogList";
import completeBlogData from "@/data/blogs.json";

// Single Post View Component
const SinglePost = ({ post }) => (
  <div className="bg-stevens-white py-stevens-3xl">
    <div className="max-w-7xl mx-auto px-stevens-md">
      <BlogDetail
        post={post}
        onBack={() => {
          if (typeof window !== "undefined") {
            window.history.back();
          }
        }}
        relatedPosts={[]}
      />
    </div>
  </div>
);

// Topic List View Component
const TopicList = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    "AI & Emerging Technology",
  );
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 9;
  const navigate = useNavigate();

  const categories = [
    "All",
    "AI & Emerging Technology",
    "Engineering Management",
    "Mastering Computer Science",
    "Online MBA Success",
    "Other Programs",
  ];

  const handleCategoryClick = (category) => {
    if (category === "All") {
      navigate("/blog/");
      return;
    }

    // Navigate to the appropriate topic page
    switch (category) {
      case "AI & Emerging Technology":
        navigate("/topics/ai-emerging-technology/");
        break;
      case "Engineering Management":
        navigate("/topics/engineering-essentials/");
        break;
      case "Mastering Computer Science":
        navigate("/topics/mastering-computer-science/");
        break;
      case "Online MBA Success":
        navigate("/topics/online-mba-success/");
        break;
      case "Other Programs":
        navigate("/topics/uncategorized/");
        break;
      default:
        setSelectedCategory(category);
    }
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Use setTimeout to ensure content updates before scrolling
    setTimeout(() => {
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="bg-stevens-black">
      {/* Hero Section */}
      <section className="bg-stevens-white py-stevens-3xl">
        <div className="max-w-7xl mx-auto px-stevens-md mt-stevens-lg">
          <div className="text-center">
            <h1 className="font-stevens-display text-stevens-hero text-stevens-black mb-stevens-lg">
              AI & Emerging Technology
            </h1>

            <div className="max-w-6xl mx-auto space-y-stevens-md text-left">
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                Artificial intelligence is reshaping how we build software,
                manage organizations, and solve complex problems. From agentic
                AI systems that can reason and self-correct, to the economic
                realities of deploying large language models at scale, this
                rapidly evolving field demands both technical depth and
                strategic insight.
              </p>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
                In our AI & Emerging Technology section, you will find expert
                perspectives on building reliable AI systems, architectural
                patterns for enterprise deployment, and the intersection of
                systems engineering with machine intelligence. Whether you are
                an engineering leader evaluating AI adoption, a developer
                building agentic applications, or a researcher exploring the
                frontiers of autonomous systems, these resources will help you
                navigate the future of intelligent technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-stevens-white py-12 border-b border-stevens-light-gray">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="flex flex-col items-center">
            <h1 className="font-stevens-display text-stevens-hero text-stevens-black mb-stevens-2xl">
              Categories:
            </h1>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-5 py-3 text-base font-medium border transition-all duration-stevens-normal ${
                    selectedCategory === category
                      ? "border-stevens-red text-stevens-red bg-stevens-red/10"
                      : "border-stevens-dark-gray/40 text-stevens-dark-gray hover:border-stevens-red hover:text-stevens-red"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-stevens-black py-stevens-3xl">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <BlogList
            posts={visiblePosts}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={false}
          />
        </div>
      </section>
      {/* Divider */}
      <div className="border-t border-white/20 mt-12 pt-12 bg-stevens-black"></div>
    </div>
  );
};

export default function AIEmergingTechnology() {
  const { slug } = useParams();

  // Initialize state with data immediately (for SSR)
  const getInitialState = () => {
    if (slug) {
      const foundPost = completeBlogData.posts.find((post) => post.id === slug);
      return {
        posts: [],
        singlePost: foundPost || null,
      };
    } else {
      const aiPosts = completeBlogData.posts.filter(
        (post) => post.category === "AI & Emerging Technology",
      );
      return {
        posts: aiPosts,
        singlePost: null,
      };
    }
  };

  const [posts, setPosts] = useState(() => getInitialState().posts);
  const [singlePost, setSinglePost] = useState(
    () => getInitialState().singlePost,
  );

  // Update state when slug changes (for client-side navigation)
  useEffect(() => {
    const newState = getInitialState();
    setPosts(newState.posts);
    setSinglePost(newState.singlePost);
  }, [slug]);

  if (singlePost) {
    return <SinglePost post={singlePost} />;
  }

  return <TopicList posts={posts} />;
}
