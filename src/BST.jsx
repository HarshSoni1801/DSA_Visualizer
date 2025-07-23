import React from "react";

export default function BinarySearchTree() {
  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Binary Search Tree Visualization</h1>

      {/* Visualization Placeholder */}
      <div className="flex justify-center items-center h-[300px] bg-gray-800 rounded-lg shadow-lg mb-16">
        <span className="text-2xl text-gray-200 pulse font-semibold text-center">
          Visualization will soon be implemented, thank you for your patience...
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-20 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Binary Search Tree</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">Definition:</h3>
              <p className="text-base text-gray-200">
                A Binary Search Tree (BST) is a binary tree in which each node contains a value greater than all values in its left subtree and less than those in its right subtree.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Operations:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Insert a node while preserving BST property.</li>
                <li>Search for a value efficiently.</li>
                <li>Inorder traversal gives sorted values.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Time Complexity (Average Case):</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Search: <span className="font-mono text-green-400">O(log n)</span></li>
                <li>Insert/Delete: <span className="font-mono text-green-400">O(log n)</span></li>
              </ul>
              <p className="text-sm text-gray-400 mt-1">* Worst case: <span className="text-red-400 font-mono">O(n)</span> (if unbalanced)</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">O(n)</p>
            </div>

            <div>
              <a
                href="https://www.geeksforgeeks.org/binary-search-tree-data-structure/"
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
            <h3 className="text-xl font-semibold mb-2">C++ Code (Insertion):</h3>
            <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
<code>{`struct Node {
  int data;
  Node* left;
  Node* right;
  Node(int val) {
    data = val;
    left = right = nullptr;
  }
};

Node* insert(Node* root, int key) {
  if (!root) return new Node(key);
  if (key < root->data)
    root->left = insert(root->left, key);
  else
    root->right = insert(root->right, key);
  return root;
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
