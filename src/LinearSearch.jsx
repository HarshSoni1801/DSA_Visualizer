import { useState, useEffect, useRef } from "react";
export default function LinearSearch() {
  console.log("LinearSearch component called");
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(6);
  const [searching, setSearching] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("Slow");
  const [key, setKey] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");
  const [customMode, setCustomMode] = useState(false);
  const [tempValues, setTempValues] = useState(Array(6).fill(""));
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);

  // Generate random array
  function generateArray(size) {
    const temp = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(temp);
    setFoundIndex(-1);
    setActiveIndex(-1);
    setCustomMode(false);
  }

  useEffect(() => {
    generateArray(size);
    setTempValues(Array(size).fill(""));
  }, [size]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function sleep(ms) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res();
      }, ms);
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
      case "Fast":
        return 200;
      case "Slow":
        return 1200;
      case "Normal":
      default:
        return 600;
    }
  }

  async function linearSearch() {
    if (!key) {
      setError("Please enter a key to search");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if (customMode) {
      if (tempValues.some(val => val === "")) {
        setError("Please fill all values");
        setTimeout(() => setError(""), 3000);
        return;
      }
      const numericValues = tempValues.map(val => Number(val));
      setArray(numericValues);
      setCustomMode(false);
      await sleep(100);
    }
    setSearching(true);
    setFoundIndex(-1);
    setNotFound(false);
    const arr = customMode ? tempValues.map(Number) : [...array];
    console.log(arr);
   
    for (let i = 0; i < arr.length; i++) {
      await checkPaused();
      setActiveIndex(i);
      await sleep(getSpeedDelay());
     
      if (arr[i] == key) {
        setFoundIndex(i);
        setActiveIndex(-1);
        setSearching(false);
        return;
      }
    }
   
    setActiveIndex(-1);
    setNotFound(true);
    setSearching(false);
  }

  function enableCustomMode() {
    setCustomMode(true);
    setTempValues(Array(size).fill(""));
    setFoundIndex(-1);
    setActiveIndex(-1);
  }

  function handleCustomValueChange(index, value) {
    const newValues = [...tempValues];
    newValues[index] = value;
    setTempValues(newValues);
  }

  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Linear Search Visualization</h1>

      {/* Controls - completely unchanged layout */}
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center">
        <label className="font-medium">Size:</label>
        <input
          type="range"
          min="4"
          max="8"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={searching || customMode}
          className="accent-blue-600"
        />
        <span className="w-10">{size}</span>

        <button
          onClick={() => generateArray(size)}
          className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={searching || customMode}
        >
          Randomize Array
        </button>

        <button
          onClick={enableCustomMode}
          className="bg-purple-500 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={searching || customMode}
        >
          Custom Values
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
          onClick={linearSearch}
          className="bg-green-600 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={searching}
        >
          Search
        </button>
        
        {error.length>0 && (
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
          className={`px-4 py-2 cursor-pointer rounded font-semibold text-white ${
            paused ? "bg-blue-500" : "bg-red-600"
          }`}
          disabled={!searching}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Number Blocks - only changed the custom mode inputs */}
      <div className="flex justify-center items-end gap-5 mt-20 relative">
        {array.map((num, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {customMode ? (
              <div
                className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl text-outline transition-all duration-200 bg-blue-500`}
                style={{ width: "4.5rem", height: "4.5rem" }}
              >
                <input
                  type=""
                  value={tempValues[idx] || ""}
                  onChange={(e) => handleCustomValueChange(idx, e.target.value)}
                  className="w-full h-full bg-transparent border-none text-center text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"
                  style={{ fontSize: "1.5rem" }}
                  autoFocus={idx === 0}
                />
              </div>
            ) : (
              <div
                className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl text-outline transition-all duration-200 ${
                  activeIndex === idx
                    ? "bg-red-500 scale-110"
                    : foundIndex === idx
                    ? "bg-green-500 scale-125 animate-pulse"
                    : "bg-blue-500"
                }`}
                style={{ width: "4.5rem", height: "4.5rem" }}
              >
                {num}
              </div>
            )}

            {!customMode && activeIndex === idx && (
              <div className="absolute top-full mt-1 flex flex-col items-center text-yellow-400">
                <div className="text-2xl font-bold">i</div>
                <div className="text-xl text-white mt-1 font-semibold">
                  Comparing...
                </div>
              </div>
            )}
            {!customMode && foundIndex === idx && (
              <div className="absolute top-full mt-1 flex flex-col items-center text-green-400">
                <div className="text-2xl font-bold">Found!</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {notFound && (
        <div className="text-center mt-8">
          <div className="text-3xl font-bold text-red-500 animate-pulse">
            Element not found in the array!
          </div>
        </div>
      )}

      {/* Algorithm explanation section - COMPLETELY UNCHANGED */}
      <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
          About Linear Search
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-15">
            <div>
              <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Start from the first element of the array</li>
                <li>Compare the current element with the key</li>
                <li>If it matches, return the index</li>
                <li>If it doesn't match, move to the next element</li>
                <li>Repeat until the element is found or the end of array is reached</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>
                  Best Case (Element at first position):{" "}
                  <span className="font-mono text-green-400">O(1)</span>
                </li>
                <li>
                  Average Case: <span className="font-mono text-yellow-400">O(n)</span>
                </li>
                <li>
                  Worst Case (Element not present):{" "}
                  <span className="font-mono text-red-400">O(n)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">
                O(1) – No extra space required
              </p>
            </div>

            <div>
              <a
                href="https://www.geeksforgeeks.org/linear-search/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-green-400 underline font-semibold transition-colors duration-200"
              >
                Learn more →
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">C++ Code:</h3>
            <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
              <code>{`int linearSearch(int arr[], int n, int key) {
  for (int i = 0; i < n; i++) {
    if (arr[i] == key) {
      return i; // Return index if found
    }
  }
  return -1; // Return -1 if not found
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}