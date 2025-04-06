"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
    description: "Connecting educators globally to share best practices and support schools in developing regions.",
    logo: "https://imgs.search.brave.com/_OEKgsqS41hq13M4Zn8OhjxwWeRqYnzcOvZ5s-1J0es/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9kMWNz/YXJrejhvYmU5dS5j/bG91ZGZyb250Lm5l/dC9wb3N0ZXJwcmV2/aWV3cy9uZ28tbG9n/by1oZWxwaW5nLWhh/bmRzLWxvZ28tZGVz/aWduLXRlbXBsYXRl/LTI1ZWMyZGU4Nzkx/Y2MzMmZiMzFkN2I4/M2Q4ZDQxOWY2Lmpw/Zz90cz0xNzI2Mzk4/MDI0",
    tags: ["Teacher Training", "Global Education", "Collaboration"],
    region: "Africa",
  },
  {
    id: 5,
    name: "Green Schools Initiative",
    description: "Promoting environmental education and sustainable practices in schools around the world.",
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
]

// Statistics data
const statisticsData = {
  totalPartners: 42,
  activeCampaigns: 18,
  volunteersConnected: 1250,
}

const collaborationAreas = [
  "Curriculum Development",
  "Teacher Training",
  "Technology Integration",
  "Student Mentorship",
  "Resource Sharing",
  "Research Partnership",
  "Event Collaboration",
  "Fundraising",
]

const regions = [
  "All Regions",
  "Africa",
  "Asia Pacific",
  "Europe",
  "Global",
  "North America",
  "South America",
  "South Asia",
]

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
]

const NGOPartners = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All Regions")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    ngoName: "",
    contactPerson: "",
    email: "",
    website: "",
    collaborationArea: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    if (formErrors[name]) setFormErrors({ ...formErrors, [name]: "" })
  }

  const validateForm = () => {
    const errors = {}
    if (!formData.ngoName.trim()) errors.ngoName = "NGO name is required"
    if (!formData.contactPerson.trim()) errors.contactPerson = "Contact person is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Email is invalid"
    if (!formData.collaborationArea) errors.collaborationArea = "Select an area of collaboration"
    return errors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }
    console.log("Form submitted:", formData)
    setIsModalOpen(false)
    setFormData({
      ngoName: "",
      contactPerson: "",
      email: "",
      website: "",
      collaborationArea: "",
      message: "",
    })
  }

  const filteredNGOs = ngoData.filter((ngo) => {
    const matchesSearch =
      ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ngo.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "All Regions" || ngo.region === selectedRegion
    const matchesCategory =
      selectedCategory === "All Categories" || ngo.tags.some((tag) => tag === selectedCategory)
    return matchesSearch && matchesRegion && matchesCategory
  })

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    hover: { y: -5, boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)", transition: { duration: 0.2 } },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">NGO Partners</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Connect With Us
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center">
            <span className="mr-2">Register Your NGO</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-md">
          <p className="text-sm text-gray-500 mb-1">Total Partners</p>
          <p className="text-3xl font-bold text-purple-600">{statisticsData.totalPartners}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <p className="text-sm text-gray-500 mb-1">Active Campaigns</p>
          <p className="text-3xl font-bold text-blue-600">{statisticsData.activeCampaigns}</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-md">
          <p className="text-sm text-gray-500 mb-1">Volunteers Connected</p>
          <p className="text-3xl font-bold text-green-600">{statisticsData.volunteersConnected}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-5 shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          />
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-md px-3 py-2 w-full"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
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
            className="bg-white rounded-xl p-5 shadow-md border border-gray-100"
          >
            <img src={ngo.logo} alt={ngo.name} className="h-16 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800">{ngo.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{ngo.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {ngo.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white rounded-xl w-full max-w-xl p-6 shadow-lg relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">Connect With Us</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="ngoName"
                placeholder="NGO Name*"
                className="w-full border px-3 py-2 rounded"
                value={formData.ngoName}
                onChange={handleInputChange}
              />
              {formErrors.ngoName && <p className="text-red-500 text-sm">{formErrors.ngoName}</p>}

              <input
                name="contactPerson"
                placeholder="Contact Person*"
                className="w-full border px-3 py-2 rounded"
                value={formData.contactPerson}
                onChange={handleInputChange}
              />
              {formErrors.contactPerson && <p className="text-red-500 text-sm">{formErrors.contactPerson}</p>}

              <input
                name="email"
                placeholder="Email*"
                className="w-full border px-3 py-2 rounded"
                value={formData.email}
                onChange={handleInputChange}
              />
              {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}

              <input
                name="website"
                placeholder="Website (optional)"
                className="w-full border px-3 py-2 rounded"
                value={formData.website}
                onChange={handleInputChange}
              />

              <select
                name="collaborationArea"
                value={formData.collaborationArea}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Collaboration Area*</option>
                {collaborationAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {formErrors.collaborationArea && (
                <p className="text-red-500 text-sm">{formErrors.collaborationArea}</p>
              )}

              <textarea
                name="message"
                placeholder="Message (optional)"
                className="w-full border px-3 py-2 rounded"
                rows="3"
                value={formData.message}
                onChange={handleInputChange}
              />

              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default NGOPartners
