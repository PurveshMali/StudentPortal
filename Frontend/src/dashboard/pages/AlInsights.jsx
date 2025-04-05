"use client"

import { useState } from "react"
import { Heart, Search, BookOpen, Users, MessageSquare, Briefcase, ExternalLink } from "lucide-react"
import { motion } from "framer-motion"

const AllInsights = () => {
  const [activeTab, setActiveTab] = useState("courses")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample data for each category
  const savedData = {
    courses: [
      {
        id: 1,
        title: "Introduction to React",
        author: "Jane Smith",
        duration: "8 hours",
        level: "Beginner",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 2,
        title: "Advanced JavaScript Patterns",
        author: "John Doe",
        duration: "12 hours",
        level: "Advanced",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        author: "Sarah Johnson",
        duration: "6 hours",
        level: "Intermediate",
        thumbnail: "/placeholder.svg?height=200&width=300",
      },
    ],
    tutors: [
      {
        id: 1,
        name: "Dr. Michael Brown",
        session: "Data Science Mentoring",
        datetime: "2023-06-15 14:00",
        domain: "Data Science",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      {
        id: 2,
        name: "Prof. Lisa Chen",
        session: "Web Development Workshop",
        datetime: "2023-06-18 10:00",
        domain: "Web Dev",
        avatar: "/placeholder.svg?height=100&width=100",
      },
    ],
    forumPosts: [
      {
        id: 1,
        title: "How to optimize React performance?",
        tags: ["React", "Performance"],
        preview: "I've been working on a large React application and noticed some performance issues...",
        upvotes: 24,
        comments: 8,
      },
      {
        id: 2,
        title: "Best resources for learning machine learning",
        tags: ["ML", "Resources"],
        preview: "I'm looking for comprehensive resources to learn machine learning from scratch...",
        upvotes: 32,
        comments: 15,
      },
    ],
    ngoInitiatives: [
      {
        id: 1,
        name: "Code for Good",
        logo: "/placeholder.svg?height=80&width=80",
        tags: ["Education", "Technology"],
        description: "Teaching coding skills to underprivileged communities",
      },
      {
        id: 2,
        name: "Digital Literacy Foundation",
        logo: "/placeholder.svg?height=80&width=80",
        tags: ["Digital Skills", "Education"],
        description: "Promoting digital literacy in rural areas",
      },
    ],
  }

  // Filter data based on search query
  const filteredData = searchQuery
    ? savedData[activeTab].filter((item) => JSON.stringify(item).toLowerCase().includes(searchQuery.toLowerCase()))
    : savedData[activeTab]

  const handleRemoveItem = (id) => {
    // In a real application, this would remove the item from saved items
    console.log(`Removing item with id: ${id}`)
  }

  const renderTabContent = () => {
    if (filteredData.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 mb-6 text-gray-300">
            <BookOpen className="w-full h-full" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No saved items yet</h3>
          <p className="text-gray-500 max-w-md">Start exploring and save the ones you love!</p>
        </div>
      )
    }

    switch (activeTab) {
      case "courses":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((course) => (
              <CourseCard key={course.id} course={course} onRemove={handleRemoveItem} />
            ))}
          </div>
        )
      case "tutors":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} onRemove={handleRemoveItem} />
            ))}
          </div>
        )
      case "forumPosts":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredData.map((post) => (
              <ForumPostCard key={post.id} post={post} onRemove={handleRemoveItem} />
            ))}
          </div>
        )
      case "ngoInitiatives":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((ngo) => (
              <NGOCard key={ngo.id} ngo={ngo} onRemove={handleRemoveItem} />
            ))}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Saved Items</h1>
        <p className="text-gray-500">All your saved content in one place.</p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          <TabButton
            active={activeTab === "courses"}
            onClick={() => setActiveTab("courses")}
            icon={<BookOpen size={16} />}
            label="Courses"
          />
          <TabButton
            active={activeTab === "tutors"}
            onClick={() => setActiveTab("tutors")}
            icon={<Users size={16} />}
            label="Tutors"
          />
          <TabButton
            active={activeTab === "forumPosts"}
            onClick={() => setActiveTab("forumPosts")}
            icon={<MessageSquare size={16} />}
            label="Forum Posts"
          />
          <TabButton
            active={activeTab === "ngoInitiatives"}
            onClick={() => setActiveTab("ngoInitiatives")}
            icon={<Briefcase size={16} />}
            label="NGO Initiatives"
          />
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search saved content..."
            className="pl-10 pr-4 py-2 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Content */}
      {renderTabContent()}
    </div>
  )
}

// Tab Button Component
const TabButton = ({ active, onClick, icon, label }) => (
  <button
    className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
      active ? "bg-white text-blue-600 shadow-sm" : "text-gray-600 hover:text-gray-900"
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
)

// Course Card Component
const CourseCard = ({ course, onRemove }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="relative">
      <img src={course.thumbnail || "/placeholder.svg"} alt={course.title} className="w-full h-40 object-cover" />
      <button
        onClick={() => onRemove(course.id)}
        className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100"
      >
        <Heart className="w-4 h-4 text-red-500 fill-current" />
      </button>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
      </div>
      <p className="text-gray-600 text-sm mb-2">By {course.author}</p>
      <div className="flex justify-between items-center mb-4">
        <span className="text-gray-500 text-xs">{course.duration}</span>
        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{course.level}</span>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg flex items-center justify-center">
        <span>Continue Learning</span>
        <ExternalLink size={16} className="ml-2" />
      </button>
    </div>
  </motion.div>
)

// Tutor Card Component
const TutorCard = ({ tutor, onRemove }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img src={tutor.avatar || "/placeholder.svg"} alt={tutor.name} className="w-12 h-12 rounded-full mr-3" />
          <div>
            <h3 className="font-bold text-lg">{tutor.name}</h3>
            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">{tutor.domain}</span>
          </div>
        </div>
        <button onClick={() => onRemove(tutor.id)} className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </button>
      </div>
      <div className="mb-4">
        <h4 className="font-medium mb-1">{tutor.session}</h4>
        <p className="text-gray-500 text-sm">{new Date(tutor.datetime).toLocaleString()}</p>
      </div>
      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg flex items-center justify-center">
        <span>View Session</span>
        <ExternalLink size={16} className="ml-2" />
      </button>
    </div>
  </motion.div>
)

// Forum Post Card Component
const ForumPostCard = ({ post, onRemove }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-5">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg line-clamp-2">{post.title}</h3>
        <button
          onClick={() => onRemove(post.id)}
          className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 ml-2 flex-shrink-0"
        >
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{post.preview}</p>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center text-gray-500 text-xs">
          <span className="mr-3">👍 {post.upvotes}</span>
          <span>💬 {post.comments}</span>
        </div>
      </div>
      <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg flex items-center justify-center">
        <span>Read Post</span>
        <ExternalLink size={16} className="ml-2" />
      </button>
    </div>
  </motion.div>
)

// NGO Card Component
const NGOCard = ({ ngo, onRemove }) => (
  <motion.div
    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
    whileHover={{ y: -5 }}
    transition={{ duration: 0.2 }}
  >
    <div className="p-5">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <img src={ngo.logo || "/placeholder.svg"} alt={ngo.name} className="w-12 h-12 rounded-lg mr-3" />
          <h3 className="font-bold text-lg">{ngo.name}</h3>
        </div>
        <button onClick={() => onRemove(ngo.id)} className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100">
          <Heart className="w-4 h-4 text-red-500 fill-current" />
        </button>
      </div>
      <div className="flex flex-wrap gap-1 mb-3">
        {ngo.tags.map((tag, index) => (
          <span key={index} className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <p className="text-gray-600 text-sm mb-4">{ngo.description}</p>
      <button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg flex items-center justify-center">
        <span>View Initiative</span>
        <ExternalLink size={16} className="ml-2" />
      </button>
    </div>
  </motion.div>
)

export default AllInsights;