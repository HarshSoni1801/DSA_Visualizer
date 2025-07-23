import React from "react";

export default function RedBlackTree() {
  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Red-Black Tree Visualization</h1>

      {/* Visualization Placeholder */}
      <div className="flex justify-center items-center h-[300px] bg-gray-800 rounded-lg shadow-lg mb-16">
        <span className="text-2xl text-gray-200 pulse font-semibold text-center">
          Visualization will soon be implemented, thank you for your patience...
        </span>
      </div>

      {/* Info Section */}
      <div className="mt-20 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Red-Black Tree</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">Definition:</h3>
              <p className="text-base text-gray-200">
                A Red-Black Tree is a self-balancing Binary Search Tree where each node contains an extra bit for color (red or black) to ensure the tree remains balanced during insertions and deletions.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Properties:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Every node is either red or black.</li>
                <li>Root is always black.</li>
                <li>No two red nodes can be adjacent.</li>
                <li>Every path from root to leaf has same number of black nodes.</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Search: <span className="font-mono text-green-400">O(log n)</span></li>
                <li>Insert/Delete: <span className="font-mono text-green-400">O(log n)</span></li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">O(n)</p>
            </div>

            <div>
              <a
                href="https://www.geeksforgeeks.org/red-black-tree-in-data-structure/"
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
            <h3 className="text-xl font-semibold mb-2">C++ Code (Node Structure):</h3>
            <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
<code>{`enum Color { RED, BLACK };

struct Node {
  int data;
  bool color;
  Node *left, *right, *parent;

  Node(int data) : data(data) {
    parent = left = right = nullptr;
    color = RED;
  }
};`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
