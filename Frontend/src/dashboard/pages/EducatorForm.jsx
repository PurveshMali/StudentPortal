import React, { useState, useEffect } from 'react';

const EducatorForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    skills: '',
    experience: '',
    profilePicture: ''
  });

  const [userId, setUserId] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user from localStorage or context
    const token = localStorage.getItem("token");
    if (token) {
      setUserId(true);
    } else {
      setError("User not logged in");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      setError("User ID not found. Please login.");
      return;
    }

    const payload = {
      userId,
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    try {
      const res = await fetch('http://localhost:5000/api/educator/unlock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setResponse(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Educator Profile Form</h2>

      {error && (
        <div className="mb-4 p-2 bg-red-100 border border-red-300 text-red-600 rounded">
          ❌ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="bio"
          placeholder="Short bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (years)"
          value={formData.experience}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="url"
          name="profilePicture"
          placeholder="Profile Picture URL"
          value={formData.profilePicture}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {response && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded">
          ✅ Educator Profile Created!
          <pre className="text-sm mt-2">{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EducatorForm;
