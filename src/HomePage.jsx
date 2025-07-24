import React, { useState } from "react";
import { Link } from "react-router";  // Changed from "react-router" to "react-router-dom"
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const [visibleCategory, setVisibleCategory] = useState("");
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  const handleCategoryClick = (category) => {
    if (visibleCategory) {
      // Trigger exit animation
      setShouldAnimate(false);
      setTimeout(() => {
        setVisibleCategory(category);
        setShouldAnimate(true);
      }, 300); // match duration of exit animation (0.3s)
    } else {
      setVisibleCategory(category);
      setShouldAnimate(true);
    }
  };

  const sortingAlgos = [
    { name: "Bubble Sort", path: "/sorting/bubble" },
    { name: "Merge Sort", path: "/sorting/merge" },
    { name: "Insertion Sort", path: "/sorting/insertion" },
    { name: "Selection Sort", path: "/sorting/selection" }
  ];

  const searchingAlgos = [
    { name: "Binary Search", path: "/searching/binary" },
    { name: "Linear Search", path: "/searching/linear" },
    { name: "Breadth First Search", path: "/searching/bfs" },
    { name: "Depth First Search", path: "/searching/dfs" }
  ];

  const treeAlgos = [
    { name: "Binary Search Tree", path: "/tree/bst" },
    { name: "Binary Tree", path: "/tree/binarytree" },
    { name: "Red Black Tree", path: "/tree/redblacktree" }
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-6 background fade-delay">
      <header className="text-center mb-10">
      <h1 className="text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 drop-shadow-lg animate-fade-in">
  SORTSIGHT
</h1>
        <h2 className="text-3xl font-bold mb-4">A Data Structures Visualizer</h2>
        <p className="text-lg text-gray-300 max-w-3xl mx-auto">
          An interactive tool for learning and understanding data structures through
          animated visualizations and step-by-step operations.
        </p>
      </header>

      <div className="flex justify-center gap-6 mb-10 flex-wrap max-w-[60%]">
        <button
          onClick={() => handleCategoryClick("sorting")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
        >
          Sorting
        </button>
        <button
          onClick={() => handleCategoryClick("searching")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
        >
          Searching
        </button>
        <button
          onClick={() => handleCategoryClick("tree")}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer"
        >
          Tree Data Structure
        </button>
        <Link to={"/stack"}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer">
            Stack Data Structure
          </button>
        </Link>
        <Link to={"/queue"}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer">
            Queue Data Structure
          </button>
        </Link>
        <Link to={"/linkedlist"}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg cursor-pointer">
            Linked List Data Structure
          </button>
        </Link>
      </div>

      <div className="max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {shouldAnimate && visibleCategory && (
            <motion.div
              key={visibleCategory}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-center capitalize">
                {visibleCategory} Algorithms
              </h2>
              <div className="flex gap-10 justify-center">
                {(visibleCategory === "sorting"
                  ? sortingAlgos
                  : visibleCategory === "searching"
                  ? searchingAlgos
                  : treeAlgos
                ).map((algo, index) => (
                  <Link to={algo.path} key={index}>
                    <div className="bg-white text-gray-800 p-4 rounded-xl shadow cursor-pointer hover:scale-105 transition-transform text-center font-medium text-lg">
                      {algo.name}
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <footer className="mt-10 text-center text-gray-400">
        <p className="mb-2">&copy; {new Date().getFullYear()} Data Structures Visualizer</p>
        <p className="mb-2">Created by Harsh Soni</p>
        <a href="https://github.com/HarshSoni1801/DSA_Visualizer" target="_blank" className="font-bold">Github Link</a>
      </footer>
    </div>
  );
};

export default HomePage;