"use client"

import { useState } from "react"
import { useTheme } from "../context/ThemeContext"
import { useAuth } from "../hooks/useAuth"
import { Bell, Lock, User, Globe, Eye, EyeOff } from "lucide-react"

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <input
                    type="text"
                    defaultValue={user?.role || ""}
                    disabled
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Profile Picture</label>
                  <div className="flex items-center space-x-4">
                    <img
                      src={user?.avatar || "/placeholder.svg?height=40&width=40"}
                      alt="Profile"
                      className="w-12 h-12 rounded-full"
                    />
                    <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-hover">
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">About Me</h3>
              <textarea
                rows={4}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                placeholder="Write a short bio..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                Save Profile
              </button>
            </div>
          </div>
        )
      case "security":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full p-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                    />
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-dark-card"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div>
                  <p className="font-medium">Enhance your account security</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">Enable</button>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                Save Changes
              </button>
            </div>
          </div>
        )
      case "notifications":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Course Updates</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when courses are updated</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Assignment Reminders</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming assignments</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Forum Replies</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get notified when someone replies to your posts
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <Bell className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email notifications</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-hover">
                Save Preferences
              </button>
            </div>
          </div>
        )
      case "appearance":
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium mb-4">Theme Settings</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-white border border-gray-300 mr-3"></div>
                  <div>
                    <p className="font-medium">Light Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Light background with dark text</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "light"}
                  onChange={() => theme !== "light" && toggleTheme()}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-300 dark:border-gray-600 rounded-md">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-md bg-gray-800 border border-gray-700 mr-3"></div>
                  <div>
                    <p className="font-medium">Dark Mode</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Dark background with light text</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="theme"
                  checked={theme === "dark"}
                  onChange={() => theme !== "dark" && toggleTheme()}
                  className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary dark:focus:ring-primary dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Font Size</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm">A</span>
                <input
                  type="range"
                  min="1"
                  max="3"
                  defaultValue="2"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <span className="text-lg">A</span>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0">
          <div className="bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-medium">Settings</h3>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "profile" ? "bg-primary text-white" : "hover:bg-[#9089d0] dark:hover:bg-[#e3e0ff]"
                }`}
              >
                <User size={18} className="mr-2" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "security" ? "bg-primary text-white" : "hover:bg-[#9089d0] dark:hover:bg-[#9089d0]"
                }`}
              >
                <Lock size={18} className="mr-2" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "notifications" ? "bg-primary text-white" : "hover:bg-[#9089d0] dark:hover:bg-gray-700"
                }`}
              >
                <Bell size={18} className="mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab("appearance")}
                className={`flex items-center w-full px-3 py-2 rounded-md text-left ${
                  activeTab === "appearance" ? "bg-primary text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <Globe size={18} className="mr-2" />
                Appearance
              </button>
            </nav>
          </div>
        </div>

        <div className="flex-1 bg-white dark:bg-dark-card rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default Settings

