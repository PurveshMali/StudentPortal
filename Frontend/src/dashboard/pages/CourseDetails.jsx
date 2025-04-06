import React, { useState, useEffect } from 'react';
import { ArrowLeft, User, Clock, BookOpen, CheckCircle, PlayCircle } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Mock course content data
  const courseModules = [
    {
      id: 'm1',
      title: 'Introduction',
      lessons: [
        { id: 'l1', title: 'Course Overview', duration: '12:30', completed: true },
        { id: 'l2', title: 'Prerequisites', duration: '08:45', completed: true },
        { id: 'l3', title: 'Setting Up Your Environment', duration: '15:20', completed: true },
      ]
    },
    {
      id: 'm2',
      title: 'Core Concepts',
      lessons: [
        { id: 'l4', title: 'Basic Principles', duration: '22:15', completed: true },
        { id: 'l5', title: 'Key Terminology', duration: '18:30', completed: false },
        { id: 'l6', title: 'Fundamental Techniques', duration: '24:10', completed: false },
      ]
    },
    {
      id: 'm3',
      title: 'Practical Applications',
      lessons: [
        { id: 'l7', title: 'Real-world Examples', duration: '26:40', completed: false },
        { id: 'l8', title: 'Case Studies', duration: '20:15', completed: false },
        { id: 'l9', title: 'Guided Practice', duration: '35:50', completed: false },
      ]
    },
    {
      id: 'm4',
      title: 'Advanced Topics',
      lessons: [
        { id: 'l10', title: 'Optimization Strategies', duration: '28:15', completed: false },
        { id: 'l11', title: 'Troubleshooting Common Issues', duration: '22:30', completed: false },
        { id: 'l12', title: 'Best Practices', duration: '19:45', completed: false },
      ]
    }
  ];

  // Mock data for all courses (should match the data in MyCourses)
  const allCourses = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      instructor: "Dr. Alan Smith",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&h=280",
      category: "Computer Science",
      level: "Intermediate",
      studentsCount: 2543,
      duration: "8 weeks",
      progress: 65,
      description: "A comprehensive introduction to machine learning concepts, algorithms, and practical applications. Learn how to build and evaluate machine learning models for real-world problems.",
    },
    {
      id: "2",
      title: "Advanced Data Structures",
      instructor: "Prof. Maria Rodriguez",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&h=280",
      category: "Programming",
      level: "Advanced",
      studentsCount: 1842,
      duration: "10 weeks",
      progress: 32,
      description: "Master complex data structures and understand their implementation details. Learn about advanced algorithms and optimization techniques for efficient problem-solving.",
    },
    {
      id: "3",
      title: "Web Development with React",
      instructor: "Alex Johnson",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=500&h=280",
      category: "Web Development",
      level: "Beginner",
      studentsCount: 3721,
      duration: "6 weeks",
      progress: 78,
      description: "Learn modern web development using React. Build interactive user interfaces and single-page applications with the most popular JavaScript library.",
    },
    {
      id: "4",
      title: "Natural Language Processing",
      instructor: "Dr. James Wilson",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&h=280",
      category: "AI & ML",
      level: "Advanced",
      studentsCount: 1254,
      duration: "12 weeks",
      progress: 0,
      description: "Explore the fascinating field of Natural Language Processing. Learn how to process and analyze text data using machine learning techniques.",
    },
    {
      id: "5",
      title: "Blockchain Fundamentals",
      instructor: "Emma Davis",
      image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?auto=format&fit=crop&w=500&h=280",
      category: "Cryptography",
      level: "Intermediate",
      studentsCount: 876,
      duration: "8 weeks",
      progress: 0,
      description: "Understand the principles behind blockchain technology and cryptocurrencies. Learn about distributed ledgers, consensus mechanisms, and smart contracts.",
    }
  ];

  // Find the course based on the courseId parameter
  useEffect(() => {
    // Simulate API call with a short delay
    const timer = setTimeout(() => {
      const foundCourse = allCourses.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
      }
      setLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [courseId]);

  // Calculate completed lessons
  const totalLessons = courseModules.reduce((acc, module) => acc + module.lessons.length, 0);
  const completedLessons = courseModules.reduce((acc, module) => 
    acc + module.lessons.filter(lesson => lesson.completed).length, 0);

  const markLessonComplete = (moduleId, lessonId) => {
    // This would typically update state and potentially call an API
    // For demonstration, we're just logging
    console.log(`Marking lesson ${lessonId} in module ${moduleId} as complete`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-purple-600 text-lg">Loading course details...</div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
        <p className="text-gray-600 mb-6">We couldn't find the course you're looking for.</p>
        <button 
          onClick={() => navigate('/courses')}
          className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
        >
          Back to Courses
        </button>
      </div>
    );
  }

  // Find the first incomplete lesson for "Continue Learning" button
  let continueLesson = null;
  for (const module of courseModules) {
    const firstIncompleteLesson = module.lessons.find(lesson => !lesson.completed);
    if (firstIncompleteLesson) {
      continueLesson = { moduleId: module.id, lesson: firstIncompleteLesson };
      break;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero section with course info */}
      <div className="bg-white shadow-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-8">
          <button 
            onClick={() => navigate('/courses')}
            className="flex items-center text-purple-600 mb-6 hover:text-purple-800"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Courses
          </button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-2">
                <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium rounded-full px-3 py-1">
                  {course.level}
                </span>
                <span className="inline-block bg-gray-100 text-gray-800 text-xs font-medium rounded-full px-3 py-1 ml-2">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>
              
              <div className="flex items-center text-gray-600 mb-6">
                <img 
                  src="/api/placeholder/40/40" 
                  alt="Instructor" 
                  className="w-10 h-10 rounded-full mr-3" 
                />
                <span>By {course.instructor}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <User size={16} className="mr-1" />
                  <span>{course.studentsCount.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center">
                  <BookOpen size={16} className="mr-1" />
                  <span>{totalLessons} lessons</span>
                </div>
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Your progress</span>
                    <span>{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <div className="text-sm text-gray-600 mb-1">
                    {completedLessons} of {totalLessons} lessons completed
                  </div>
                </div>
                
                {continueLesson && (
                  <button 
                    className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium flex items-center justify-center hover:bg-purple-700"
                  >
                    <PlayCircle size={18} className="mr-2" />
                    Continue Learning
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course content section */}
      <div className="max-w-screen-xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6">Course Content</h2>
        
        <div className="space-y-4">
          {courseModules.map((module, moduleIndex) => (
            <div key={module.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <h3 className="font-bold">
                  Module {moduleIndex + 1}: {module.title}
                </h3>
              </div>
              
              <div className="divide-y divide-gray-100">
                {module.lessons.map((lesson) => (
                  <div 
                    key={lesson.id}
                    className="p-4 flex items-center justify-between hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center">
                      {lesson.completed ? (
                        <CheckCircle size={18} className="text-green-500 mr-3" />
                      ) : (
                        <PlayCircle size={18} className="text-gray-400 mr-3" />
                      )}
                      <div>
                        <h4 className="font-medium">{lesson.title}</h4>
                        <span className="text-sm text-gray-500">{lesson.duration}</span>
                      </div>
                    </div>
                    
                    {!lesson.completed && (
                      <button 
                        onClick={() => markLessonComplete(module.id, lesson.id)}
                        className="text-sm text-purple-600 hover:text-purple-800"
                      >
                        Mark as complete
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;