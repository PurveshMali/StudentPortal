import React, { useState, useRef } from 'react';
import { Search, TrendingUp, Clock, User, Plus, ChevronDown, X, Send } from 'lucide-react';

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
      comments: [
        {
          id: "c1",
          author: "Alex Wilson",
          avatar: "/placeholder.svg",
          content: "For backpropagation, think of it as applying the chain rule repeatedly. The key is to calculate partial derivatives with respect to each weight.",
          timestamp: "1 hour ago"
        },
        {
          id: "c2",
          author: "Maria Garcia",
          avatar: "/placeholder.svg",
          content: "I recommend looking into computational graphs. They make understanding the flow of gradients much clearer.",
          timestamp: "45 minutes ago"
        },
        {
          id: "c3",
          author: "Raj Patel",
          avatar: "/placeholder.svg",
          content: "Have you checked out Andrew Ng's deep learning course? The math explanations there are excellent.",
          timestamp: "20 minutes ago"
        }
      ]
    },
    {
      id: "2",
      title: "Best resources for learning advanced algorithms?",
      excerpt: "I've completed the basic algorithms course and want to dive deeper. What books or courses would you recommend?",
      author: {
        name: "Michael Wright",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
        points: 156,
      },
      tags: ["Algorithms", "Computer Science", "Books"],
      upvotes: 18,
      replies: 12,
      timestamp: "6 hours ago",
      comments: [
        {
          id: "c4",
          author: "Jennifer Lee",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
          content: "Introduction to Algorithms by CLRS is the gold standard. Challenging but worth it.",
          timestamp: "5 hours ago"
        },
        {
          id: "c5",
          author: "Thomas Johnson",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
          content: "I'd also recommend Algorithm Design Manual by Skiena. More practical than CLRS.",
          timestamp: "4 hours ago"
        }
      ]
    },
    {
      id: "3",
      title: "React performance optimization techniques?",
      excerpt: "My React application is getting slow with large datasets. What are some effective ways to optimize performance?",
      author: {
        name: "Emily Johnson",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
        points: 542,
      },
      tags: ["React", "JavaScript", "Performance"],
      upvotes: 42,
      replies: 15,
      timestamp: "1 day ago",
      comments: [
        {
          id: "c6",
          author: "David Chen",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
          content: "React.memo and useMemo can prevent unnecessary re-renders. Also look into virtualization for large lists.",
          timestamp: "20 hours ago"
        }
      ]
    },
    {
      id: "4",
      title: "How to design a scalable microservices architecture?",
      excerpt: "I'm working on a project that needs to scale efficiently. What patterns and practices should I follow?",
      author: {
        name: "David Kim",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
        points: 723,
      },
      tags: ["Microservices", "System Design", "Architecture"],
      upvotes: 36,
      replies: 8,
      timestamp: "2 days ago",
      comments: [
        {
          id: "c7",
          author: "Sophia Martinez",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
          content: "Domain-driven design is crucial for defining service boundaries properly.",
          timestamp: "1 day ago"
        }
      ]
    },
    {
      id: "5",
      title: "Implementing OAuth 2.0 in a Node.js application",
      excerpt: "I need help implementing secure authentication with OAuth 2.0 in my Express app. Any guidance would be appreciated.",
      author: {
        name: "Alex Turner",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
        points: 412,
      },
      tags: ["Node.js", "Authentication", "OAuth"],
      upvotes: 29,
      replies: 11,
      timestamp: "3 days ago",
      comments: [
        {
          id: "c8",
          author: "James Wilson",
          avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ9CtNtthbAXC6HWPmyTdVGT4jYugq0SspnN8VR54yYoVTyQ7L3Jnjb9tPP6dTtk9i99M&usqp=CAU",
          content: "I recommend the passport-oauth2 package. Made implementation much simpler in my projects.",
          timestamp: "2 days ago"
        }
      ]
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
      comments: [
        {
          id: "c9",
          author: "Elena Rodriguez",
          avatar: "/placeholder.svg",
          content: "Check CUDA and cuDNN versions. They need to match the TensorFlow version you're using.",
          timestamp: "6 days ago"
        }
      ]
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
      comments: [
        {
          id: "c10",
          author: "Kenji Tanaka",
          avatar: "/placeholder.svg",
          content: "Consider using a document DB for course content and SQL for user progress tracking.",
          timestamp: "10 days ago"
        }
      ]
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
  const [upvotedPosts, setUpvotedPosts] = useState({}); // Track which posts the user has upvoted
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedRelevance, setSelectedRelevance] = useState('Most Relevant');
  const [selectedTime, setSelectedTime] = useState('All Time');
  const [showNewQuestionModal, setShowNewQuestionModal] = useState(false);
  const [activeCommentSection, setActiveCommentSection] = useState(null);
  const [commentText, setCommentText] = useState('');
  const commentInputRef = useRef(null);

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
    // Close any open comment section when changing tabs
    setActiveCommentSection(null);
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

  // Handle upvote - now checks if already upvoted
  const handleUpvote = (postId) => {
    if (upvotedPosts[postId]) {
      // User already upvoted this post
      return;
    }
    
    // Update upvote count
    setPostsUpvotes(prev => ({
      ...prev,
      [postId]: prev[postId] + 1
    }));
    
    // Mark post as upvoted by this user
    setUpvotedPosts(prev => ({
      ...prev,
      [postId]: true
    }));
    
    // Also update the upvote count in the original data arrays
    const updatePostsArray = (postsArray) => {
      return postsArray.map(post => {
        if (post.id === postId) {
          return { ...post, upvotes: post.upvotes + 1 };
        }
        return post;
      });
    };
    
    // Update the appropriate array
    if (activeTab === 'my-posts') {
      const updatedMyPosts = updatePostsArray(myPosts);
      // Update display if we're in my-posts tab
      if (activeTab === 'my-posts') {
        setDisplayPosts(updatedMyPosts);
      }
    } else {
      const updatedAllPosts = updatePostsArray(allPosts);
      // Update display if we're not in my-posts tab
      if (activeTab !== 'my-posts') {
        setDisplayPosts(updatedAllPosts);
      }
    }
  };

  // Toggle comment section
  const toggleCommentSection = (postId) => {
    if (activeCommentSection === postId) {
      setActiveCommentSection(null);
    } else {
      setActiveCommentSection(postId);
      setCommentText('');
      // Focus on comment input after a short delay to allow rendering
      setTimeout(() => {
        if (commentInputRef.current) {
          commentInputRef.current.focus();
        }
      }, 100);
    }
  };

  // Add new comment
  const addComment = (postId) => {
    if (!commentText.trim()) return;
    
    const newComment = {
      id: `c${Date.now()}`,
      author: "Current User",
      avatar: "/placeholder.svg",
      content: commentText,
      timestamp: "Just now"
    };
    
    // Find and update the post with the new comment
    const updatePostsArray = (postsArray) => {
      return postsArray.map(post => {
        if (post.id === postId) {
          const updatedComments = [...(post.comments || []), newComment];
          return { 
            ...post, 
            comments: updatedComments,
            replies: post.replies + 1
          };
        }
        return post;
      });
    };
    
    // Update in the appropriate array and the display
    if (activeTab === 'my-posts' || myPosts.some(post => post.id === postId)) {
      const updatedMyPosts = updatePostsArray(myPosts);
      // If this is one of the user's posts, update myPosts
      if (activeTab === 'my-posts') {
        setDisplayPosts(updatedMyPosts);
      }
    } else {
      const updatedAllPosts = updatePostsArray(allPosts);
      // If this is not one of the user's posts, update allPosts
      if (activeTab !== 'my-posts') {
        setDisplayPosts(updatedAllPosts);
      }
    }
    
    // Clear comment input
    setCommentText('');
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
      // Create new question
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
        comments: []
      };
      
      // Update upvotes tracking
      setPostsUpvotes(prev => ({
        ...prev,
        [newPost.id]: 0
      }));
      
      // Add to my posts
      myPosts.unshift(newPost);
      
      // If currently on my posts tab, update display
      if (activeTab === 'my-posts') {
        setDisplayPosts([...myPosts]);
      } else if (activeTab === 'recent') {
        // If on recent tab, add to top
        setDisplayPosts([newPost, ...displayPosts]);
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

  // Comment Section Component
  const CommentSection = ({ postId, comments }) => {
    return (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium mb-3">Comments</h3>
        
        {/* Comment list */}
        <div className="space-y-4 mb-4">
          {comments && comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.id} className="flex space-x-3 pb-3 border-b border-gray-100">
                <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
                  <img 
                    src={comment.avatar} 
                    alt={comment.author} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{comment.author}</span>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-700 mt-1">{comment.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No comments yet. Be the first to comment!</p>
          )}
        </div>
        
        {/* Add comment form */}
        <div className="flex space-x-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden">
            <img 
              src="/placeholder.svg" 
              alt="Current User" 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex-1 relative">
            <textarea
              ref={commentInputRef}
              className="w-full p-2 pl-3 pr-10 border border-gray-300 rounded-lg resize-none"
              placeholder="Add a comment..."
              rows="2"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <button 
              className="absolute right-2 bottom-2 text-blue-600 p-1 rounded-full hover:bg-blue-50"
              onClick={() => addComment(postId)}
              disabled={!commentText.trim()}
            >
              <Send size={18} />
            </button>
          </div>
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
                    className={`flex items-center mr-6 ${upvotedPosts[post.id] ? 'text-blue-600' : 'hover:text-blue-600'}`}
                    onClick={() => handleUpvote(post.id)}
                    disabled={upvotedPosts[post.id]}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{postsUpvotes[post.id]} upvotes</span>
                  </button>
                  <button 
                    className={`flex items-center ${activeCommentSection === post.id ? 'text-blue-600' : ''}`}
                    onClick={() => toggleCommentSection(post.id)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-1.008c-.897.4-1.75.708-2.917.708-1.1 0-2-.9-2-1.5 0-.2.5-1.6 1.7-3.2C2.266 10.842 2 9.444 2 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 9a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    </svg>
                    <span>{post.replies} replies</span>
                  </button>
                </div>
                
                {/* Comment Section */}
                {activeCommentSection === post.id && (
                  <CommentSection 
                    postId={post.id} 
                    comments={post.comments || []} 
                  />
                )}
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