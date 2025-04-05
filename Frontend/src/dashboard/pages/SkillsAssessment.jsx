"use client"
import { useState, useEffect } from "react"

// Mock questions database based on skills
const questionsBySkill = {
  "Machine Learning": [
    {
      id: "ml1",
      question: "Which of the following is NOT a type of machine learning?",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Cognitive Learning"],
      correctAnswer: "Cognitive Learning",
    },
    {
      id: "ml2",
      question: "What is the purpose of the activation function in neural networks?",
      options: [
        "To initialize weights",
        "To introduce non-linearity",
        "To normalize input data",
        "To prevent overfitting",
      ],
      correctAnswer: "To introduce non-linearity",
    },
    {
      id: "ml3",
      question: "Which algorithm is used for dimensionality reduction?",
      options: ["Random Forest", "K-means", "Principal Component Analysis (PCA)", "Gradient Descent"],
      correctAnswer: "Principal Component Analysis (PCA)",
    },
  ],
  Python: [
    {
      id: "py1",
      question: "What is the output of: [x for x in range(5)]",
      options: ["[0, 1, 2, 3, 4]", "[1, 2, 3, 4, 5]", "[0, 1, 2, 3, 4, 5]", "Error"],
      correctAnswer: "[0, 1, 2, 3, 4]",
    },
    {
      id: "py2",
      question: "Which of the following is NOT a built-in data type in Python?",
      options: ["list", "dictionary", "tuple", "array"],
      correctAnswer: "array",
    },
    {
      id: "py3",
      question: 'What does the "self" keyword represent in a Python class?',
      options: [
        "It refers to the class itself",
        "It refers to the instance of the class",
        "It is a reserved keyword for inheritance",
        "It is used to access static methods",
      ],
      correctAnswer: "It refers to the instance of the class",
    },
  ],
  JavaScript: [
    {
      id: "js1",
      question: "What will be the output of: console.log(typeof [])",
      options: ['"array"', '"object"', '"undefined"', '"function"'],
      correctAnswer: '"object"',
    },
    {
      id: "js2",
      question: "Which method is used to add elements to the end of an array?",
      options: ["push()", "append()", "add()", "insert()"],
      correctAnswer: "push()",
    },
    {
      id: "js3",
      question: "What is closure in JavaScript?",
      options: [
        "A way to hide implementation details",
        "A function that has access to variables from its outer scope",
        "A method to close browser windows",
        "A technique to prevent memory leaks",
      ],
      correctAnswer: "A function that has access to variables from its outer scope",
    },
  ],
  React: [
    {
      id: "react1",
      question: "What function is used to update state in a React functional component?",
      options: ["this.setState()", "useState()", "updateState()", "this.state()"],
      correctAnswer: "useState()",
    },
    {
      id: "react2",
      question: "What is the correct lifecycle method to make API calls in class components?",
      options: ["componentWillMount", "componentDidMount", "componentWillUpdate", "componentDidUpdate"],
      correctAnswer: "componentDidMount",
    },
    {
      id: "react3",
      question: "What is the purpose of React keys?",
      options: [
        "To encrypt component data",
        "To uniquely identify elements in a list",
        "To connect to external APIs",
        "To optimize rendering performance",
      ],
      correctAnswer: "To uniquely identify elements in a list",
    },
  ],
  "Node.js": [
    {
      id: "node1",
      question: "Which of the following is NOT a core module in Node.js?",
      options: ["http", "fs", "path", "react"],
      correctAnswer: "react",
    },
    {
      id: "node2",
      question: 'What does the "npm" stand for?',
      options: ["Node Package Manager", "Node Process Manager", "New Project Module", "Node Programming Method"],
      correctAnswer: "Node Package Manager",
    },
    {
      id: "node3",
      question: "Which statement is used to handle errors in Node.js?",
      options: ["try...catch", "if...else", "switch...case", "for...in"],
      correctAnswer: "try...catch",
    },
  ],
  "Data Science": [
    {
      id: "data1",
      question: "Which of the following is NOT a common data visualization library in Python?",
      options: ["Matplotlib", "Seaborn", "Plotly", "NumPy"],
      correctAnswer: "NumPy",
    },
    {
      id: "data2",
      question: "What is the purpose of data normalization?",
      options: [
        "To remove outliers",
        "To scale features to a similar range",
        "To handle missing values",
        "To reduce dimensionality",
      ],
      correctAnswer: "To scale features to a similar range",
    },
    {
      id: "data3",
      question: "Which technique is used to prevent overfitting in machine learning models?",
      options: ["Feature Engineering", "Cross-Validation", "Regularization", "All of the above"],
      correctAnswer: "All of the above",
    },
  ],
  "Web Development": [
    {
      id: "web1",
      question: "Which CSS property is used to control the spacing between elements?",
      options: ["padding", "margin", "spacing", "gap"],
      correctAnswer: "margin",
    },
    {
      id: "web2",
      question: "What does API stand for?",
      options: [
        "Application Programming Interface",
        "Application Process Integration",
        "Automated Programming Interface",
        "Application Protocol Interface",
      ],
      correctAnswer: "Application Programming Interface",
    },
    {
      id: "web3",
      question: "Which HTTP method is used to request data from a server?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correctAnswer: "GET",
    },
  ],
  "Mobile Development": [
    {
      id: "mobile1",
      question: "Which of the following is NOT a mobile app development framework?",
      options: ["React Native", "Flutter", "Xamarin", "Angular"],
      correctAnswer: "Angular",
    },
    {
      id: "mobile2",
      question: "What language is primarily used for iOS app development?",
      options: ["Java", "Swift", "Kotlin", "C#"],
      correctAnswer: "Swift",
    },
    {
      id: "mobile3",
      question: "What is the purpose of responsive design?",
      options: [
        "To make websites load faster",
        "To adapt to different screen sizes",
        "To improve SEO ranking",
        "To reduce server load",
      ],
      correctAnswer: "To adapt to different screen sizes",
    },
  ],
}

const SkillsAssessment = ({ skills, onComplete }) => {
  const [questions, setQuestions] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Generate 10 questions based on selected skills
    const selectedQuestions = []

    // First, get all questions for selected skills
    const allQuestions = skills.flatMap((skill) => (questionsBySkill[skill] ? questionsBySkill[skill] : []))

    // Shuffle and select up to 10 questions
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random())
    setQuestions(shuffled.slice(0, 10))
  }, [skills])

  useEffect(() => {
    // Timer countdown
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && questions.length > 0) {
      handleSubmitTest()
    }
  }, [timeLeft])

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    })
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSubmitTest = () => {
    setIsSubmitting(true)

    // Calculate score
    let correctAnswers = 0
    questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })

    // Simulate API call
    setTimeout(() => {
      onComplete(correctAnswers, questions.length)
    }, 1500)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Preparing your assessment...</h2>
        <p className="text-gray-500 mt-2">We're generating questions based on your selected skills.</p>
      </div>
    )
  }

  if (isSubmitting) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-800">Evaluating your answers...</h2>
        <p className="text-gray-500 mt-2">Please wait while we check your responses.</p>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100
  const answeredCount = Object.keys(selectedAnswers).length

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-6 px-8">
        <h2 className="text-2xl font-bold text-white">Skills Assessment</h2>
        <p className="text-purple-100 mt-1">Answer at least 7 out of 10 questions correctly to qualify</p>
      </div>

      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              2
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-800">Assessment</h3>
              <p className="text-gray-500">Test your knowledge</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className={`text-lg font-medium ${timeLeft < 60 ? "text-red-600" : "text-gray-700"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block mr-2"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-purple-700 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>{answeredCount} answered</span>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.question}</h3>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all
                  ${
                    selectedAnswers[currentQuestion.id] === option
                      ? "bg-purple-100 border-purple-500 text-purple-700"
                      : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                  }
                `}
              >
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center border ${selectedAnswers[currentQuestion.id] === option ? "bg-purple-600 border-purple-600" : "border-gray-400"}`}
                  >
                    {selectedAnswers[currentQuestion.id] === option && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg flex items-center ${
              currentQuestionIndex === 0 ? "text-gray-400 cursor-not-allowed" : "text-purple-700 hover:bg-purple-50"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Previous
          </button>

          {currentQuestionIndex === questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium flex items-center"
            >
              Submit Test
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium flex items-center"
            >
              Next
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default SkillsAssessment

