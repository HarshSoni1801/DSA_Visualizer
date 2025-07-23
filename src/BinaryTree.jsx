import React from "react";

export default function BinaryTree() {
  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Binary Tree Visualization</h1>

      {/* Visualization Placeholder */}
      <div className="flex justify-center items-center h-[300px] bg-gray-800 rounded-lg shadow-lg mb-16">
        <span className="text-2xl text-gray-200 font-semibold pulse">Visualization will soon be implemented, thank you for your patience...</span>
      </div>

      {/* Info Section */}
      <div className="mt-20 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Binary Tree</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Algorithm Description */}
          <div className="space-y-10">
            {/* What is a Binary Tree? */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Definition:</h3>
              <p className="text-base text-gray-200">
                A Binary Tree is a hierarchical data structure in which each node has at most two children, referred to as the left and right child. It is the foundation of many tree-based structures like Binary Search Trees, Heaps, and Huffman Trees.
              </p>
            </div>

            {/* Algorithm Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Basic Operations:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Insert a node at the correct position.</li>
                <li>Traverse the tree (Inorder, Preorder, Postorder).</li>
                <li>Search for a node in the tree.</li>
                <li>Delete a node while maintaining tree structure.</li>
              </ul>
            </div>

            {/* Time Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Time Complexity (Average Case):</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Search: <span className="font-mono text-green-400">O(log n)</span></li>
                <li>Insert: <span className="font-mono text-green-400">O(log n)</span></li>
                <li>Delete: <span className="font-mono text-green-400">O(log n)</span></li>
              </ul>
              <p className="text-sm text-gray-400 mt-1">* Worst case: <span className="text-red-400 font-mono">O(n)</span> (when tree becomes skewed)</p>
            </div>

            {/* Space Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">O(n) – For storing n nodes.</p>
            </div>

            {/* Learn More */}
            <div>
              <a
                href="https://www.geeksforgeeks.org/binary-tree-data-structure/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 underline font-semibold transition-colors duration-200"
              >
                Learn more →
              </a>
            </div>
          </div>

          {/* Right Column: C++ Code */}
          <div>
            <h3 className="text-xl font-semibold mb-2">C++ Code (Structure):</h3>
            <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
<code>{`struct Node {
  int data;
  Node* left;
  Node* right;

  Node(int val) {
    data = val;
    left = right = nullptr;
  }
};`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
