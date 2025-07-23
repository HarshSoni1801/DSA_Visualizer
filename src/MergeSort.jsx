import { useState, useEffect } from "react";

export default function MergeSortVisualizer() {
  const [array, setArray] = useState([34, 34, 36, 91, 55, 53, 10, 28]);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [size, setSize] = useState(6);

  useEffect(() => {
    generateRandomArray(size);
  }, [size]);

  const generateRandomArray = (n) => {
    const newArray = Array.from({ length: n }, () => Math.floor(Math.random() * 20));
    setArray(newArray);
    setSteps([]);
    setCurrentStep(0);
  };

  const handleStart = () => {
    const arrCopy = [...array];
    const newSteps = [];

    newSteps.push({
      type: "initial",
      array: [...arrCopy],
      subarrays: [[...arrCopy]],
      action: "Original array"
    });

    mergeSortVisualization(arrCopy, 0, arrCopy.length - 1, newSteps);

    setSteps(newSteps);
    setCurrentStep(0);
  };

  const mergeSortVisualization = (arr, start, end, stepList) => {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);

    const left = arr.slice(start, mid + 1);
    const right = arr.slice(mid + 1, end + 1);

    stepList.push({
      type: "split",
      array: arr.slice(start, end + 1),
      left,
      right,
      action: `Split Array[${start}-${end}] into left:[${start}-${mid}] and right:[${mid + 1}-${end}]`
    });

    mergeSortVisualization(arr, start, mid, stepList);
    mergeSortVisualization(arr, mid + 1, end, stepList);

    const beforeMergeLeft = arr.slice(start, mid + 1);
    const beforeMergeRight = arr.slice(mid + 1, end + 1);

    const merged = mergeVisualization(arr, start, mid, end);

    stepList.push({
      type: "merged",
      array: arr.slice(start, end + 1),
      left: beforeMergeLeft,
      right: beforeMergeRight,
      merged,
      action: `Merged [${start}-${end}]`
    });
  };

  const mergeVisualization = (arr, start, mid, end) => {
    const temp = [];
    let left = start;
    let right = mid + 1;

    while (left <= mid && right <= end) {
      if (arr[left] <= arr[right]) {
        temp.push(arr[left++]);
      } else {
        temp.push(arr[right++]);
      }
    }

    while (left <= mid) temp.push(arr[left++]);
    while (right <= end) temp.push(arr[right++]);

    for (let i = start; i <= end; i++) {
      arr[i] = temp[i - start];
    }

    return [...temp];
  };

  const handleStepForward = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleStepBackward = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const renderCurrentStep = () => {
    if (steps.length === 0) {
      return (
        <div className="flex justify-center gap-5 mb-4">
          {array.map((num, idx) => (
            <div key={idx} className="w-18 h-18 flex items-center justify-center rounded bg-blue-500 text-white font-bold text-xl transition-all duration-200 text-outline">
              {num}
            </div>
          ))}
        </div>
      );
    }

    const step = steps[currentStep];

    return (
      <div className="mb-8">
        <div className="text-center mb-4 text-lg font-semibold text-blue-300">
          {step.action}
        </div>

        {step.type === "split" && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              {step.array.map((num, idx) => (
                <div key={idx} className="w-12 h-12 bg-gray-600 text-white flex justify-center items-center rounded shadow">
                  {num}
                </div>
              ))}
            </div>
            <div className="text-2xl">↓</div>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="text-sm mb-1">Left Half</div>
                <div className="flex gap-2">
                  {step.left.map((num, idx) => (
                    <div key={idx} className="w-12 h-12 bg-blue-600 text-white flex justify-center items-center rounded shadow">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm mb-1">Right Half</div>
                <div className="flex gap-2">
                  {step.right.map((num, idx) => (
                    <div key={idx} className="w-12 h-12 bg-blue-600 text-white flex justify-center items-center rounded shadow">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step.type === "merged" && (
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <div className="text-sm mb-1">Left Half</div>
                <div className="flex gap-2">
                  {step.left.map((num, idx) => (
                    <div key={idx} className="w-12 h-12 bg-blue-600 text-white flex justify-center items-center rounded shadow">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-sm mb-1">Right Half</div>
                <div className="flex gap-2">
                  {step.right.map((num, idx) => (
                    <div key={idx} className="w-12 h-12 bg-blue-600 text-white flex justify-center items-center rounded shadow">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="text-2xl">↓</div>
            <div className="flex gap-2">
              {step.merged.map((num, idx) => (
                <div key={idx} className="w-12 h-12 bg-green-600 text-white flex justify-center items-center rounded shadow">
                  {num}
                </div>
              ))}
            </div>
            {currentStep === steps.length - 1 && <div className="text-center mb-4 text-xl font-semibold text-blue-300">Final Sorted Array</div>}
          </div>
        )}

        {step.type === "initial" && (
          <div className="flex justify-center gap-2">
            {step.array.map((num, idx) => (
              <div key={idx} className="w-12 h-12 bg-gray-600 text-white flex justify-center items-center rounded shadow">
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-white fade-delay">
      <h1 className="text-5xl font-bold mb-20">Merge Sort Visualization</h1>
      <div className="flex items-center gap-4 mb-6">
        <label className="font-medium">Size:</label>
        <input
          type="range"
          min="4"
          max="8"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="accent-blue-600"
        />
        <span className="w-10">{size}</span>
        <button
          onClick={() => generateRandomArray(size)}
          className="bg-yellow-500 px-4 py-2 rounded text-white font-semibold hover:bg-yellow-600 transition-colors duration-200 cursor-pointer"
        >
          Randomize Array
        </button>
        <button
          onClick={handleStart}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Start Visualization
        </button>
      </div>
      <div className="flex items-center justify-around mb-6">
        <button
          onClick={handleStepBackward}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-30"
          disabled={currentStep === 0}
        >
          ← Previous Step
        </button>
        <button
          onClick={handleStepForward}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded disabled:opacity-30"
          disabled={currentStep === steps.length - 1 || steps.length === 0}
        >
          Next Step →
        </button>
      </div>

      {renderCurrentStep()}

      {steps.length > 0 && (
        <div className="mt-8 flex flex-col items-center">
          <div className="mb-2">
            Step {currentStep + 1} of {steps.length}
          </div>
          <input
            type="range"
            min="0"
            max={steps.length - 1}
            value={currentStep}
            onChange={(e) => setCurrentStep(parseInt(e.target.value))}
            className="w-full max-w-2xl accent-blue-600"
          />
        </div>
      )}

      
      <div className="mt-40 px-6 md:px-20 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
          About Merge Sort
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
          <div className="space-y-15">
            {/* Algorithm Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Divide the array into two halves.</li>
                <li>Recursively sort each half.</li>
                <li>Merge the two sorted halves to produce the final sorted array.</li>
              </ul>
            </div>

            {/* Time Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>Best Case: <span className="font-mono text-green-400">O(n log n)</span></li>
                <li>Average Case: <span className="font-mono text-yellow-400">O(n log n)</span></li>
                <li>Worst Case: <span className="font-mono text-red-400">O(n log n)</span></li>
              </ul>
            </div>

            {/* Space Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">O(n) – Due to auxiliary arrays used during merging</p>
            </div>

            {/* Learn More Link */}
            <div>
              <a
                href="https://www.geeksforgeeks.org/merge-sort/"
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
      <code>{`void merge(int arr[], int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;

        int L[n1], R[n2];

        for (int i = 0; i < n1; i++)
          L[i] = arr[l + i];
        for (int j = 0; j < n2; j++)
          R[j] = arr[m + 1 + j];

        int i = 0, j = 0, k = l;

        while (i < n1 && j < n2) {
          if (L[i] <= R[j]) arr[k++] = L[i++];
          else arr[k++] = R[j++];
        }

        while (i < n1) arr[k++] = L[i++];
        while (j < n2) arr[k++] = R[j++];
      }

      void mergeSort(int arr[], int l, int r) {
        if (l < r) {
          int m = l + (r - l) / 2;
          mergeSort(arr, l, m);
          mergeSort(arr, m + 1, r);
          merge(arr, l, m, r);
        }
      }`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
