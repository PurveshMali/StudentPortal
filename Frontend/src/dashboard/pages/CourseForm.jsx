"use client"
import { useState } from "react"

const CourseForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrls: [{ title: "", url: "" }],
    notes: [{ filename: "", url: "" }],
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleVideoChange = (index, field, value) => {
    const updatedVideos = [...formData.videoUrls]
    updatedVideos[index][field] = value
    setFormData({ ...formData, videoUrls: updatedVideos })

    // Clear error for this field if it exists
    if (errors[`video-${index}-${field}`]) {
      setErrors({ ...errors, [`video-${index}-${field}`]: "" })
    }
  }

  const handleNoteChange = (index, field, value) => {
    const updatedNotes = [...formData.notes]
    updatedNotes[index][field] = value
    setFormData({ ...formData, notes: updatedNotes })

    // Clear error for this field if it exists
    if (errors[`note-${index}-${field}`]) {
      setErrors({ ...errors, [`note-${index}-${field}`]: "" })
    }
  }

  const addVideo = () => {
    setFormData({
      ...formData,
      videoUrls: [...formData.videoUrls, { title: "", url: "" }],
    })
  }

  const removeVideo = (index) => {
    const updatedVideos = [...formData.videoUrls]
    updatedVideos.splice(index, 1)
    setFormData({ ...formData, videoUrls: updatedVideos })
  }

  const addNote = () => {
    setFormData({
      ...formData,
      notes: [...formData.notes, { filename: "", url: "" }],
    })
  }

  const removeNote = (index) => {
    const updatedNotes = [...formData.notes]
    updatedNotes.splice(index, 1)
    setFormData({ ...formData, notes: updatedNotes })
  }

  const validateForm = () => {
    const newErrors = {}

    // Validate title
    if (!formData.title.trim()) {
      newErrors.title = "Course title is required"
    }

    // Validate description
    if (!formData.description.trim()) {
      newErrors.description = "Course description is required"
    }

    // Validate videos
    formData.videoUrls.forEach((video, index) => {
      if (!video.title.trim()) {
        newErrors[`video-${index}-title`] = "Video title is required"
      }
      if (!video.url.trim()) {
        newErrors[`video-${index}-url`] = "Video URL is required"
      } else if (!isValidUrl(video.url)) {
        newErrors[`video-${index}-url`] = "Please enter a valid URL"
      }
    })

    // Validate notes
    formData.notes.forEach((note, index) => {
      if (!note.filename.trim()) {
        newErrors[`note-${index}-filename`] = "Filename is required"
      }
      if (!note.url.trim()) {
        newErrors[`note-${index}-url`] = "Note URL is required"
      } else if (!isValidUrl(note.url)) {
        newErrors[`note-${index}-url`] = "Please enter a valid URL"
      }
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (url) => {
    try {
      new URL(url)
      return true
    } catch (e) {
      return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block font-medium text-gray-700 mb-1">Course Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          className={`w-full border ${errors.title ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
          placeholder="e.g. C++ Data Structures"
        />
        {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
      </div>

      <div>
        <label className="block font-medium text-gray-700 mb-1">Course Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          rows="4"
          className={`w-full border ${errors.description ? "border-red-500" : "border-gray-300"} rounded-lg p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
          placeholder="A beginner-friendly course..."
        ></textarea>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium text-gray-700">Course Videos</label>
          <button
            type="button"
            onClick={addVideo}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
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
              className="mr-1"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Video
          </button>
        </div>

        <div className="space-y-4">
          {formData.videoUrls.map((video, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">Video {index + 1}</h4>
                {formData.videoUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeVideo(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
                  <input
                    type="text"
                    value={video.title}
                    onChange={(e) => handleVideoChange(index, "title", e.target.value)}
                    className={`w-full border ${errors[`video-${index}-title`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
                    placeholder="e.g. Intro to Arrays"
                  />
                  {errors[`video-${index}-title`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`video-${index}-title`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                  <input
                    type="text"
                    value={video.url}
                    onChange={(e) => handleVideoChange(index, "url", e.target.value)}
                    className={`w-full border ${errors[`video-${index}-url`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
                    placeholder="https://example.com/video.mp4"
                  />
                  {errors[`video-${index}-url`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`video-${index}-url`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium text-gray-700">Course Notes</label>
          <button
            type="button"
            onClick={addNote}
            className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
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
              className="mr-1"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Note
          </button>
        </div>

        <div className="space-y-4">
          {formData.notes.map((note, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">Note {index + 1}</h4>
                {formData.notes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeNote(index)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Filename</label>
                  <input
                    type="text"
                    value={note.filename}
                    onChange={(e) => handleNoteChange(index, "filename", e.target.value)}
                    className={`w-full border ${errors[`note-${index}-filename`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
                    placeholder="e.g. array_notes.pdf"
                  />
                  {errors[`note-${index}-filename`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`note-${index}-filename`]}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Note URL</label>
                  <input
                    type="text"
                    value={note.url}
                    onChange={(e) => handleNoteChange(index, "url", e.target.value)}
                    className={`w-full border ${errors[`note-${index}-url`] ? "border-red-500" : "border-gray-300"} rounded-lg p-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all`}
                    placeholder="https://example.com/notes.pdf"
                  />
                  {errors[`note-${index}-url`] && (
                    <p className="mt-1 text-sm text-red-500">{errors[`note-${index}-url`]}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="border border-gray-300 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-50 transition-all font-medium"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-2 px-6 rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all font-medium"
        >
          Create Course
        </button>
      </div>
    </form>
  )
}

export default CourseForm

