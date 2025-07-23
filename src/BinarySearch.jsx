import { useState, useEffect, useRef } from "react";

export default function BinarySearch() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(6);
  const [searching, setSearching] = useState(false);
  const [activeIndices, setActiveIndices] = useState({ start: -1, mid: -1, end: -1 });
  const [foundIndex, setFoundIndex] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("Normal");
  const [key, setKey] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [subArray, setSubArray] = useState([]);
  const [history, setHistory] = useState([]);
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);

  // Generate sorted random array
  function generateArray(size) {
    const temp = Array.from({ length: size }, () => Math.floor(Math.random() * 100))
      .sort((a, b) => a - b);
    setArray(temp);
    setFoundIndex(-1);
    setActiveIndices({ start: -1, mid: -1, end: -1 });
    setNotFound(false);
    setSubArray([]);
    setHistory([]);
  }

  useEffect(() => {
    generateArray(size);
  }, [size]);
  
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);
  
  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function sleep(ms) {
    return new Promise((res) => {
      setTimeout(() => res(), ms);
    });
  }

  function checkPaused() {
    return new Promise((res) => {
      const interval = setInterval(() => {
        if (!pausedRef.current) {
          clearInterval(interval);
          res();
        }
      }, 100);
    });
  }

  function getSpeedDelay() {
    switch (speedRef.current) {
      case "Fast": return 200;
      case "Slow": return 1500;
      case "Normal":
      default: return 600;
    }
  }

  async function binarySearch() {
    if (!key) {
      setError("Please enter a key to search");
      setTimeout(() => setError(""), 3000);
      return;
    }

    setSearching(true);
    setFoundIndex(-1);
    setNotFound(false);
    setHistory([]);
    
    let start = 0;
    let end = array.length - 1;
    const searchHistory = [];

    while (start <= end) {
      await checkPaused();
      
      const mid = Math.floor((start + end) / 2);
      const currentSubArray = array.slice(start, end + 1);
      
      setActiveIndices({ start, mid, end });
      setSubArray(currentSubArray);
      
      // Record this step in history
      const step = {
        start,
        mid,
        end,
        subArray: currentSubArray,
        valueAtMid: array[mid],
        comparison: `Comparing ${key} with ${array[mid]}`
      };
      searchHistory.push(step);
      setHistory([...searchHistory]);
      
      await sleep(getSpeedDelay());
      
      if (array[mid] == key) {
        setFoundIndex(mid);
        setActiveIndices({ start: -1, mid: -1, end: -1 });
        setSearching(false);
        return;
      } else if (array[mid] < key) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
      
      await sleep(getSpeedDelay() / 2);
    }
    
    setActiveIndices({ start: -1, mid: -1, end: -1 });
    setNotFound(true);
    setSearching(false);
  }

  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Binary Search Visualization</h1>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center">
        <label className="font-medium">Size:</label>
        <input
          type="range"
          min="4"
          max="8"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={searching}
          className="accent-blue-600"
        />
        <span className="w-10">{size}</span>

        <button
          onClick={() => generateArray(size)}
          className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={searching}
        >
          Randomize Array
        </button>

        <div className="flex items-center gap-2">
          <label className="font-medium">Key:</label>
          <input
            type="number"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="bg-gray-700 text-white px-3 py-1 rounded w-20"
            disabled={searching}
          />
        </div>

        <button
          onClick={binarySearch}
          className="bg-green-600 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={searching || !key}
        >
          Search
        </button>

        {error.length > 0 && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
            {error}
          </div>
        )}

        Speed:
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded cursor-pointer"
        >
          <option value="Fast">Fast</option>
          <option value="Normal">Normal</option>
          <option value="Slow">Slow</option>
        </select>

        <button
          onClick={() => setPaused(!paused)}
          className={`px-4 py-2 rounded cursor-pointer font-semibold text-white ${
            paused ? "bg-blue-500" : "bg-red-600"
          }`}
          disabled={!searching}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Current Search Subarray */}
      {subArray.length > 0 && (
        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Current Search Subarray:</h3>
          <div className="flex justify-center gap-3 mb-4">
            {subArray.map((num, idx) => (
              <div
                key={idx}
                className={`w-14 h-14 flex items-center justify-center rounded text-white font-bold text-lg transition-all duration-200 ${
                  activeIndices.mid === (activeIndices.start + idx) 
                    ? "bg-purple-500 scale-125" 
                    : "bg-blue-500"
                }`}
              >
                {num}
              </div>
            ))}
          </div>
          <div className="text-gray-300">
            <p>Start: {activeIndices.start} | Mid: {activeIndices.mid} | End: {activeIndices.end}</p>
            {history.length > 0 && (
              <p className="mt-1">Last comparison: {history[history.length - 1].comparison}</p>
            )}
          </div>
        </div>
      )}

      {/* Full Array Visualization */}
      <div className="flex justify-center items-end gap-5 mt-20 relative">
        {array.map((num, idx) => {
          const isInCurrentRange = idx >= activeIndices.start && idx <= activeIndices.end;
          const isStart = idx === activeIndices.start;
          const isMid = idx === activeIndices.mid;
          const isEnd = idx === activeIndices.end;
          
          return (
            <div key={idx} className="relative flex flex-col items-center">
              {/* Block */}
              <div
                className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl transition-all duration-200 ${
                  foundIndex === idx ? "bg-green-500 scale-125 animate-pulse"
                    : isMid
                    ? "bg-purple-500 scale-125"
                    : isInCurrentRange
                    ? "bg-blue-500"
                    : "bg-gray-600 opacity-50"
                }`}
                style={{ width: "4.5rem", height: "4.5rem" }}
              >
                {num}
              </div>

              {/* Indicators below each block */}
              <div className="absolute top-full mt-1 flex gap-1">
                {isStart && <div className="text-xs bg-yellow-500 px-1 rounded">start</div>}
                {isMid && <div className="text-xs bg-purple-500 px-1 rounded">mid</div>}
                {isEnd && <div className="text-xs bg-red-500 px-1 rounded">end</div>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Search History */}
      {history.length > 0 && (
        <div className="mt-12 mx-auto max-w-4xl">
          <h3 className="text-2xl font-semibold mb-4 text-center">Search Steps</h3>
          <div className="bg-gray-800 rounded-lg p-4">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4 text-left">Step</th>
                  <th className="py-2 px-4 text-left">Subarray</th>
                  <th className="py-2 px-4 text-left">Indices</th>
                  <th className="py-2 px-4 text-left">Comparison</th>
                </tr>
              </thead>
              <tbody>
                {history.map((step, idx) => (
                  <tr key={idx} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2 px-4">{idx + 1}</td>
                    <td className="py-2 px-4">
                      [{step.subArray.join(", ")}]
                    </td>
                    <td className="py-2 px-4">
                      start={step.start}, mid={step.mid}, end={step.end}
                    </td>
                    <td className="py-2 px-4">{step.comparison}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Not Found Message */}
      {notFound && (
        <div className="text-center mt-8">
          <div className="text-3xl font-bold text-red-500 animate-pulse">
            Element not found in the array!
          </div>
        </div>
      )}

      {/* Algorithm Information */}
      <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
          About Binary Search
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
          <div className="space-y-15">
            {/* Algorithm Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Requires the array to be sorted</li>
                <li>Compare the key with the middle element of the array</li>
                <li>If key matches, return the index</li>
                <li>If key is greater, search the right half</li>
                <li>If key is smaller, search the left half</li>
                <li>Repeat until found or search space is exhausted</li>
              </ul>
            </div>

            {/* Time Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>
                  Best Case (Element at middle):{" "}
                  <span className="font-mono text-green-400">O(1)</span>
                </li>
                <li>
                  Average/Worst Case: <span className="font-mono text-yellow-400">O(log n)</span>
                </li>
              </ul>
            </div>

            {/* Space Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">
                O(1) – Iterative implementation uses constant space
              </p>
            </div>

            {/* Learn More */}
            <div>
              <a
                href="https://www.geeksforgeeks.org/binary-search/"
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
              <code>{`int binarySearch(int arr[], int size, int key) {
  int start = 0;
  int end = size - 1;

  while (start <= end) {
    int mid = start + (end - start) / 2;

    if (arr[mid] == key) {
      return mid;
    } else if (arr[mid] < key) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1; // Not found
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}