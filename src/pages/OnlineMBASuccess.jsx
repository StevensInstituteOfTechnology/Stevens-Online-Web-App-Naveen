import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createPageUrl } from '@/utils';
import { format } from 'date-fns';
import { ArrowRight, User, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import BlogDetail from '@/components/blog/BlogDetail';
import BlogList from '@/components/blog/BlogList';
import completeBlogData from '@/data/blogs.json';

// Single Post View Component
const SinglePost = ({ post }) => (
  <div className="bg-stevens-white py-stevens-3xl">
    <div className="max-w-7xl mx-auto px-stevens-md">
      <BlogDetail 
        post={post} 
        onBack={() => {
          if (typeof window !== 'undefined') {
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
  const [selectedCategory, setSelectedCategory] = useState('Online MBA Success');
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
      navigate('/blog/');
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
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="text-center">
            <h1 className="font-stevens-display text-stevens-hero text-stevens-red mb-stevens-lg">
              Strategies for MBA Success
            </h1>
            
            <div className="max-w-6xl mx-auto space-y-stevens-md text-left">
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
              Pursuing an Online MBA is a significant investment in your education and career. However, balancing work, family and online coursework can be challenging. Our Online MBA Success page provides valuable resources for students looking for strategies for flourishing in this program.
              </p>
              <p className="text-stevens-lg text-stevens-dark-gray leading-relaxed">
              In this section, you will find many tips, tools and techniques for succeeding in your Online MBA program. Our articles cover everything from study tips and time management strategies to career development and networking advice. Whether you are just starting your studies or are nearing graduation, our Online MBA Success category has something for everyone. We are committed to providing the resources you need to unlock your full potential and achieve your academic and professional goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-stevens-white py-stevens-xl">
        <div className="max-w-7xl mx-auto px-stevens-md">
          <div className="flex flex-col items-center">
            <h2 className="font-stevens-display text-stevens-2xl text-stevens-red mb-stevens-lg">
              Categories:
            </h2>
            <div className="flex flex-wrap justify-center gap-stevens-sm">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-stevens-md py-stevens-sm text-stevens-sm font-medium border border-stevens-light-gray bg-stevens-white text-stevens-dark-gray hover:border-stevens-red hover:text-stevens-red transition-all duration-stevens-normal ${
                    selectedCategory === category
                      ? 'border-stevens-red text-stevens-red bg-stevens-light-gray'
                      : 'hover:bg-stevens-light-gray'
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

export default function OnlineMBASuccess() {
  const location = useLocation();
  const { slug } = useParams();

  // Initialize state with data immediately (for SSR)
  const getInitialState = () => {
    if (slug) {
      const foundPost = completeBlogData.posts.find(post => post.id === slug);
      return {
        posts: [],
        singlePost: foundPost || null
      };
    } else {
      const mbaPosts = completeBlogData.posts.filter(post => 
        post.category === 'Online MBA Success'
      );
      return {
        posts: mbaPosts,
        singlePost: null
      };
    }
  };
  
  const [posts, setPosts] = useState(() => getInitialState().posts);
  const [singlePost, setSinglePost] = useState(() => getInitialState().singlePost);

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
