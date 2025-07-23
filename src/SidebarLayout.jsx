import { Link, useLocation, Outlet } from "react-router"; 
import { useState } from "react";

export default function SidebarLayout() {
  const [openMenu, setOpenMenu] = useState(["sorting", "searching", "tree"]);
  const location = useLocation();

  const toggleMenu = (menu) => {setOpenMenu((prev) =>prev.includes(menu)? prev.filter((m) => m !== menu): [...prev, menu]);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex fade-delay">
      {/* Sidebar */}
      <div className="w-64 min-h-screen text-white p-4 bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center">Visualizer</h2>

        {/* Sorting Menu */}
        <div>
          <Link to={"/"}>
            <div className="hover:bg-gray-700 p-2 rounded flex items-end">
                <span className='text-[35px]'>&#8678;</span>
                <button className="cursor-pointer font-bold hover:bg-gray-700 p-2 text-xl">
                    Home
                </button>
            </div>
          </Link>
          <button
            onClick={() => toggleMenu("sorting")}
            className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Sorting
          </button>
          {openMenu.includes("sorting") && (
            <ul className="ml-4 mt-2 space-y-1">
              <li>
                <Link
                  to="/sorting/bubble"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/sorting/bubble") ? "bg-gray-700" : ""
                  }`}
                >
                  Bubble Sort
                </Link>
              </li>
              <li>
                <Link
                  to="/sorting/merge"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/sorting/merge") ? "bg-gray-700" : ""
                  }`}
                >
                  Merge Sort
                </Link>
              </li>
              <li>
                <Link
                  to="/sorting/insertion"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/sorting/insertion") ? "bg-gray-700" : ""
                  }`}
                >
                  Insertion Sort
                </Link>
              </li>
              <li>
                <Link
                  to="/sorting/selection"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/sorting/selection") ? "bg-gray-700" : ""
                  }`}
                >
                  Selection Sort
                </Link>
              </li>
            </ul>
          )}
        </div>

        {/* Searching Menu */}
        <div className="mt-2">
          <button
            onClick={() => toggleMenu("searching")}
            className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Searching
          </button>
          {openMenu.includes("searching") && (
            <ul className="ml-4 mt-2 space-y-1">
              <li>
                <Link
                  to="/searching/binary"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/searching/binary") ? "bg-gray-700" : ""
                  }`}
                >
                  Binary Search
                </Link>
              </li>
              <li>
                <Link
                  to="/searching/linear"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/searching/linear") ? "bg-gray-700" : ""
                  }`}
                >
                  Linear Search
                </Link>
              </li>
              <li>
                <Link
                  to="/searching/dfs"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/searching/dfs") ? "bg-gray-700" : ""
                  }`}
                >
                  Depth-First Search
                </Link>
              </li>
              <li>
                <Link
                  to="/searching/bfs"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/searching/bfs") ? "bg-gray-700" : ""
                  }`}
                >
                  Breadth-First Search
                </Link>
              </li>
            </ul>
          )}
        </div>
        <div className="mt-2">
          <Link
            to="/stack"
            className={`block rounded hover:bg-gray-700 ${
              isActive("/searching/stack") ? "bg-gray-700" : ""
            }`}>
            <button
              className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              Stack
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <Link
            to="/queue"
            className={`block rounded hover:bg-gray-700 ${
              isActive("/searching/queue") ? "bg-gray-700" : ""
            }`}>
            <button
              className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              Queue
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <Link
            to="/linkedlist"
            className={`block rounded hover:bg-gray-700 ${
              isActive("/searching/linkedlist") ? "bg-gray-700" : ""
            }`}>
            <button
              className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
            >
              Linked List
            </button>
          </Link>
        </div>
        <div className="mt-2">
          <button
            onClick={() => toggleMenu("tree")}
            className="w-full text-left font-semibold hover:bg-gray-700 p-2 rounded cursor-pointer"
          >
            Trees
          </button>
          {openMenu.includes("tree") && (
            <ul className="ml-4 mt-2 space-y-1">
              <li>
                <Link
                  to="/tree/binarytree"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/tree/binarytree") ? "bg-gray-700" : ""
                  }`}
                >
                  Binary Tree
                </Link>
              </li>
              <li>
                <Link
                  to="/tree/bst"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/tree/bst") ? "bg-gray-700" : ""
                  }`}
                >
                  Binary Search Tree
                </Link>
              </li>
              <li>
                <Link
                  to="/tree/redblacktree"
                  className={`block px-2 py-1 rounded hover:bg-gray-700 ${
                    isActive("/tree/redblacktree") ? "bg-gray-700" : ""
                  }`}
                >
                  Red-Black Tree
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {/* Render child route here */}
      <div className="flex-1 p-10 bg-[#232323]">
        <Outlet />
      </div>
    </div>
  );
}
