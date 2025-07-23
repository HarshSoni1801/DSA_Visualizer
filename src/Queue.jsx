import React, { useState } from 'react';

const Queue = () => {
  const [queue, setQueue] = useState([1,2]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('bg-blue-100 text-blue-800');
  const [maxSize] = useState(8); // Maximum queue size

  const enqueueOperation = () => {
    if (!inputValue.trim()) {
      setMessage('Please enter a value to enqueue');
      setMessageVariant('bg-red-100 text-red-800');
      return;
    }
    
    setQueue([...queue, inputValue]);
    setInputValue('');
    setMessage(`Enqueued "${inputValue}" to queue`);
    setMessageVariant('bg-green-100 text-green-800');
  };

  const dequeueOperation = () => {
    if (queue.length === 0) {
      setMessage('Queue underflow');
      setMessageVariant('bg-red-100 text-red-800');
      return;
    }
    
    const dequeuedItem = queue[0];
    setQueue(queue.slice(1));
    setMessage(`Dequeued "${dequeuedItem}" from queue`);
    setMessageVariant('bg-yellow-100 text-yellow-800');
  };

  const peekFrontOperation = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty');
      setMessageVariant('bg-blue-100 text-blue-800');
      return;
    }
    
    setMessage(`Front element is "${queue[0]}"`);
    setMessageVariant('bg-blue-100 text-blue-800');
  };

  const peekRearOperation = () => {
    if (queue.length === 0) {
      setMessage('Queue is empty');
      setMessageVariant('bg-blue-100 text-blue-800');
      return;
    }
    
    setMessage(`Rear element is "${queue[queue.length - 1]}"`);
    setMessageVariant('bg-blue-100 text-blue-800');
  };

  const resetQueue = () => {
    setQueue([]);
    setMessage('Queue has been reset');
    setMessageVariant('bg-indigo-100 text-indigo-800');
  };

  const isEmpty = () => {
    setMessage(queue.length === 0 ? 'Queue is empty' : 'Queue is not empty');
    setMessageVariant('bg-blue-100 text-blue-800');
  };

  return (
    <div className="w-full text-white fade-delay">
      <h1 className="text-5xl font-bold mb-10">Queue Data Structure Visualization</h1>
      <div className="flex flex-col gap-6">
        {/* Queue Visualization */}
        <div className="flex flex-col w-full gap-30 p-10 px-20 items-center">
          {/* Queue Visualization - takes 1/3 width on medium+ screens */}
          <div className="bg-gray-900 w-1/2 text-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 flex justify-center align-centre">
              <h2 className="text-2xl font-semibold text-center">Queue</h2>
            </div>
            <div className="p-4">
              <div className=" w-full rounded-md p-4 flex items-center bg-gray-800">
                {queue.length === 0 ? (
                  <div className="italic py-3 w-full text-center">Empty</div>
                ) : (
                  <div className="w-full flex items-end gap-2">
                    {queue.map((item, index) => (
                      <div 
                        key={index}
                        className={`w-20 py-3 px-2 text-center rounded-md text-white relative transition-all duration-200
                          ${index === 0 
                            ? 'bg-red-600 hover:bg-red-700' // Front pointer
                            : index === queue.length - 1
                            ? 'bg-emerald-600 hover:bg-emerald-700' // Rear pointer
                            : 'bg-blue-600 hover:bg-blue-700'}`}
                      >
                        {item}
                        {
                          index===0 && queue.length==1 &&(
                            <div >
                              <span className="whitespace-nowrap absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                                FRONT, REAR
                              </span>      
                              {/* <span className="absolute -top-13 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                                REAR
                              </span> */}
                            </div>
                            )
                        }
                        {index === 0 && queue.length>1 &&(
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                            FRONT
                          </span>
                        )}
                        {index === queue.length - 1 && queue.length>1&& (
                          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                            REAR
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
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
          <div className="flex gap-5 justify-center">
               {/* Enqueue Button */}
               <button 
                  onClick={enqueueOperation}
                  className=" px-5 py-3 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
               >
                  Enqueue
               </button>
               {/* Input Field */}
               <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="value"
                  className=" px-5 py-3 min-w-[30px] max-w-[7rem] rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
               {/* Other Buttons */}
               <button 
                  onClick={dequeueOperation}
                  className=" px-5 py-3 cursor-pointer min-w-[30px] bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
               >
                  Dequeue
               </button>
               <button 
                  onClick={peekFrontOperation}
                  className=" px-5 py-3  cursor-pointermin-w-[30px] bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
               >
                  Peek Front
               </button>
               <button 
                  onClick={peekRearOperation}
                  className=" px-5 py-3 cursor-pointer min-w-[30px] bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
               >
                  Peek Rear
               </button>
               <button 
                  onClick={isEmpty}
                  className=" px-10 py-2 cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
               >
                  Is Empty?
               </button>
               <button 
                  onClick={resetQueue}
                  className=" px-10 py-2 cursor-pointer bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
               >
                  Reset
               </button>
         </div>

        </div>
        
        {/* Algorithm information */}
        <div className="mt-20 px-6 md:px-2 text-white max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
            About Queue Data Structure
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
            <div className="space-y-15">
              {/* Algorithm Steps */}
              <div>
                <h3 className="text-xl font-semibold mb-2">Features:</h3>
                <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                  <li>Follows First-In-First-Out (FIFO) principle</li>
                  <li>Elements are added at the rear and removed from the front</li>
                  <li>Uses enqueue operation to add elements to the rear</li>
                  <li>Uses dequeue operation to remove elements from the front</li>
                  <li>Peek operations examine elements without removal</li>
                  <li>Essential for task scheduling, buffering, and BFS algorithms</li>
                </ul>
              </div>

              {/* Time Complexity */}
              <div>
                <h3 className="text-xl font-semibold">Time Complexity:</h3>
                <ul className="list-disc pl-6 text-gray-200">
                  <li>
                    Enqueue: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>
                    Dequeue: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>
                    Peek: <span className="font-mono text-yellow-400">O(1)</span>
                  </li>
                  <li>All operations are constant time in ideal implementation</li>
                </ul>
              </div>

              {/* Space Complexity */}
              <div>
                <h3 className="text-xl font-semibold">Space Complexity:</h3>
                <p className="text-base text-gray-200">
                  O(n) – Where n is the number of elements stored in the queue
                </p>
              </div>

              {/* Learn More */}
              <div>
                <a
                  href="https://www.geeksforgeeks.org/queue-data-structure/"
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
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    
    // Enqueue elements
    q.push(10);
    q.push(20);
    q.push(30);
    
    // Check front element
    cout << "Front element: " << q.front() << endl;
    
    // Check rear element
    cout << "Rear element: " << q.back() << endl;
    
    // Dequeue element
    q.pop();
    cout << "Front after dequeue: " << q.front() << endl;
    
    // Check if empty
    if (q.empty()) {
        cout << "Queue is empty" << endl;
    } else {
        cout << "Queue is not empty" << endl;
    }
    
    // Get size
    cout << "Queue size: " << q.size() << endl;
    
    return 0;
}

/* Output:
Front element: 10
Rear element: 30
Front after dequeue: 20
Queue is not empty
Queue size: 2
*/`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Queue;