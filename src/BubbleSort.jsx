import { useState,useEffect, useRef } from "react";
export default function BubbleSort(){
  console.log("BubbleSort component called");
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(6);
  const [sorting, setSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]); // to highlight comparisons
  const [paused,setPaused]=useState(false);
  const [speed, setSpeed] = useState("Slow");
  const [swappingIndices,setSwappingIndices]=useState([]);
  const [customMode, setCustomMode] = useState(false);
  const [tempValues, setTempValues] = useState(Array(6).fill(""));
  const pausedRef=useRef(paused);
  const speedRef = useRef(speed);

  // Generate random array
  function generateArray(size){
    const temp = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(temp);
  };

  useEffect(() => {
    generateArray(size);
  }, [size]);
  useEffect(() => {
   pausedRef.current=paused;
  }, [paused]);
  useEffect(() => {
    speedRef.current=speed;
   }, [speed]);

  function sleep(ms){
    return new Promise((res,rej)=>{
      setTimeout(()=>{res()},ms)
    })
  }
  function checkPaused(){
    return new Promise((res)=>{
      const interval=setInterval(()=>{
        if(!pausedRef.current)
        {
          clearInterval(interval);
          res();
        }
      },100)
    })
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
  async function bubbleSort(){
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
      for (let j = 0; j < arr.length - i - 1; j++) {
        await checkPaused();
        setActiveIndices([j, j + 1]);
        await sleep(getSpeedDelay());
        if (arr[j] > arr[j + 1]) {
          await sleep(getSpeedDelay());
          setSwappingIndices([j,j+1])
          await sleep(getSpeedDelay());
          console.log("before swappping");
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          console.log("After swappping");
          setArray([...arr]);
          console.log("Array set to",arr);
          await sleep(getSpeedDelay());
          console.log("Before clearing swapping indices");
          setSwappingIndices([])
        }
      }
    }
    setActiveIndices([]);
    setSorting(false);
  };
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
      <h1 className="text-5xl font-bold mb-20">Bubble Sort Visualization</h1>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-6 flex-wrap justify-center">
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
          onClick={bubbleSort}
          className="bg-green-500 px-4 py-2 rounded text-white font-semibold hover:bg-green-600 transition-colors duration-200 cursor-pointer"
          disabled={sorting}
        >
          Start
        </button>
        Speed:<select
          value={speed}
          onChange={(e) => setSpeed(e.target.value)}
          className="bg-gray-800 text-white px-3 py-2 rounded"
        >
          <option value="Fast">Fast</option>
          <option value="Normal">Normal</option>
          <option value="Slow">Slow</option>
        </select>
        <button onClick={() => setPaused(!paused)} className={`px-4 py-2 rounded font-semibold text-white ${ paused ? "bg-blue-500" : "bg-red-500"} hover:bg-red-600 transition-colors duration-200 cursor-pointer`} disabled={!sorting}>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      {/* Number Blocks */}
      <div className="flex justify-center items-end gap-5 mt-20 relative">
        {array.map((num, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            {/* Block */}
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
              ) :
              <div
                className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl text-outline transition-all duration-200 ${
                  swappingIndices.includes(idx)
                    ? "bg-purple-500 scale-125 animate-shake"
                    : activeIndices.includes(idx)
                    ? "bg-red-500 scale-110"
                    : "bg-blue-500"
                }`}
                >
                {num}
              </div>
            }

            {/* Pointer absolutely positioned below */}
            {activeIndices.includes(idx) && (
              <div
                className={`absolute top-full mt-1 flex flex-col items-center  ${
                  idx === activeIndices[0] ? "text-yellow-400" : "text-blue-400"
                }`}
              >
                <div className="text-2xl font-bold">{idx === activeIndices[0] ? "j" : "j+1"}</div>
                {swappingIndices[0]==idx && (
                  <div className="text-xl text-purple-400 mt-1 ml-26 font-semibold animate-bounce">
                    Swapping...
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Bubble Sort</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
          <div className="space-y-15">
            {/* Algorithm Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Repeat until the array is sorted:</li>
                <li> Loop through the array</li>
                <li> Compare each pair of adjacent elements</li>
                <li> If they are in the wrong order, swap them</li>
                <li> Each pass pushes the largest unsorted element to its correct position</li>
              </ul>
            </div>

            {/* Time Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Best Case (Sorted): <span className="font-mono text-green-400">O(n)</span></li>
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
                href="https://www.geeksforgeeks.org/bubble-sort/"
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
      <code>{`void bubbleSort(int arr[], int n) {
        for (int i = 0; i < n - 1; i++) {
          for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
              // Swap arr[j] and arr[j+1]
              int temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
            }
          }
        }
      }`}</code>
            </pre>
          </div>
        </div>
      </div>

    </div>
  );
};
