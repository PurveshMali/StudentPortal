"use client";
import React, { useState } from "react";
// import SkillsAssessment from './SkillsAssessment';
// import SuccessPage from './success-page';
// import FailurePage from './failure-page';
import { useNavigate } from "react-router-dom";

import SuccessPage from "./SuccessPage";
import FailurePage from "./FailurePage";
import SkillsAssessment from "./SkillsAssessment";

const NewEducator = () => {
  const [formData, setFormData] = useState({
    currentEducation: "",
    institute: "",
    graduationYear: "",
    skills: [],
    certificates: [],
  });

  const [page, setPage] = useState("registration");
  const [testResults, setTestResults] = useState({ score: 0, total: 0 });

  const navigate = useNavigate();
  const skillOptions = [
    { id: "ml", name: "Machine Learning" },
    { id: "python", name: "Python" },
    { id: "js", name: "JavaScript" },
    { id: "react", name: "React" },
    { id: "node", name: "Node.js" },
    { id: "data", name: "Data Science" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Development" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillToggle = (skill) => {
    setFormData((prev) => {
      const newSkills = prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill];
      return { ...prev, skills: newSkills };
    });
  };

  const handleCertificateUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type === "image/png");
    setFormData((prev) => ({
      ...prev,
      certificates: [...prev.certificates, ...validFiles],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setPage("assessment");
    // navigate('/')
  };

  const handleTestComplete = (score, total) => {
    setTestResults({ score, total });
    setPage(score >= 7 ? "success" : "failure");
  };

  const renderPage = () => {

    switch (page) {
      case "registration":
        return (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all">
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-6 px-8">
              <h2 className="text-2xl font-bold text-white">
                Become an Educator
              </h2>
              <p className="text-purple-100 mt-1">
                Share your knowledge and help others learn
              </p>
            </div>

            <div className="p-8">
              <div className="flex mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                  1
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Registration
                  </h3>
                  <p className="text-gray-500">
                    Tell us about your education and skills
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Current Education
                    </label>
                    <input
                      type="text"
                      name="currentEducation"
                      value={formData.currentEducation}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="e.g. B.Tech in Computer Engineering"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Institute Name
                    </label>
                    <input
                      type="text"
                      name="institute"
                      value={formData.institute}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      placeholder="e.g. DY Patil College, Talegaon"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Year of Completion
                    </label>
                    <input
                      type="number"
                      name="graduationYear"
                      value={formData.graduationYear}
                      onChange={handleInputChange}
                      min="2024"
                      className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Skills
                    </label>
                    <p className="text-sm text-gray-500 mb-3">
                      Select all that apply. You'll be tested on these skills.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {skillOptions.map((skill) => (
                        <div
                          key={skill.id}
                          onClick={() => handleSkillToggle(skill.name)}
                          className={`
                            border rounded-lg p-3 cursor-pointer transition-all
                            ${
                              formData.skills.includes(skill.name)
                                ? "bg-purple-100 border-purple-500 text-purple-700"
                                : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                            }
                          `}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-sm mr-2 flex items-center justify-center ${
                                formData.skills.includes(skill.name)
                                  ? "bg-purple-600"
                                  : "border border-gray-400"
                              }`}
                            >
                              {formData.skills.includes(skill.name) && (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="3"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              )}
                            </div>
                            <span>{skill.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-1">
                      Upload Certificates (.png only)
                    </label>
                    <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-all">
                      <input
                        type="file"
                        accept=".png"
                        multiple
                        onChange={handleCertificateUpload}
                        className="hidden"
                        id="certificate-upload"
                        required
                      />
                      <label
                        htmlFor="certificate-upload"
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="mx-auto text-gray-400 mb-2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                          <polyline points="17 8 12 3 7 8"></polyline>
                          <line x1="12" y1="3" x2="12" y2="15"></line>
                        </svg>
                        <p className="text-sm text-gray-500">
                          Drag and drop your certificates here, or{" "}
                          <span className="text-purple-600 font-medium">
                            browse files
                          </span>
                        </p>
                      </label>
                    </div>
                    {formData.certificates.length > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">
                          Uploaded Certificates:
                        </h4>
                        <ul className="space-y-1">
                          {formData.certificates.map((file, idx) => (
                            <li
                              key={idx}
                              className="text-sm text-gray-600 flex items-center"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-green-500 mr-2"
                              >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                              </svg>
                              {file.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium text-lg flex items-center justify-center"
                  >
                    Prove Your Skills
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
                </div>
              </form>
            </div>
          </div>
        );
      case "assessment":
        return (
          <SkillsAssessment
            skills={formData.skills}
            onComplete={handleTestComplete}
          />
        );
      case "success":
        return (
          <SuccessPage score={testResults.score} total={testResults.total} />
        );
      case "failure":
        return (
          <FailurePage score={testResults.score} total={testResults.total} />
        );
      default:
        return null;
    }
  };

  return renderPage();
};

export default NewEducator;
