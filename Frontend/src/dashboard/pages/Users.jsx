"use client"

import { useState } from "react"
import { useDashboardData } from "../hooks/useDashboardData"
import Table from "../components/Table"
import Loader from "../components/Loader"
import Modal from "../components/Modal"
import { Search, Edit, Trash2, UserPlus } from "lucide-react"

const Users = () => {
  const { data: dashboardData, loading } = useDashboardData()
  const [searchTerm, setSearchTerm] = useState("")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Student",
      status: "Active",
      lastLogin: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Student",
      status: "Active",
      lastLogin: "1 day ago",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      role: "Tutor",
      status: "Active",
      lastLogin: "3 hours ago",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Student",
      status: "Inactive",
      lastLogin: "1 week ago",
    },
    {
      id: 5,
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "Just now",
    },
    {
      id: 6,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      role: "Student",
      status: "Active",
      lastLogin: "5 hours ago",
    },
    {
      id: 7,
      name: "David Wilson",
      email: "david.wilson@example.com",
      role: "Tutor",
      status: "Active",
      lastLogin: "2 days ago",
    },
    {
      id: 8,
      name: "Lisa Miller",
      email: "lisa.miller@example.com",
      role: "Student",
      status: "Pending",
      lastLogin: "Never",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setShowEditModal(true)
  }

  const userColumns = [
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", sortable: true },
    {
      key: "status",
      label: "Status",
      sortable: true,
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            value === "Active"
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : value === "Inactive"
                ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
          }`}
        >
          {value}
        </span>
      ),
    },
    { key: "lastLogin", label: "Last Login", sortable: true },
    {
      key: "actions",
      label: "Actions",
      render: (_, user) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleEditUser(user)}
            className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Edit size={18} />
          </button>
          <button className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ]

  if (loading) {
    return <Loader />
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover"
        >
          <UserPlus size={18} className="mr-2" />
          Add User
        </button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 rounded-md bg-white dark:bg-dark-card border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search users..."
          />
        </div>
      </div>

      <Table data={filteredUsers} columns={userColumns} pagination={true} itemsPerPage={6} />

      {/* Add User Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
        footer={
          <>
            <button
              onClick={() => setShowAddModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover ml-2">Add User</button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card">
              <option value="student">Student</option>
              <option value="tutor">Tutor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit User"
        footer={
          <>
            <button
              onClick={() => setShowEditModal(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover ml-2">
              Save Changes
            </button>
          </>
        }
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                defaultValue={selectedUser.name}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                defaultValue={selectedUser.email}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                defaultValue={selectedUser.role.toLowerCase()}
              >
                <option value="student">Student</option>
                <option value="tutor">Tutor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                defaultValue={selectedUser.status.toLowerCase()}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Users

