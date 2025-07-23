import React, { useState } from 'react';

const Stack = () => {
  const [stack, setStack] = useState([1,2]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('bg-blue-100 text-blue-800');

  const pushOperation = () => {
   if (stack.length === 6) {
      setMessage('Warning: Size limited to 6');
      setMessageVariant('bg-red-100 text-red-800');
      return;
    }
    if (!inputValue.trim()) {
      setMessage('Please enter a value to push');
      setMessageVariant('bg-red-100 text-red-800');
      return;
    }
    
    setStack([...stack, inputValue]);
    setInputValue('');
    setMessage(`Pushed "${inputValue}" to stack`);
    setMessageVariant('bg-green-100 text-green-800');
  };

  const popOperation = () => {
    if (stack.length === 0) {
      setMessage('Stack underflow');
      setMessageVariant('bg-red-100 text-red-800');
      return;
    }
    
    const poppedItem = stack[stack.length - 1];
    setStack(stack.slice(0, -1));
    setMessage(`Popped "${poppedItem}" from stack`);
    setMessageVariant('bg-yellow-100 text-yellow-800');
  };

  const peekOperation = () => {
    if (stack.length === 0) {
      setMessage('Stack is empty');
      setMessageVariant('bg-blue-100 text-blue-800');
      return;
    }
    
    setMessage(`Top element is "${stack[stack.length - 1]}"`);
    setMessageVariant('bg-blue-100 text-blue-800');
  };

  const resetStack = () => {
    setStack([]);
    setMessage('Stack has been reset');
    setMessageVariant('bg-indigo-100 text-indigo-800');
  };

  const isEmpty = () => {
    setMessage(stack.length === 0 ? 'Stack is empty' : 'Stack is not empty');
    setMessageVariant('bg-blue-100 text-blue-800');
  };

  // Tailwind color variants mapping
  const variantClasses = {
    'push': 'bg-green-100 text-green-800',
    'pop': 'bg-yellow-100 text-yellow-800',
    'error': 'bg-red-100 text-red-800',
    'info': 'bg-blue-100 text-blue-800',
    'reset': 'bg-indigo-100 text-indigo-800'
  };

  return (
    <div className="w-full text-white fade-delay">
            <h1 className="text-5xl font-bold mb-10">Stack Data Structure  Visualization</h1>
      <div className="flex flex-col gap-6">
        {/* Stack Visualization */}
        <div className="flex flex-col md:flex-row gap-50 p-10 px-50 items-center">
            {/* Stack Visualization - takes 1/5 width on medium+ screens */}
            <div className="bg-gray-900 w-full md:w-1/3 text-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-4 flex justify-center align-centre">
                  <h2 className="text-2xl font-semibold text-center">Stack</h2>
                  </div>
                  <div className="p-4">
                  <div className="h-90 rounded-md p-4 flex flex-col-reverse items-center bg-gray-800">
                     {stack.length === 0 ? (
                        <div className="italic py-8">Empty</div>
                     ) : (
                        stack.map((item, index) => (
                        <div 
                           key={index}
                           className={`w-4/5 py-3 px-4 mb-2 text-center rounded-md text-white relative transition-all duration-200
                              ${index === stack.length - 1 
                              ? 'bg-emerald-600 hover:bg-emerald-700 scale-105' 
                              : 'bg-blue-600 hover:bg-blue-700'}`}
                        >
                           {item}
                           {index === stack.length - 1 && (
                              <span className="absolute right-0 translate-x-8 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                              TOP
                              </span>
                           )}
                        </div>
                        ))
                     )}
                  </div>
                  
                  {message && (
                     <div className={`mt-4 p-3 rounded-md ${messageVariant}`}>
                        {message}
                     </div>
                  )}
                  </div>
            </div>

            {/* Controls Section - takes remaining space */}
            <div className="flex flex-col gap-2 w-1/5">
                  <div className='flex justify-between items-center gap-2'>
                        <button 
                        onClick={pushOperation}
                        className="cursor-pointer px-4 py-2 bg-blue-600 w-1/2 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                     Push
                     </button>
                     <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="value"
                        className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                     />
                  </div>
                  
                  <button 
                  onClick={popOperation}
                  className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                  Pop
                  </button>
                  <button 
                  onClick={peekOperation}
                  className="cursor-pointer px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                  Peek
                  </button>
                  <button 
                  onClick={isEmpty}
                  className="cursor-pointer px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                  Is Empty?
                  </button>
                  <button 
                  onClick={resetStack}
                  className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                  Reset
                  </button>
            </div>
         </div>
        
         {/* Algorithm information */}
         <div className="mt-20 px-6 md:px-2 text-white max-w-6xl mx-auto">
         <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
            About Stack Data Structure
         </h2>
         <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
            <div className="space-y-15">
               {/* Algorithm Steps */}
               <div>
               <h3 className="text-xl font-semibold mb-2">Features:</h3>
               <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                  <li>Follows Last-In-First-Out (LIFO) principle</li>
                  <li>Elements are added and removed from the same end (top)</li>
                  <li>Uses push operation to add elements to the top</li>
                  <li>Uses pop operation to remove elements from the top</li>
                  <li>Peek operation examines the top element without removal</li>
                  <li>Essential for function calls, expression evaluation, and undo mechanisms</li>
               </ul>
               </div>

               {/* Time Complexity */}
               <div>
               <h3 className="text-xl font-semibold">Time Complexity:</h3>
               <ul className="list-disc pl-6 text-gray-200">
                  <li>
                     Push: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>
                     Pop: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>
                     Peek: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>All operations are constant time</li>
               </ul>
               </div>

               {/* Space Complexity */}
               <div>
               <h3 className="text-xl font-semibold">Space Complexity:</h3>
               <p className="text-base text-gray-200">
                  O(n) – Where n is the number of elements stored in the stack
               </p>
               </div>

               {/* Learn More */}
               <div>
               <a
                  href="https://www.geeksforgeeks.org/stack-data-structure/"
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
               <h3 className="text-xl font-semibold mb-2">C++ Code:</h3>
               <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
               <code>{`#include <iostream>
   #include <stack>
   using namespace std;

   int main() {
      stack<int> s;
      
      // Push elements
      s.push(10);
      s.push(20);
      s.push(30);
      
      // Check top element
      cout << "Top element: " << s.top() << endl;
      
      // Pop element
      s.pop();
      cout << "Top after pop: " << s.top() << endl;
      
      // Check if empty
      if (s.empty()) {
         cout << "Stack is empty" << endl;
      } else {
         cout << "Stack is not empty" << endl;
      }
      
      // Get size
      cout << "Stack size: " << s.size() << endl;
      
      return 0;
   }

   /* Output:
   Top element: 30
   Top after pop: 20
   Stack is not empty
   Stack size: 2
   */`}</code>
               </pre>
            </div>
         </div>
         </div>
      </div>
    </div>
  );
};

export default Stack;