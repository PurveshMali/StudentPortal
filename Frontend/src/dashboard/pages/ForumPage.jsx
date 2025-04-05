import React, { useState } from 'react';
import { Search, TrendingUp, Clock, User, Plus, ChevronDown } from 'lucide-react';

const ForumPage = () => {
  // Mock data
  const allPosts = [
    {
      id: "1",
      title: "How to implement a neural network from scratch?",
      excerpt: "I'm struggling with backpropagation in my neural network implementation. Can someone guide me through the math?",
      author: {
        name: "Sarah Chen",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
        points: 328,
      },
      tags: ["Machine Learning", "Neural Networks", "Mathematics"],
      upvotes: 24,
      replies: 7,
      timestamp: "2 hours ago",
    },
    {
      id: "2",
      title: "Best resources for learning advanced algorithms?",
      excerpt: "I've completed the basic algorithms course and want to dive deeper. What books or courses would you recommend?",
      author: {
        name: "Michael Wright",
        avatar: "/placeholder.svg",
        points: 156,
      },
      tags: ["Algorithms", "Computer Science", "Books"],
      upvotes: 18,
      replies: 12,
      timestamp: "6 hours ago",
    },
    {
      id: "3",
      title: "React performance optimization techniques?",
      excerpt: "My React application is getting slow with large datasets. What are some effective ways to optimize performance?",
      author: {
        name: "Emily Johnson",
        avatar: "/placeholder.svg",
        points: 542,
      },
      tags: ["React", "JavaScript", "Performance"],
      upvotes: 42,
      replies: 15,
      timestamp: "1 day ago",
    },
    {
      id: "4",
      title: "How to design a scalable microservices architecture?",
      excerpt: "I'm working on a project that needs to scale efficiently. What patterns and practices should I follow?",
      author: {
        name: "David Kim",
        avatar: "/placeholder.svg",
        points: 723,
      },
      tags: ["Microservices", "System Design", "Architecture"],
      upvotes: 36,
      replies: 8,
      timestamp: "2 days ago",
    },
    {
      id: "5",
      title: "Implementing OAuth 2.0 in a Node.js application",
      excerpt: "I need help implementing secure authentication with OAuth 2.0 in my Express app. Any guidance would be appreciated.",
      author: {
        name: "Alex Turner",
        avatar: "/placeholder.svg",
        points: 412,
      },
      tags: ["Node.js", "Authentication", "OAuth"],
      upvotes: 29,
      replies: 11,
      timestamp: "3 days ago",
    },
  ];

  // Mock data for my posts
  const myPosts = [
    {
      id: "6",
      title: "Struggling with Tensorflow GPU setup",
      excerpt: "I'm having issues configuring Tensorflow to use my NVIDIA GPU. Has anyone else faced similar problems?",
      author: {
        name: "Current User",
        avatar: "/placeholder.svg",
        points: 275,
      },
      tags: ["Tensorflow", "GPU", "Deep Learning"],
      upvotes: 12,
      replies: 5,
      timestamp: "1 week ago",
    },
    {
      id: "7",
      title: "Database design for educational platform",
      excerpt: "Working on an educational platform and need advice on the database schema design. Particularly for handling course content and user progress.",
      author: {
        name: "Current User",
        avatar: "/placeholder.svg",
        points: 275,
      },
      tags: ["Database", "SQL", "System Design"],
      upvotes: 8,
      replies: 4,
      timestamp: "2 weeks ago",
    },
  ];

  // Popular tags
  const popularTags = [
    "JavaScript",
    "Python",
    "Machine Learning",
    "React",
    "Node.js",
    "Data Science",
    "Algorithms",
    "Web Development",
    "Mobile",
    "Cloud Computing",
  ];

  // State
  const [activeTab, setActiveTab] = useState('popular');
  const [searchQuery, setSearchQuery] = useState('');
  const [displayPosts, setDisplayPosts] = useState([...allPosts]);
  const [postsUpvotes, setPostsUpvotes] = useState(
    [...allPosts, ...myPosts].reduce((acc, post) => {
      acc[post.id] = post.upvotes;
      return acc;
    }, {})
  );
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRelevance, setSelectedRelevance] = useState('Most Relevant');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'popular') {
      setDisplayPosts([...allPosts].sort((a, b) => b.upvotes - a.upvotes));
    } else if (tab === 'recent') {
      // Assuming the posts are already sorted by recency
      setDisplayPosts([...allPosts]);
    } else if (tab === 'my-posts') {
      setDisplayPosts([...myPosts]);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      handleTabChange(activeTab);
      return;
    }
    
    const postsToSearch = activeTab === 'my-posts' ? myPosts : allPosts;
    const filtered = postsToSearch.filter(post => 
      post.title.toLowerCase().includes(query.toLowerCase()) || 
      post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    setDisplayPosts(filtered);
  };

  // Handle upvote
  const handleUpvote = (postId) => {
    setPostsUpvotes(prev => ({
      ...prev,
      [postId]: prev[postId] + 1
    }));
  };

  // Handle tag filter
  const handleTagFilter = (tag) => {
    const postsToFilter = activeTab === 'my-posts' ? myPosts : allPosts;
    const filtered = postsToFilter.filter(post => 
      post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    setDisplayPosts(filtered);
  };

  // New Question Modal
  const NewQuestionModal = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      // Mock adding a new question
      const newPost = {
        id: String(allPosts.length + myPosts.length + 1),
        title: title,
        excerpt: content,
        author: {
          name: "Current User",
          avatar: "/placeholder.svg",
          points: 275,
        },
        tags: tags.split(',').map(tag => tag.trim()),
        upvotes: 0,
        replies: 0,
        timestamp: "Just now",
      };
      
      // Update state
      setPostsUpvotes(prev => ({
        ...prev,
        [newPost.id]: 0
      }));
      
      // Add to my posts
      myPosts.unshift(newPost);
      
      // If currently on my posts tab, update display
      if (activeTab === 'my-posts') {
        setDisplayPosts([...myPosts]);
      }
      
      // Close modal
      setShowNewQuestionModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Ask a New Question</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Question Details</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded h-32" 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded" 
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="e.g. React, JavaScript, Performance"
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <button 
                type="button"
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setShowNewQuestionModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">Community Forum</h1>
          <p className="text-gray-600">Ask questions, share knowledge, and get help from the community.</p>
        </div>
        <button 
          className="bg-blue-600 text-white rounded-md px-4 py-2 flex items-center"
          onClick={() => setShowNewQuestionModal(true)}
        >
          <Plus size={20} className="mr-2" />
          New Question
        </button>
      </div>

      {/* Main Content */}
      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column (Posts) */}
        <div className="w-full lg:w-3/4">
          {/* Search */}
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'popular' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => handleTabChange('popular')}
            >
              <TrendingUp size={18} className="mr-2" />
              Popular
            </button>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'recent' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => handleTabChange('recent')}
            >
              <Clock size={18} className="mr-2" />
              Recent
            </button>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === 'my-posts' ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'text-gray-600'}`}
              onClick={() => handleTabChange('my-posts')}
            >
              <User size={18} className="mr-2" />
              My Posts
            </button>
          </div>

          {/* Posts */}
          <div className="space-y-6">
            {displayPosts.map((post) => (
              <div key={post.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full overflow-hidden mr-3">
                    <img 
                      src={post.author.avatar} 
                      alt={post.author.name} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{post.author.name}</h3>
                    <div className="flex items-center">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded">
                        {post.author.points} pts
                      </span>
                      <span className="text-gray-500 text-sm ml-3">{post.timestamp}</span>
                    </div>
                  </div>
                </div>
                
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.excerpt}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm cursor-pointer hover:bg-gray-200"
                      onClick={() => handleTagFilter(tag)}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-gray-600">
                  <button 
                    className="flex items-center mr-6 hover:text-blue-600"
                    onClick={() => handleUpvote(post.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{postsUpvotes[post.id]} upvotes</span>
                  </button>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.897.4-1.75.708-2.917.708-1.1 0-2-.9-2-1.5 0-.2.5-1.6 1.7-3.2C2.266 10.842 2 9.444 2 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <span>{post.replies} replies</span>
                  </div>
                </div>
              </div>
            ))}

            {displayPosts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No posts match your criteria</p>
                <button 
                  className="text-blue-600 mt-2 hover:underline"
                  onClick={() => {
                    setSearchQuery('');
                    handleTabChange(activeTab);
                  }}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column (Filters and Tags) */}
        <div className="w-full lg:w-1/4">
          {/* Filters */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Filter By</h2>
            
            <div className="space-y-4">
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white pr-8 relative"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Programming</option>
                  <option>Data Science</option>
                  <option>Web Development</option>
                  <option>Machine Learning</option>
                  <option>DevOps</option>
                </select>
                <div className="absolute right-10 pointer-events-none flex items-center px-2">
                  <ChevronDown size={18} className="text-gray-500" />
                </div>
              </div>
              
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                  value={selectedRelevance}
                  onChange={(e) => setSelectedRelevance(e.target.value)}
                >
                  <option>Most Relevant</option>
                  <option>Most Upvoted</option>
                  <option>Most Viewed</option>
                  <option>Most Recent</option>
                </select>
              </div>
              
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded appearance-none bg-white"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Popular Tags */}
          <div>
            <h2 className="text-lg font-bold mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <span 
                  key={index} 
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSearchQuery(tag);
                    handleSearch({ target: { value: tag } });
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          {/* Forum Guidelines */}
          <div className="mt-8 bg-purple-50 p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-3">Forum Guidelines</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Be respectful and inclusive</li>
              <li>Write clear, specific questions</li>
              <li>Search before posting duplicates</li>
              <li>Format code properly</li>
              <li>Accept helpful answers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* New Question Modal */}
      {showNewQuestionModal && <NewQuestionModal />}
    </div>
  );
};

export default ForumPage;