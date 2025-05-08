'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  title: string;
}

interface Project {
  title: string;
  link: string;
  description: string;
  shortDescription: string;
  category: Category;
  coverImage: string;
}

export default function Page() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://axiom-backend-phi.vercel.app/api/v1/web/projects');
        if (!response.ok) throw new Error(`Failed to fetch Projects: ${response.statusText}`);

        const data = await response.json();
        const fetchedProjects: Project[] = data.data || [];

        setProjects(fetchedProjects);

        const uniqueCategories = Array.from(
          new Set(
            fetchedProjects
              .map((project) => project.category?.title)
              .filter((title): title is string => !!title)
          )
        );
        setCategories(["All", ...uniqueCategories]);
        setFilteredProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching Projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);

    const filtered = category === "All"
      ? projects
      : projects.filter((project) => project.category?.title === category);

    setFilteredProjects(filtered);
  };

  return (
    <div className='bg-white'>
      <main className="px-4 md:px-8 lg:px-16 py-8">
        <h2 className="text-2xl font-bold text-purple-600 text-center mb-8">Websites</h2>

        {/* Category Filter */}
        <div className="flex justify-center space-x-6 mb-8 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-3 py-1 text-sm sm:text-base font-semibold transition-colors duration-300
                ${selectedCategory === category ? "bg-orange-700 text-white" : "bg-gray-200 text-black"}
                hover:bg-orange-500 hover:text-white rounded mb-2`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Cards */}
        {filteredProjects.length === 0 ? (
          <p className="text-center text-gray-500">No projects found for this category.</p>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
            <AnimatePresence mode="wait">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title + index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="mb-12 break-inside-avoid"
                >
                  <div
                    onClick={() => {
                      setActiveIndex(index);
                      setIsModalOpen(true);
                    }}
                    className="group relative overflow-hidden border-4 border-blue-600 shadow-lg hover:shadow-xl transition cursor-pointer"
                  >
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="object-cover w-full transform transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    />

                    {/* Centered Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-75 transition-opacity duration-500">
                      <h3 className="text-xl md:text-2xl font-bold text-white text-center px-4">{project.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* Modal View */}
      {isModalOpen && activeIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>

          {/* Left Arrow */}
          <button
            className="absolute left-4 text-white text-4xl px-2"
            onClick={() => setActiveIndex((prev) => (prev! > 0 ? prev! - 1 : prev))}
          >
            &#8592;
          </button>

          {/* Full Image */}
          <img
            src={filteredProjects[activeIndex].coverImage}
            alt={filteredProjects[activeIndex].title}
            className="max-w-[90vw] max-h-[80vh] object-contain"
          />

          {/* Right Arrow */}
          <button
            className="absolute right-4 text-white text-4xl px-2"
            onClick={() =>
              setActiveIndex((prev) => (prev! < filteredProjects.length - 1 ? prev! + 1 : prev))
            }
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
}
