"use client"
import { motion } from "framer-motion"
import { Video, Users, User } from "lucide-react"

const Tutoring = () => {
  // Sample data for tutoring sessions
  const tutoringSessions = [
    {
      id: 1,
      title: "Machine Learning Algorithms",
      educator: "Dr. Alan Smith",
      domain: "AI & ML",
      level: "Intermediate",
      date: "Apr 15, 2025",
      time: "2:00 PM",
      students: 8,
      maxStudents: 10,
      thumbnail: "https://wallpaperaccess.com/full/4578898.jpg",
      type: "Group",
      meetingUrl: "https://calendar.app.google/MbrskCBkfuLLdtAR9"
    },
    {
      id: 2,
      title: "React Hooks Deep Dive",
      educator: "Alex Johnson",
      domain: "Web Development",
      level: "Advanced",
      date: "Apr 16, 2025",
      time: "4:30 PM",
      students: 5,
      maxStudents: 8,
      thumbnail: "https://wallpaperaccess.com/full/1398313.jpg",
      type: "Group",
      meetingUrl: "https://meeting.example.com/react-hooks"
    },
    {
      id: 3,
      title: "Data Structures Fundamentals",
      educator: "Prof. Maria Rodriguez",
      domain: "Programming",
      level: "Beginner",
      date: "Apr 17, 2025",
      time: "1:00 PM",
      students: 1,
      maxStudents: 1,
      thumbnail: "https://tse4.mm.bing.net/th?id=OIP.7u5bQsTw_bllP32M_iK9BgHaEo&pid=Api&P=0&h=180",
      type: "One-on-One",
      meetingUrl: "https://meeting.example.com/data-structures"
    },
    {
      id: 4,
      title: "Cloud Computing Essentials",
      educator: "Sarah Williams",
      domain: "Cloud Computing",
      level: "Beginner",
      date: "Apr 18, 2025",
      time: "3:00 PM",
      students: 6,
      maxStudents: 12,
      thumbnail: "https://tse4.mm.bing.net/th?id=OIP.Bh0VJB4reNFUr3eGD3676wHaFj&pid=Api&P=0&h=180",
      type: "Group",
      meetingUrl: "https://meeting.example.com/cloud-computing"
    },
    {
      id: 5,
      title: "Blockchain Technology",
      educator: "Michael Chen",
      domain: "Cryptography",
      level: "Advanced",
      date: "Apr 19, 2025",
      time: "11:00 AM",
      students: 1,
      maxStudents: 1,
      thumbnail: "https://wallpaperaccess.com/full/1704555.jpg",
      type: "One-on-One",
      meetingUrl: "https://meeting.example.com/blockchain"
    },
    {
      id: 6,
      title: "Mobile App Development",
      educator: "Jessica Lee",
      domain: "Mobile",
      level: "Intermediate",
      date: "Apr 20, 2025",
      time: "5:00 PM",
      students: 7,
      maxStudents: 10,
      thumbnail: "https://tse4.mm.bing.net/th?id=OIP.7u5bQsTw_bllP32M_iK9BgHaEo&pid=Api&P=0&h=180",
      type: "Group",
      meetingUrl: "https://meeting.example.com/mobile-app-dev"
    },
  ]

  // Handle join session click
  const handleJoinSession = (meetingUrl) => {
    window.open(meetingUrl, '_blank');
  }

  // Animation variants for cards
  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">Tutoring Dashboard</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center transition-colors duration-200">
          <span className="mr-2">Schedule New Session</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Tutoring sessions grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutoringSessions.map((session) => (
          <motion.div
            key={session.id}
            className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            {/* Session thumbnail */}
            <div className="relative h-48 w-full">
              <img
                src={session.thumbnail || "/placeholder.svg"}
                alt={session.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    session.domain === "AI & ML"
                      ? "bg-purple-100 text-purple-800"
                      : session.domain === "Web Development"
                        ? "bg-blue-100 text-blue-800"
                        : session.domain === "Programming"
                          ? "bg-green-100 text-green-800"
                          : session.domain === "Cloud Computing"
                            ? "bg-teal-100 text-teal-800"
                            : session.domain === "Cryptography"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {session.domain}
                </span>
              </div>
            </div>

            {/* Session details */}
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{session.title}</h3>
                <span
                  className={`ml-2 px-2 py-1 rounded-md text-xs font-medium ${
                    session.type === "One-on-One"
                      ? "bg-rose-100 text-rose-700 flex items-center"
                      : "bg-emerald-100 text-emerald-700 flex items-center"
                  }`}
                >
                  {session.type === "One-on-One" ? (
                    <>
                      <User className="h-3 w-3 mr-1" />
                      {session.type}
                    </>
                  ) : (
                    <>
                      <Users className="h-3 w-3 mr-1" />
                      {session.type}
                    </>
                  )}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">By {session.educator}</p>

              <div className="flex items-center mb-3">
                <span className="bg-gray-100 text-gray-700 text-xs font-medium px-2 py-1 rounded mr-2">
                  {session.level}
                </span>
                <span className="text-xs text-gray-500">
                  {session.date} • {session.time}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  <span className="font-medium">
                    {session.students}/{session.maxStudents}
                  </span>{" "}
                  students
                </div>
                <button 
                  onClick={() => handleJoinSession(session.meetingUrl)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-md flex items-center transition-colors duration-200"
                >
                  <Video className="h-4 w-4 mr-1.5" />
                  Join Session
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Tutoring;