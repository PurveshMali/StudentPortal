const PlatformFeatures = () => {
    const features = [
      {
        id: 1,
        title: "Student-Led Courses",
        description: "Create and share courses with peers, earning recognition and rewards for quality content.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
          </svg>
        ),
      },
      {
        id: 2,
        title: "Community Forum",
        description: "Engage in discussions, solve problems, and earn points in our gamified knowledge-sharing platform.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        ),
      },
      {
        id: 3,
        title: "Tutoring Services",
        description: "Connect with skilled tutors for personalized learning sessions tailored to your needs.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        ),
      },
      {
        id: 4,
        title: "NGO Collaborations",
        description: "Partner with NGOs to apply your skills in real-world projects that make a difference.",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-indigo-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        ),
      },
    ]
  
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Platform Features</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mb-12">
            Our comprehensive educational ecosystem combines peer learning, expert tutoring, and real-world applications
            with ML-powered personalization.
          </p>
  
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex flex-col items-center"
              >
                <div className="bg-indigo-100 p-3 rounded-full mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }
  
  export default PlatformFeatures
  
  