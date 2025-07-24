import { useState, useEffect, useRef } from "react";

export default function SelectionSort() {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(6);
  const [sorting, setSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [swappingIndices,setSwappingIndices]=useState([]);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("Slow");
  const [minIndex, setMinIndex] = useState(null);
  const [customMode, setCustomMode] = useState(false);
  const [tempValues, setTempValues] = useState(Array(6).fill(""));
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);

  function generateArray(size) {
    const temp = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(temp);
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
    return new Promise((res) => setTimeout(res, ms));
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
        return 2200;
      case "Normal":
      default:
        return 600;
    }
  }

  async function selectionSort() {
    setSorting(true);
    let arr = [...array];

    if (customMode) {
      if (tempValues.some(val => val === "")) {
        setError("Please fill all values");
        setTimeout(() => setError(""), 3000);
        return;
      }
    
      const numericValues = tempValues.map(val => Number(val));
      setArray(numericValues); // still updates state for visualization
      arr = numericValues; // use this immediately
      setCustomMode(false);
    }


    for (let i = 0; i < arr.length - 1; i++) {
      let min = i;
      setMinIndex(min);
      for (let j = i + 1; j < arr.length; j++) {
        setActiveIndices([j,i]);
        await checkPaused();
        await sleep(getSpeedDelay());

        if (arr[j] < arr[min]) {
          min = j;
          setMinIndex(min);
        }
      }

      if (min !== i) {
        setSwappingIndices([i,min])
        await sleep(getSpeedDelay());
        [arr[i], arr[min]] = [arr[min], arr[i]];
        await sleep(getSpeedDelay());
        setSwappingIndices([])
        setArray([...arr]);
      }

      await sleep(getSpeedDelay());
      setActiveIndices([]);
    }

    setMinIndex(null);
    setSorting(false);
  }
  function enableCustomMode() {
    setCustomMode(true);
    setTempValues(Array(size).fill(""));
    setActiveIndices([]);
  }

  function handleCustomValueChange(index, value) {
    const newValues = [...tempValues];
    newValues[index] = value;
    setTempValues(newValues);
  }
  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Selection Sort Visualization</h1>
  
      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center relative">
        <label className="font-medium">Size:</label>
        <input
          type="range"
          min="4"
          max="8"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          disabled={sorting}
          className="accent-blue-600"
        />
        <span className="w-10">{size}</span>
  
        <button
          onClick={() => generateArray(size)}
          className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
          disabled={sorting}
        >
          Randomize Array
        </button>
        <button
          onClick={enableCustomMode}
          className="bg-purple-500 px-4 py-2 rounded text-white font-semibold cursor-pointer"
          disabled={sorting || customMode}
        >
          Custom Values
        </button>
        <button
          onClick={selectionSort}
          className="bg-green-500 px-4 py-2 rounded text-white font-semibold hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          disabled={sorting}
        >
          Start
        </button>
  
        <span className="font-medium">Speed:</span>
        <select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="Fast">Fast</option>
          <option value="Normal">Normal</option>
          <option value="Slow">Slow</option>
        </select>
  
        <button
          onClick={() => setPaused(!paused)}
          className={`px-4 py-2 rounded font-semibold text-white ${
            paused ? "bg-blue-500" : "bg-red-500"
          } hover:bg-red-600 transition-colors duration-200 cursor-pointer`}
          disabled={!sorting}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
  
      {/* Sorting Area */}
      <div className="relative w-full">
        {swappingIndices.length > 0 && (
          <div className=" absolute top-35 left-1/2 -translate-x-1/2 w-30 bg-purple-600 text-white px-4 py-1 rounded font-semibold z-10">
            Swapping...
          </div>
        )}
  
        <div className="flex justify-center items-end gap-5 mt-20">
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
              ) :(<>{minIndex === idx && (
                <div className="absolute bottom-full mb-2 text-blue-400 font-bold text-2xl">
                  Min
                </div>
              )}
              <div
                className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl text-outline transition-all duration-200 ${
                  swappingIndices.includes(idx)
                    ? "bg-purple-500 scale-125 animate-shake"
                    : idx === minIndex
                    ? "bg-green-500 scale-110"
                    : activeIndices.includes(idx)
                    ? "bg-red-500 scale-110"
                    : "bg-blue-500"
                }`}
              >
                {num}
              </div></>
              )}
              {activeIndices.includes(idx) && (
                <div className="absolute top-full mt-1 flex flex-col items-center text-yellow-400">
                  <div className="text-2xl font-bold">
                    {activeIndices[0] === idx ? "j" : "i"}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Selection Sort</h2>
  <div className="grid md:grid-cols-2 gap-8">
    {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
    <div className="space-y-15">
      {/* Algorithm Steps */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
        <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
          <li className="list-none">Repeat for each index from 0 to n - 1:</li>
          <li className="pl-6 list-none">
            <li className="list-disc"> Assume the current index as the minimum</li>
            <li className="list-disc"> Loop through the unsorted part of the array</li>
            <li className="list-disc"> If a smaller element is found, update the minimum index</li>
            <li className="list-disc"> After the loop, swap the current index with the minimum index</li>
          </li>
        </ul>
      </div>
 
      {/* Time Complexity */}
      <div>
        <h3 className="text-xl font-semibold">Time Complexity:</h3>
        <ul className="list-disc pl-6 text-gray-200">
          <li>Best Case (Sorted): <span className="font-mono text-yellow-400">O(n²)</span></li>
          <li>Average Case: <span className="font-mono text-yellow-400">O(n²)</span></li>
          <li>Worst Case: <span className="font-mono text-red-400">O(n²)</span></li>
        </ul>
      </div>

      {/* Space Complexity */}
      <div>
        <h3 className="text-xl font-semibold">Space Complexity:</h3>
        <p className="text-base text-gray-200">O(1) – No extra space required</p>
      </div>

      {/* Learn More */}
      <div>
        <a
          href="https://www.geeksforgeeks.org/selection-sort/"
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
<code>{`void selectionSort(int arr[], int n) {
  for (int i = 0; i < n - 1; i++) {
    int minIndex = i;
    for (int j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // Swap arr[i] and arr[minIndex]
    int temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
}`}</code>
      </pre>
    </div>
  </div>
</div>

      </div>
    </div>
  );
  
  
}
