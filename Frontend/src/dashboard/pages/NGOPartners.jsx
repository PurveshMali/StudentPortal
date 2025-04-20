"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Sample NGO data
const ngoData = [
  {
    id: 1,
    name: "Education For All",
    description:
      "Providing quality education to underprivileged children in rural areas through innovative teaching methods and technology.",
    logo: "https://imgs.search.brave.com/J_8_OX5bK-_djIjjjv_ogX-f3M5BHlYykzkvPAzptLM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzM3LzE4Lzc5/LzM2MF9GXzUzNzE4/NzkwN19DOTNiQkpS/NWlDWnpWck03MDVR/TlBBcHByY2JvbUla/ZS5qcGc",
    tags: ["Rural Education", "Technology", "Children"],
    region: "South Asia",
  },
  {
    id: 2,
    name: "STEM for Girls",
    description:
      "Empowering young girls through science, technology, engineering, and mathematics education in underserved communities.",
    logo: "https://imgs.search.brave.com/_OEKgsqS41hq13M4Zn8OhjxwWeRqYnzcOvZ5s-1J0es/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy9uZ28tbG9n/by1oZWxwaW5nLWhh/bmRzLWxvZ28tZGVz/aWduLXRlbXBsYXRl/LTI1ZWMyZGU4Nzkx/Y2MzMmZiMzFkN2I4/M2Q4ZDQxOWY2Lmpw/Zz90cz0xNzI2Mzk4/MDI0",
    tags: ["STEM", "Gender Equality", "Youth"],
    region: "Global",
  },
  {
    id: 3,
    name: "Digital Literacy Foundation",
    description:
      "Bridging the digital divide by providing computer skills training to communities with limited access to technology.",
    logo: "https://imgs.search.brave.com/J_8_OX5bK-_djIjjjv_ogX-f3M5BHlYykzkvPAzptLM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzM3LzE4Lzc5/LzM2MF9GXzUzNzE4/NzkwN19DOTNiQkpS/NWlDWnpWck03MDVR/TlBBcHByY2JvbUla/ZS5qcGc",
    tags: ["Digital Skills", "Adult Education", "Community"],
    region: "North America",
  },
  {
    id: 4,
    name: "Teachers Without Borders",
    description:
      "Connecting educators globally to share best practices and support schools in developing regions.",
    logo: "https://imgs.search.brave.com/_OEKgsqS41hq13M4Zn8OhjxwWeRqYnzcOvZ5s-1J0es/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy9uZ28tbG9n/by1oZWxwaW5nLWhh/bmRzLWxvZ28tZGVz/aWduLXRlbXBsYXRl/LTI1ZWMyZGU4Nzkx/Y2MzMmZiMzFkN2I4/M2Q4ZDQxOWY2Lmpw/Zz90cz0xNzI2Mzk4/MDI0",
    tags: ["Teacher Training", "Global Education", "Collaboration"],
    region: "Africa",
  },
  {
    id: 5,
    name: "Green Schools Initiative",
    description:
      "Promoting environmental education and sustainable practices in schools around the world.",
    logo: "https://imgs.search.brave.com/J_8_OX5bK-_djIjjjv_ogX-f3M5BHlYykzkvPAzptLM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzM3LzE4Lzc5/LzM2MF9GXzUzNzE4/NzkwN19DOTNiQkpS/NWlDWnpWck03MDVR/TlBBcHByY2JvbUla/ZS5qcGc",
    tags: ["Environmental Education", "Sustainability", "Schools"],
    region: "Europe",
  },
  {
    id: 6,
    name: "Inclusive Learning Alliance",
    description:
      "Creating accessible learning environments for students with disabilities through adaptive technologies and teacher training.",
    logo: "https://imgs.search.brave.com/_OEKgsqS41hq13M4Zn8OhjxwWeRqYnzcOvZ5s-1J0es/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy9uZ28tbG9n/by1oZWxwaW5nLWhh/bmRzLWxvZ28tZGVz/aWduLXRlbXBsYXRl/LTI1ZWMyZGU4Nzkx/Y2MzMmZiMzFkN2I4/M2Q4ZDQxOWY2Lmpw/Zz90cz0xNzI2Mzk4/MDI0",
    tags: ["Inclusive Education", "Disability Support", "Accessibility"],
    region: "Asia Pacific",
  },
];

// Statistics data
const statisticsData = {
  totalPartners: 42,
  activeCampaigns: 18,
  volunteersConnected: 1250,
};

const collaborationAreas = [
  "Curriculum Development",
  "Teacher Training",
  "Technology Integration",
  "Student Mentorship",
  "Resource Sharing",
  "Research Partnership",
  "Event Collaboration",
  "Fundraising",
];

const regions = [
  "All Regions",
  "Africa",
  "Asia Pacific",
  "Europe",
  "Global",
  "North America",
  "South America",
  "South Asia",
];

const categories = [
  "All Categories",
  "Rural Education",
  "STEM",
  "Digital Skills",
  "Teacher Training",
  "Environmental Education",
  "Inclusive Education",
  "Gender Equality",
  "Adult Education",
];

const NGOPartners = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("All Regions");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    ngoName: "",
    contactPerson: "",
    email: "",
    website: "",
    collaborationArea: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.ngoName.trim()) errors.ngoName = "NGO name is required";
    if (!formData.contactPerson.trim())
      errors.contactPerson = "Contact person is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.collaborationArea)
      errors.collaborationArea = "Select an area of collaboration";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    console.log("Form submitted:", formData);
    setIsModalOpen(false);
    setFormData({
      ngoName: "",
      contactPerson: "",
      email: "",
      website: "",
      collaborationArea: "",
      message: "",
    });
  };

  const filteredNGOs = ngoData.filter((ngo) => {
    const matchesSearch =
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === "All Regions" || ngo.region === selectedRegion;
    const matchesCategory =
      selectedCategory === "All Categories" ||
      ngo.tags.some((tag) => tag === selectedCategory);
    return matchesSearch && matchesRegion && matchesCategory;
  });

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: {
      y: -5,
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-900">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 md:mb-0">
            NGO Partners
          </h1>
          <p className="text-gray-300">
            Connecting organizations for positive impact
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1"
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
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            Connect With Us
          </button>
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded-md transition-all duration-200 flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-1">
            <span className="mr-2">Register Your NGO</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-purple-500 hover:bg-gray-750 transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-purple-500 bg-opacity-20 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Total Partners</p>
              <p className="text-3xl font-bold text-white">
                {statisticsData.totalPartners}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-blue-500 hover:bg-gray-750 transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Active Campaigns</p>
              <p className="text-3xl font-bold text-white">
                {statisticsData.activeCampaigns}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border-l-4 border-green-500 hover:bg-gray-750 transition-all duration-200 transform hover:scale-105">
          <div className="flex items-center">
            <div className="p-3 bg-green-500 bg-opacity-20 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-300 mb-1">Volunteers Connected</p>
              <p className="text-3xl font-bold text-white">
                {statisticsData.volunteersConnected}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800 rounded-xl p-6 shadow-lg mb-8 border border-gray-700">
        <h3 className="text-white font-medium mb-4">Filter Organizations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
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
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-600 bg-gray-700 rounded-md pl-10 pr-4 py-2 w-full text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border border-gray-600 bg-gray-700 rounded-md pl-10 pr-4 py-2 w-full text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-600 bg-gray-700 rounded-md pl-10 pr-4 py-2 w-full text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* NGO Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNGOs.map((ngo) => (
          <motion.div
            key={ngo.id}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            className="bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-700 transition-all duration-300 group hover:border-blue-500"
          >
            <div className="h-24 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center p-4">
              <img
                src={ngo.logo}
                alt={ngo.name}
                className="h-16 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white mb-2">
                {ngo.name}
              </h3>
              <p className="text-gray-300 mb-4">{ngo.description}</p>
              <div className="flex flex-wrap gap-1 mt-2 mb-4">
                {ngo.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded-full border border-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center mt-4">
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200 flex items-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Learn More
                </button>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors duration-200 flex items-center">
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
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Contact
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl w-full max-w-xl p-6 shadow-2xl relative border border-gray-700"
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-white transition-colors duration-200 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="flex items-center mb-6">
              <div className="bg-purple-500 bg-opacity-20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-400"
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
              </div>
              <h2 className="text-xl font-bold text-white">Connect With Us</h2>
            </div>
            <p className="text-gray-300 mb-6">
              Fill out the form below to start collaborating with our network of
              NGO partners.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  name="ngoName"
                  placeholder="NGO Name*"
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.ngoName}
                  onChange={handleInputChange}
                />
                {formErrors.ngoName && (
                  <p className="text-red-400 text-sm mt-1">
                    {formErrors.ngoName}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  name="contactPerson"
                  placeholder="Contact Person*"
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                />
                {formErrors.contactPerson && (
                  <p className="text-red-400 text-sm mt-1">
                    {formErrors.contactPerson}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  name="email"
                  placeholder="Email*"
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="text-red-400 text-sm mt-1">
                    {formErrors.email}
                  </p>
                )}
              </div>

              <div className="relative">
                <input
                  name="website"
                  placeholder="Website (optional)"
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <select
                  name="collaborationArea"
                  value={formData.collaborationArea}
                  onChange={handleInputChange}
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                >
                  <option value="">Select Collaboration Area*</option>
                  {collaborationAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {formErrors.collaborationArea && (
                  <p className="text-red-400 text-sm mt-1">
                    {formErrors.collaborationArea}
                  </p>
                )}
              </div>

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Message (optional)"
                  className="w-full border border-gray-600 bg-gray-700 px-4 py-3 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="3"
                  value={formData.message}
                  onChange={handleInputChange}
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="mr-3 px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-2 rounded-md transition-all duration-200 shadow-md hover:shadow-lg flex items-center"
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
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                  Submit
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default NGOPartners;
