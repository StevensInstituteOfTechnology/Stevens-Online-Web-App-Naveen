
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { createPageUrl, buildCanonicalUrl, setJsonLd, setPageTitle, setMetaDescription, setOpenGraphTags } from '@/utils';
import BlogList from '@/components/blog/BlogList';
import BlogDetail from '@/components/blog/BlogDetail';
import BlogErrorBoundary from '@/components/blog/BlogErrorBoundary';
import completeBlogData from '@/data/blogs.json';

// Single Post View Component
const SinglePost = ({ post, onBack }) => (
  <div className="bg-stevens-white py-stevens-3xl">
    <div className="max-w-7xl mx-auto px-stevens-md">
      <BlogDetail 
        post={post} 
        onBack={onBack}
        relatedPosts={[]} // Will be populated with actual related posts
      />
    </div>
  </div>
);

// Blog Page Content Component
const BlogPageContent = ({ posts }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  
  const categories = [
    'All',
    'Engineering Management', 
    'Mastering Computer Science',
    'Online MBA Success',
    'Other Programs'
  ];

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setSelectedCategory('All');
      return;
    }
    
    // Navigate to the appropriate topic page
    switch (category) {
      case 'Engineering Management':
        navigate('/topics/engineering-essentials/');
        break;
      case 'Mastering Computer Science':
        navigate('/topics/mastering-computer-science/');
        break;
      case 'Online MBA Success':
        navigate('/topics/online-mba-success/');
        break;
      case 'Other Programs':
        navigate('/topics/uncategorized/');
        break;
      default:
        setSelectedCategory(category);
    }
  };

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const visiblePosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Use setTimeout to ensure content updates before scrolling
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-stevens-white py-stevens-3xl">
      <div className="max-w-7xl mx-auto px-stevens-md mt-stevens-lg">
          <div className="text-center">
            <h1 className="font-stevens-display text-stevens-hero text-stevens-primary mb-stevens-lg">
              Stevens Online Blog: Insights, Inspiration and Information
            </h1>
            
            <div className="max-w-6xl mx-auto space-y-stevens-md text-left">
              <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed">
                Stevens Online education blogs are excellent resources for current and prospective students and professionals looking to stay up-to-date on the latest industry developments supported by our programs.
              </p>
              <p className="text-stevens-lg text-stevens-gray-700 leading-relaxed">
                Through our blog, you can access in-depth articles, interviews and other resources that provide valuable insights into the skills and knowledge needed to succeed in today's rapidly-changing business, technology and engineering landscapes. Whether you are considering enrolling in one of our programs, want to explore a new career path or deepen your knowledge in your current field, the Stevens online blog is an excellent source of information and inspiration for you to take advantage of.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-stevens-white py-stevens-xl">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="flex flex-col items-center">
            <h2 className="font-stevens-display text-stevens-2xl text-stevens-primary mb-stevens-lg">
              Categories:
            </h2>
            <div className="flex flex-wrap justify-center gap-stevens-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-stevens-md py-stevens-sm text-stevens-sm font-medium border border-stevens-gray-300 bg-stevens-white text-stevens-gray-700 hover:border-stevens-primary hover:text-stevens-primary transition-all duration-stevens-normal ${
                    selectedCategory === category
                      ? 'border-stevens-primary text-stevens-primary bg-stevens-primary/5'
                      : 'hover:bg-stevens-gray-50'
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
      <section className="bg-stevens-white py-stevens-3xl">
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
    </div>
  );
};

export default function Blog() {
  const location = useLocation();
  const navigate = useNavigate();
  const { slug } = useParams();
  
  // Compute initial state synchronously for SSR
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  
  // Initialize state with data immediately (for SSR)
  const getInitialState = () => {
    if (slug) {
      const foundPost = completeBlogData.posts.find(post => post.id === slug);
      return {
        posts: [],
        singlePost: foundPost || null
      };
    } else {
      const filteredPosts = category 
        ? completeBlogData.posts.filter(post => post.category === category)
        : completeBlogData.posts;
      return {
        posts: filteredPosts,
        singlePost: null
      };
    }
  };
  
  const [posts, setPosts] = useState(() => getInitialState().posts);
  const [singlePost, setSinglePost] = useState(() => getInitialState().singlePost);

  // Update state when slug or category changes (for client-side navigation)
  useEffect(() => {
    const newState = getInitialState();
    setPosts(newState.posts);
    setSinglePost(newState.singlePost);
  }, [slug, category]);

 // Handle SEO metadata injection (client-side only)
  useEffect(() => {
    if (singlePost) {
      const canonical = buildCanonicalUrl(`/blog/${singlePost.id}/`);
      
      // Set page title
      setPageTitle(`${singlePost.title} | Stevens Online`);
      
      // Set meta description
      const description = singlePost.excerpt || singlePost.subtitle || `Read about ${singlePost.title} on Stevens Online blog.`;
      setMetaDescription(description);
      
      // Set Open Graph tags
      setOpenGraphTags({
        title: singlePost.title,
        description: description,
        image: singlePost.featured_image_url ? buildCanonicalUrl(singlePost.featured_image_url) : buildCanonicalUrl('/assets/logos/stevens-crest.png'),
        url: canonical,
        type: 'article'
      });
      
      // Set JSON-LD structured data


      const jsonld = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": singlePost.title,
        "description": description,
        "image": singlePost.featured_image_url ? buildCanonicalUrl(singlePost.featured_image_url) : undefined,
        "datePublished": singlePost.created_date,
        "dateModified": singlePost.updated_date || singlePost.created_date,
        "author": singlePost.author ? { "@type": "Person", "name": singlePost.author } : undefined,
        "publisher": {
          "@type": "Organization",
          "name": "Stevens Institute of Technology",
          "logo": { "@type": "ImageObject", "url": buildCanonicalUrl('/assets/logos/stevens-crest.png') }
        },
        "mainEntityOfPage": canonical,
        "url": canonical
      };
      setJsonLd('jsonld-blog-post', jsonld);
    } else if (posts.length > 0) {

      // Blog index page
      setPageTitle('Stevens Online Blog | Graduate Education Insights');
      setMetaDescription('Stay informed with insights, tips, and news about online education, career advancement, and technology trends from Stevens Institute of Technology.');
      
      setOpenGraphTags({
        title: 'Stevens Online Blog',
        description: 'Stay informed with insights, tips, and news about online education, career advancement, and technology trends.',
        url: buildCanonicalUrl('/blog/'),
        type: 'website'
      });

      const jsonldIndex = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Stevens Online Blog",
        "url": buildCanonicalUrl('/blog/'),
        "isPartOf": {
          "@type": "Organization",
          "name": "Stevens Institute of Technology"
        }
      };
      setJsonLd('jsonld-blog-index', jsonldIndex);
    }
  }, [singlePost, posts]);

  const handleBack = () => {
    navigate('/blog/');
  };

  return (
    <BlogErrorBoundary>
      {singlePost ? <SinglePost post={singlePost} onBack={handleBack} /> : <BlogPageContent posts={posts} />}
    </BlogErrorBoundary>
  );
}
