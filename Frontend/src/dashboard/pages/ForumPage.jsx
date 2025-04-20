import { Zap } from "lucide-react";
import React, { useState } from "react";

const ForumPage = () => {
  // Sample dummy data
  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "How to implement a neural network from scratch?",
      content:
        "I'm struggling with backpropagation in my neural network implementation. Can someone guide me through the math?",
      author: {
        name: "Sarah Chen",
        avatar: "https://i.pravatar.cc/150?img=32",
        points: 328,
      },
      tags: ["Machine Learning", "Neural Networks", "Mathematics"],
      upvotes: 25,
      replies: [
        {
          id: 1,
          content:
            "For backpropagation, think of it as applying the chain rule repeatedly. The key is to calculate partial derivatives with respect to each weight.",
          author: {
            name: "Alex Wilson",
            avatar: "https://i.pravatar.cc/150?img=53",
            points: 215,
          },
          timestamp: "1 hour ago",
          upvotes: 8,
        },
      ],
      timestamp: "2 hours ago",
      attachments: [],
    },
    {
      id: 2,
      title: "Best approach to teaching calculus to high school students?",
      content:
        "I'm a new teacher and wondering what methods work best for introducing calculus concepts to high school students who struggle with abstract thinking.",
      author: {
        name: "James Miller",
        avatar: "https://i.pravatar.cc/150?img=68",
        points: 156,
      },
      tags: ["Teaching", "Mathematics", "Education"],
      upvotes: 18,
      replies: [],
      timestamp: "8 hours ago",
      attachments: ["calculus_intro.pdf"],
    },
    {
      id: 3,
      title: "What are the benefits of using GraphQL over REST?",
      content:
        "I've been using REST APIs for years, but I keep hearing about GraphQL. Is it worth switching?",
      author: {
        name: "Mira Patel",
        avatar: "https://i.pravatar.cc/150?img=45",
        points: 202,
      },
      tags: ["Web Development", "API", "GraphQL"],
      upvotes: 30,
      replies: [
        {
          id: 1,
          content:
            "GraphQL gives more control to the client and reduces over-fetching. It’s great for complex UIs.",
          author: {
            name: "Nikhil Rao",
            avatar: "https://i.pravatar.cc/150?img=21",
            points: 180,
          },
          timestamp: "3 hours ago",
          upvotes: 10,
        },
      ],
      timestamp: "6 hours ago",
      attachments: [],
    },
    {
      id: 4,
      title: "Struggling with recursive functions in Python",
      content:
        "Can someone explain in simple terms how recursion works? I get confused when it calls itself.",
      author: {
        name: "Leo Martinez",
        avatar: "https://i.pravatar.cc/150?img=11",
        points: 78,
      },
      tags: ["Python", "Recursion", "Programming Basics"],
      upvotes: 12,
      replies: [],
      timestamp: "1 day ago",
      attachments: [],
    },
    {
      id: 5,
      title: "Figma prototype is not clickable—what am I missing?",
      content:
        "I’ve linked the frames in prototype mode but clicking doesn’t transition. Is there a trick to it?",
      author: {
        name: "Aisha Khan",
        avatar: "https://i.pravatar.cc/150?img=70",
        points: 134,
      },
      tags: ["UI/UX", "Figma", "Design Tools"],
      upvotes: 9,
      replies: [
        {
          id: 1,
          content:
            "Make sure you are in Prototype tab and set the interaction type. Also double-check flow starting points.",
          author: {
            name: "Rajiv Bansal",
            avatar: "https://i.pravatar.cc/150?img=59",
            points: 142,
          },
          timestamp: "5 hours ago",
          upvotes: 5,
        },
      ],
      timestamp: "15 hours ago",
      attachments: ["figma_prototype.png"],
    },
    {
      id: 6,
      title: "Tips for optimizing React app performance?",
      content:
        "My React app is lagging when rendering lists with 1000+ items. What can I do to improve performance?",
      author: {
        name: "Emily Zhao",
        avatar: "https://i.pravatar.cc/150?img=38",
        points: 290,
      },
      tags: ["React", "Performance", "Frontend"],
      upvotes: 22,
      replies: [],
      timestamp: "3 hours ago",
      attachments: [],
    },
    {
      id: 7,
      title: "Resources for learning Data Structures in C++?",
      content:
        "Can anyone recommend beginner-friendly tutorials or books for learning data structures in C++?",
      author: {
        name: "Mohit Sinha",
        avatar: "https://i.pravatar.cc/150?img=18",
        points: 110,
      },
      tags: ["C++", "Data Structures", "Learning"],
      upvotes: 16,
      replies: [
        {
          id: 1,
          content:
            "Try 'Data Structures and Algorithm Analysis in C++' by Mark Allen Weiss. It’s beginner-friendly.",
          author: {
            name: "Sneha Gupta",
            avatar: "https://i.pravatar.cc/150?img=29",
            points: 175,
          },
          timestamp: "7 hours ago",
          upvotes: 7,
        },
      ],
      timestamp: "12 hours ago",
      attachments: ["ds_book_suggestion.txt"],
    },
  ]);

  const [currentTab, setCurrentTab] = useState("popular");
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    tags: "",
  });
  const [showNewQuestionForm, setShowNewQuestionForm] = useState(false);
  const [currentUser] = useState({
    name: "Purvesh",
    avatar: "https://i.pravatar.cc/150?img=12",
    points: 120,
    role: "Learner",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSelectedSortBy] = useState("Most Relevant");
  const [timeFilter, setSelectedTimeFilter] = useState("All Time");
  const [newReply, setNewReply] = useState("");
  const [replyingToId, setReplyingToId] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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

  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();

    if (!newQuestion.title.trim() || !newQuestion.content.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const tagArray = newQuestion.tags.length
      ? newQuestion.tags.split(",").map((tag) => tag.trim())
      : [];

    const newQuestionObj = {
      id: questions.length + 1,
      title: newQuestion.title,
      content: newQuestion.content,
      author: currentUser,
      tags: tagArray,
      upvotes: 0,
      replies: [],
      timestamp: "Just now",
      attachments: uploadedFiles,
    };

    setQuestions([newQuestionObj, ...questions]);
    setNewQuestion({ title: "", content: "", tags: "" });
    setUploadedFiles([]);
    setShowNewQuestionForm(false);
  };

  const handleUpvote = (questionId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, upvotes: q.upvotes + 1 };
        }
        return q;
      })
    );
  };

  const handleReplyUpvote = (questionId, replyId) => {
    setQuestions(
      questions.map((q) => {
        if (q.id === questionId) {
          const updatedReplies = q.replies.map((r) => {
            if (r.id === replyId) {
              return { ...r, upvotes: r.upvotes + 1 };
            }
            return r;
          });
          return { ...q, replies: updatedReplies };
        }
        return q;
      })
    );
  };

  const handleReplySubmit = (questionId) => {
    if (!newReply.trim()) {
      alert("Reply cannot be empty");
      return;
    }

    const updatedQuestions = questions.map((q) => {
      if (q.id === questionId) {
        const newReplyObj = {
          id: q.replies.length + 1,
          content: newReply,
          author: currentUser,
          timestamp: "Just now",
          upvotes: 0,
        };
        return { ...q, replies: [...q.replies, newReplyObj] };
      }
      return q;
    });

    setQuestions(updatedQuestions);
    setNewReply("");
    setReplyingToId(null);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files.map((file) => file.name)]);
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All Categories" ||
      q.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  // Sort questions based on selected criteria
  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    if (sortBy === "Most Relevant") {
      return b.upvotes - a.upvotes;
    }
    return 0;
  });

  const displayQuestions =
    currentTab === "popular"
      ? sortedQuestions
      : currentTab === "recent"
      ? [...sortedQuestions].sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        )
      : sortedQuestions.filter((q) => q.author.name === currentUser.name);

  return (
    <div className="bg-[#0F0F0F] p-6">
      {/* Forum Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Community Forum</h1>
          <p className="text-gray-400">
            Ask questions, share knowledge, and get help from the community.
          </p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowNewQuestionForm(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Question
          </button>
          <label className="flex items-center px-4 py-2 bg-[#141414] text-gray-300 rounded-md hover:bg-[#1d1d1d] cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Upload Material
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              multiple
            />
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-[#1d1d1d] rounded-md pl-10 bg-[#141414] text-white"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500 absolute left-3 top-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* New Question Form */}
      {showNewQuestionForm && (
        <div className="bg-[#141414] p-6 rounded-lg shadow-md mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Ask a Question</h2>
            <button
              onClick={() => setShowNewQuestionForm(false)}
              className="text-gray-400 hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form onSubmit={handleQuestionSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Title</label>
              <input
                type="text"
                value={newQuestion.title}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, title: e.target.value })
                }
                placeholder="What's your question? Be specific."
                className="w-full px-4 py-2 border border-[#1d1d1d] rounded-md bg-[#1d1d1d] text-white"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Details</label>
              <textarea
                value={newQuestion.content}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, content: e.target.value })
                }
                placeholder="Provide more details about your question..."
                className="w-full px-4 py-2 border border-[#1d1d1d] rounded-md h-32 bg-[#1d1d1d] text-white"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={newQuestion.tags}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, tags: e.target.value })
                }
                placeholder="e.g., Machine Learning, Python, Mathematics"
                className="w-full px-4 py-2 border border-[#1d1d1d] rounded-md bg-[#1d1d1d] text-white"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Attachments</label>
              <div className="flex items-center">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                  multiple
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer px-4 py-2 bg-[#1d1d1d] text-gray-300 rounded-md hover:bg-gray-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 inline mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  Attach files
                </label>
              </div>
              {uploadedFiles.length > 0 && (
                <div className="mt-2">
                  <p className="text-sm text-gray-400">Uploaded files:</p>
                  <ul className="text-sm text-blue-400">
                    {uploadedFiles.map((file, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {file}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowNewQuestionForm(false)}
                className="px-4 py-2 text-gray-400 mr-2 hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Post Question
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Section */}
      <div className="flex justify-between mb-6">
        {/* Tabs */}
        <div className="flex border-b border-[#1d1d1d]">
          <button
            onClick={() => handleTabChange("popular")}
            className={`flex items-center px-4 py-2 mr-4 ${
              currentTab === "popular"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            Popular
          </button>
          <button
            onClick={() => handleTabChange("recent")}
            className={`flex items-center px-4 py-2 mr-4 ${
              currentTab === "recent"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Recent
          </button>
          <button
            onClick={() => handleTabChange("myPosts")}
            className={`flex items-center px-4 py-2 ${
              currentTab === "myPosts"
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            My Posts
          </button>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Filter By
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-[#1d1d1d] rounded-md px-3 py-1 bg-[#141414] text-white"
            >
              <option>All Categories</option>
              {popularTags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSelectedSortBy(e.target.value)}
              className="border border-[#1d1d1d] rounded-md px-3 py-1 bg-[#141414] text-white"
            >
              <option>Most Relevant</option>
              <option>Most Recent</option>
              <option>Most Upvoted</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Time
            </label>
            <select
              value={timeFilter}
              onChange={(e) => setSelectedTimeFilter(e.target.value)}
              className="border border-[#1d1d1d] rounded-md px-3 py-1 bg-[#141414] text-white"
            >
              <option>All Time</option>
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Popular Tags */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2 text-white">Popular Tags</h3>
        <div className="flex flex-wrap">
          {popularTags.map((tag) => (
            <span
              key={tag}
              className="bg-[#141414] text-gray-300 rounded-full px-3 py-1 text-sm mr-2 mb-2 cursor-pointer hover:bg-[#1d1d1d]"
              onClick={() => setSelectedCategory(tag)}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {displayQuestions.length === 0 ? (
          <div className="bg-[#141414] p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-400 text-lg">
              No questions found matching your criteria.
            </p>
            <button
              onClick={() => setShowNewQuestionForm(true)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Ask a Question
            </button>
          </div>
        ) : (
          displayQuestions.map((question) => (
            <div
              key={question.id}
              className="bg-[#141414] p-6 rounded-lg shadow-md"
            >
              <div className="flex items-start mb-4">
                <img
                  src={question.author.avatar}
                  alt={question.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h3 className="font-semibold text-white">
                    {question.author.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400 mb-1">
                    <Zap color="orange" size={15} />
                    <p className="text-sm font-semibold text-[orange] ml-1">
                      {question.author.points} pts
                    </p>
                  </div>
                </div>
                <span className="text-sm text-gray-400 ml-auto">
                  {question.timestamp}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-2 text-white">
                {question.title}
              </h2>
              <p className="text-gray-300 mb-4">{question.content}</p>

              {question.attachments.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold mb-1 text-gray-300">
                    Attachments:
                  </p>
                  <div className="flex flex-wrap">
                    {question.attachments.map((attachment, idx) => (
                      <div
                        key={idx}
                        className="flex items-center bg-[#1d1d1d] rounded-md px-3 py-1 mr-2 mb-2 text-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {attachment}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap mb-4">
                {question.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-[#1d1d1d] text-gray-300 rounded-md px-2 py-1 text-sm mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center mb-6 text-gray-400">
                <button
                  onClick={() => handleUpvote(question.id)}
                  className="flex items-center mr-4 hover:text-blue-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  {question.upvotes} upvotes
                </button>
                <div className="flex items-center mr-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  {question.replies.length} replies
                </div>
                <button
                  onClick={() =>
                    setReplyingToId(
                      replyingToId === question.id ? null : question.id
                    )
                  }
                  className="text-blue-400 hover:text-blue-300"
                >
                  Reply
                </button>
              </div>

              {/* Replies */}
              {question.replies.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2 text-white">Comments</h3>
                  <div className="space-y-4">
                    {question.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="bg-[#1d1d1d] p-4 rounded-md"
                      >
                        <div className="flex items-start mb-2">
                          <img
                            src={reply.author.avatar}
                            alt={reply.author.name}
                            className="w-8 h-8 rounded-full mr-2"
                          />
                          <div>
                            <h4 className="font-semibold text-white">
                              {reply.author.name}
                            </h4>
                            <p className="text-xs text-gray-400">
                              {reply.timestamp}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-300 mb-2">{reply.content}</p>

                        <button
                          onClick={() =>
                            handleReplyUpvote(question.id, reply.id)
                          }
                          className="flex items-center text-sm text-gray-400 hover:text-blue-400"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 15l7-7 7 7"
                            />
                          </svg>
                          {reply.upvotes} upvotes
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reply Form */}
              {replyingToId === question.id && (
                <div className="bg-[#1d1d1d] p-4 rounded-md">
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    placeholder="Write your reply..."
                    className="w-full px-3 py-2 border border-gray-600 rounded-md mb-2 bg-[#141414] text-white"
                    rows="3"
                  ></textarea>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="file"
                        id={`reply-attachment-${question.id}`}
                        className="hidden"
                        multiple
                        onChange={handleFileUpload}
                      />
                      <label
                        htmlFor={`reply-attachment-${question.id}`}
                        className="flex items-center text-gray-400 cursor-pointer hover:text-gray-300"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                        Attach
                      </label>
                    </div>

                    <div>
                      <button
                        onClick={() => setReplyingToId(null)}
                        className="px-3 py-1 text-gray-400 mr-2 hover:text-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleReplySubmit(question.id)}
                        className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ForumPage;
