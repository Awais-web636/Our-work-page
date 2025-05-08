"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronDown } from "lucide-react"

export default function NavHeader() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [openMobileMenu, setOpenMobileMenu] = useState(false)
  const mobileMenuRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = (menu: string) => {
    if (openDropdown === menu) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(menu)
    }
  }

  const toggleMobileMenu = () => {
    setOpenMobileMenu((prev) => !prev)
  }

  // Close the mobile menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setOpenMobileMenu(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <header className="w-full py-4 px-6 md:px-12 flex items-center justify-between bg-[#FFFFFF] shadow-sm">
      {/* Logo */}
      <Link href="/" className="text-3xl font-bold text-purple-600">
        navpatra
      </Link>

      {/* Desktop Navigation */}
      <nav className={`hidden md:flex items-center space-x-8`}>
        <Link href="/" className="text-base text-black font-medium hover:text-purple-600 transition-colors">
          Home
        </Link>

        {/* Website Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-black text-base font-medium hover:text-purple-600 transition-colors"
            onClick={() => toggleDropdown("website")}
          >
            Website <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {openDropdown === "website" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <Link href="/website/design" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Website Design
              </Link>
              <Link href="/website/development" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Website Development
              </Link>
            </div>
          )}
        </div>

        {/* Digital Marketing Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-black text-base font-medium hover:text-purple-600 transition-colors"
            onClick={() => toggleDropdown("marketing")}
          >
            Digital Marketing <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {openDropdown === "marketing" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <Link href="/marketing/seo" className="block px-4 py-2 hover:bg-gray-100 text-black">
                SEO
              </Link>
              <Link href="/marketing/social" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Social Media
              </Link>
              <Link href="/marketing/ppc" className="block px-4 py-2 hover:bg-gray-100 text-black">
                PPC
              </Link>
            </div>
          )}
        </div>

        {/* Our Story Dropdown */}
        <div className="relative">
          <button
            className="flex items-center text-base font-medium hover:text-purple-600 transition-colors text-black"
            onClick={() => toggleDropdown("story")}
          >
            Our Story <ChevronDown className="ml-1 h-4 w-4" />
          </button>
          {openDropdown === "story" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10">
              <Link href="/about" className="block px-4 py-2 hover:bg-gray-100 text-black">
                About Us
              </Link>
              <Link href="/team" className="block px-4 py-2 hover:bg-gray-100 text-black">
                Our Team
              </Link>
            </div>
          )}
        </div>

        <Link href="/work" className="text-base font-medium text-red-500 hover:text-red-600 transition-colors text-black">
          Our Work
        </Link>

        <Link href="/careers" className="text-base font-medium hover:text-purple-600 transition-colors text-black">
          Careers
        </Link>

        <Link href="/blog" className="text-base font-medium hover:text-purple-600 transition-colors text-black">
          Blog
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={toggleMobileMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Mobile Navigation */}
      {openMobileMenu && (
        <div
          ref={mobileMenuRef}
          className="md:hidden absolute top-0 left-0 right-0 bg-white shadow-lg rounded-b-md z-20"
        >
          <div className="flex flex-col items-start space-y-4 py-4 px-6">
            {/* Close Button */}
            <button
              className="self-end text-2xl font-bold"
              onClick={() => setOpenMobileMenu(false)}
            >
              &times; {/* "X" close button */}
            </button>

            <Link href="/" className="text-lg text-red-500 font-medium hover:text-purple-600 transition-colors text-black">
              Home
            </Link>
            <div className="relative">
              <button
                className="flex items-center text-lg font-medium hover:text-purple-600 transition-colors text-black"
                onClick={() => toggleDropdown("website")}
              >
                Website <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openDropdown === "website" && (
                <div className="flex flex-col space-y-2 mt-2 w-full">
                  <Link href="/website/design" className="px-4 py-2 hover:bg-gray-100 text-black">
                    Website Design
                  </Link>
                  <Link href="/website/development" className="px-4 py-2 hover:bg-gray-100 text-black">
                    Website Development
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center text-lg font-medium hover:text-purple-600 transition-colors text-black"
                onClick={() => toggleDropdown("marketing")}
              >
                Digital Marketing <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openDropdown === "marketing" && (
                <div className="flex flex-col space-y-2 mt-2 w-full">
                  <Link href="/marketing/seo" className="px-4 py-2 hover:bg-gray-100 text-black">
                    SEO
                  </Link>
                  <Link href="/marketing/social" className="px-4 py-2 hover:bg-gray-100 text-black">
                    Social Media
                  </Link>
                  <Link href="/marketing/ppc" className="px-4 py-2 hover:bg-gray-100 text-black">
                    PPC
                  </Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                className="flex items-center text-lg font-medium hover:text-purple-600 transition-colors text-black"
                onClick={() => toggleDropdown("story")}
              >
                Our Story <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {openDropdown === "story" && (
                <div className="flex flex-col space-y-2 mt-2 w-full">
                  <Link href="/about" className="px-4 py-2 hover:bg-gray-100 text-black">
                    About Us
                  </Link>
                  <Link href="/team" className="px-4 py-2 hover:bg-gray-100 text-black">
                    Our Team
                  </Link>
                </div>
              )}
            </div>
            <Link href="/work" className="text-lg font-medium text-red-500 hover:text-red-600 transition-colors text-black">
              Our Work
            </Link>
            <Link href="/careers" className="text-lg font-medium hover:text-purple-600 transition-colors text-black">
              Careers
            </Link>
            <Link href="/blog" className="text-lg font-medium hover:text-purple-600 transition-colors text-black">
              Blog
            </Link>
            <Link
              href="/contact"
              className="mt-4 bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-full transition-colors text-black"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      )}

      {/* Desktop Contact Button */}
      <Link
        href="/contact"
        className="hidden md:block bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-3 rounded-full transition-colors"
      >
        Get In Touch
      </Link>
    </header>
  )
}
