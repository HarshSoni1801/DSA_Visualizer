import { useState, useEffect, useRef } from "react";
export default function InsertionSort() {
  console.log("InsertionSort component called");
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(6);
  const [sorting, setSorting] = useState(false);
  const [activeIndices, setActiveIndices] = useState([]);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("Normal");
  const [keyIndex, setKeyIndex] = useState(null); // New state for key index
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
        return 1200;
      case "Normal":
      default:
        return 600;
    }
  }

  async function insertionSort() {
    setSorting(true);
    const arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      setKeyIndex(i);
      await sleep(getSpeedDelay());
      // Set key index
      let j = i - 1;

      while (j >= 0 && arr[j] > key) {
        await checkPaused();
        setActiveIndices([j]); // Only highlight j now
        await sleep(getSpeedDelay());
        arr[j + 1] = arr[j];
        setArray([...arr]);
        j--;
        await sleep(getSpeedDelay());
      }
      arr[j + 1] = key;
      setArray([...arr]);
      setActiveIndices([]);
      setKeyIndex(null); // Reset key index after insertion
    }
    setActiveIndices([]);
    setKeyIndex(null);
    setSorting(false);
  }

  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-20">Insertion Sort Visualization</h1>

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
          onClick={insertionSort}
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

      <div className="flex justify-center items-end gap-5 mt-20 relative">
        {array.map((num, idx) => (
          <div key={idx} className="relative flex flex-col items-center">
            <div
              className={`w-18 h-18 flex items-center justify-center rounded text-white font-bold text-xl text-outline transition-all duration-200 ${
                activeIndices.includes(idx)
                  ? "bg-red-500 scale-110"
                  : keyIndex === idx
                  ? "bg-green-500 scale-110"
                  : "bg-blue-500"
              }`}
            >
              {num}
            </div>
            {activeIndices.includes(idx) && (
              <div className="absolute top-full mt-1 flex flex-col items-center text-yellow-400">
                <div className="text-2xl font-bold">j</div>
              </div>
            )}
            {keyIndex === idx && (
              <div className="absolute top-full mt-1 flex flex-col items-center text-blue-400">
                <div className="text-2xl font-bold">key</div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">About Insertion Sort</h2>

  <div className="grid md:grid-cols-2 gap-8">
    {/* Left Column */}
    <div className="space-y-15">
      {/* Algorithm */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
        <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
          <li>Start from index 1 and go to the end of the array</li>
          <li> Pick the element at current index</li>
          <li> Compare with elements before it</li>
          <li> Shift larger elements forward</li>
          <li> Insert the picked element at the correct position</li>
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
          href="https://www.geeksforgeeks.org/insertion-sort/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-green-400 underline font-semibold transition-colors duration-200"
        >
          Learn more →
        </a>
      </div>
    </div>

    {/* Right Column - C++ Code */}
    <div>
      <h3 className="text-xl font-semibold mb-2">C++ Code:</h3>
      <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200">
        <code>{`void insertionSort(int arr[], int n) {
  for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = key;
  }
}`}</code>
      </pre>
    </div>
  </div>
      </div>

    </div>
  );
};