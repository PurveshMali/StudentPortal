"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "../context/ThemeContext"
import { X } from "lucide-react"

const Modal = ({ isOpen, onClose, title, children, footer, size = "medium" }) => {
  const { theme } = useTheme()
  const modalRef = useRef(null)

  const sizeClasses = {
    small: "max-w-md",
    medium: "max-w-lg",
    large: "max-w-2xl",
    xlarge: "max-w-4xl",
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div
        ref={modalRef}
        className={`w-full ${sizeClasses[size]} ${
          theme === "dark" ? "bg-dark-card text-primary-foreground" : "bg-white text-gray-800"
        } rounded-lg shadow-lg overflow-hidden`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">{children}</div>

        {footer && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">{footer}</div>
        )}
      </div>
    </div>
  )
}

export default Modal

