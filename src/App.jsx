import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router";

// Components
import HomePage from "./HomePage.jsx";
import SidebarLayout from "./SidebarLayout.jsx"; // Like SecHome
import BubbleSort from "./BubbleSort.jsx";
import MergeSort from "./MergeSort.jsx";
import BinarySearch from "./BinarySearch.jsx";
import InsertionSort from "./InsertionSort.jsx"; // Assuming you have this component
import SelectionSort from "./SelectionSort.jsx"; // Assuming you have this component
import LinearSearch from "./LinearSearch.jsx";
import BFS from "./BFS.jsx";
import DFS from "./DFS.jsx";
import Stack from "./Stack.jsx"; // Assuming you have this component
import Queue from "./Queue.jsx"; // Assuming you have this component\
import LinkedList from "./LinkedList.jsx"; 
import BST from "./BST.jsx"
import BinaryTree from "./BinaryTree.jsx"
import RedBlackTree from "./RedBlackTree.jsx"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Homepage */}
          <Route path="/" element={<HomePage />} />

          {/* Visualizer Layout with Sidebar (like SecHome) */}
          <Route element={<SidebarLayout />}>
            <Route path="/sorting/bubble" element={<BubbleSort />} />
            <Route path="/sorting/merge" element={<MergeSort />} />
            <Route path="/sorting/insertion" element={<InsertionSort />} />
            <Route path="/sorting/selection" element={<SelectionSort />} />
            <Route path="/searching/binary" element={<BinarySearch />} />
            <Route path="/searching/linear" element={<LinearSearch />} />
            <Route path="/searching/bfs" element={<BFS />} />
            <Route path="/searching/dfs" element={<DFS />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/linkedlist" element={<LinkedList />} />
            <Route path="/tree/bst" element={<BST />} />
            <Route path="/tree/binarytree" element={<BinaryTree />} />
            <Route path="/tree/redblacktree" element={<RedBlackTree />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
