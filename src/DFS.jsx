import { useState, useEffect, useRef } from "react";

export default function DirectedDFS() {
  // Graph state
  const [graph, setGraph] = useState({
    A: ["B"],
    B: ["C"],
    C: ["D"],
    D: ["E"],
    E: ["F"],
    F: []
  });
  const [size, setSize] = useState(6);
  const [startNode, setStartNode] = useState("A");
  const [targetNode, setTargetNode] = useState("F");

  // Visualization state
  const [visited, setVisited] = useState([]);
  const [stack, setStack] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [path, setPath] = useState([]);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState("Slow");
  const [found, setFound] = useState(false);
  const [error, setError] = useState("");
  const [stackAction, setStackAction] = useState(null);
  const [actionNode, setActionNode] = useState(null);
  const pausedRef = useRef(paused);
  const speedRef = useRef(speed);

  // Generate random directed graph
  function generateGraph(size) {
    const nodes = Array.from({ length: size }, (_, i) => String.fromCharCode(65 + i));
    const newGraph = {};
    
    nodes.forEach(node => {
      newGraph[node] = [];
    });

    nodes.forEach(node => {
      const numEdges = Math.floor(Math.random()) + 1;
      const possibleTargets = nodes.filter(n => n !== node);
      
      for (let i = 0; i < numEdges && possibleTargets.length > 0; i++) {
        const randomIndex = Math.floor(Math.random() * possibleTargets.length);
        const target = possibleTargets[randomIndex];
        
        if (!newGraph[node].includes(target)) {
          newGraph[node].push(target);
        }
        possibleTargets.splice(randomIndex, 1);
      }
    });

    for (let i = 0; i < nodes.length - 1; i++) {
      if (!newGraph[nodes[i]].includes(nodes[i+1])) {
        newGraph[nodes[i]].push(nodes[i+1]);
      }
    }

    setGraph(newGraph);
    setStartNode("A");
    setTargetNode(nodes[nodes.length - 1]);
    resetVisualization();
  }

  function resetVisualization() {
    setVisited([]);
    setStack([]);
    setCurrentNode(null);
    setPath([]);
    setRunning(false);
    setFound(false);
    setPaused(false);
    setStackAction(null);
    setActionNode(null);
  }

  useEffect(() => {
    generateGraph(size);
  }, [size]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  function checkPaused() {
    return new Promise(resolve => {
      const interval = setInterval(() => {
        if (!pausedRef.current) {
          clearInterval(interval);
          resolve();
        }
      }, 100);
    });
  }

  function getSpeedDelay() {
    switch (speedRef.current) {
      case "Fast": return 300;
      case "Slow": return 2000;
      case "Normal":
      default: return 1000;
    }
  }

  async function animateStackAction(action, node) {
    setStackAction(action);
    setActionNode(node);
    await new Promise(resolve => setTimeout(resolve, 500)); // Match animation duration
    setStackAction(null);
    setActionNode(null);
  }

  async function dfs() {
    if (!startNode || !targetNode) {
      setError("Please select start and target nodes");
      setTimeout(() => setError(""), 3000);
      return;
    }

    resetVisualization();
    setRunning(true);
    
    const visitedSet = new Set();
    const stack = [startNode];
    const parent = {};
    let foundNode = null;

    parent[startNode] = null;

    await animateStackAction('push', startNode);
    setStack([...stack]);

    while (stack.length > 0) {
      await checkPaused();
      
      const node = stack[stack.length - 1];
      await animateStackAction('pop', node);
      stack.pop();
      setStack([...stack]);
      
      setCurrentNode(node);
      await sleep(getSpeedDelay());

      if (node === targetNode) {
        foundNode = node;
        setFound(true);
        break;
      }

      if (!visitedSet.has(node)) {
        visitedSet.add(node);
        setVisited(Array.from(visitedSet));
        
        const neighbors = [...graph[node]].reverse();
        for (const neighbor of neighbors) {
          if (!visitedSet.has(neighbor)) {
            stack.push(neighbor);
            parent[neighbor] = node;
            await animateStackAction('push', neighbor);
            setStack([...stack]);
          }
        }
        await sleep(getSpeedDelay() / 2);
      }
    }

    if (foundNode) {
      const path = [];
      let currentNode = foundNode;
      while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = parent[currentNode];
      }
      setPath(path);
    }

    setRunning(false);
  }

  return (
    <div className="text-white w-full fade-delay">
      <h1 className="text-5xl font-bold mb-10">DFS Visualization</h1>

      {/* Controls */}
      <div className="flex items-center gap-4 mb-8 flex-wrap justify-center">
        <div className="flex items-center gap-2">
          <label className="font-medium">Size:</label>
          <input
            type="range"
            min="4"
            max="8"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={running}
            className="accent-blue-600"
          />
          <span className="w-8 text-center">{size}</span>
        </div>

        <button
          onClick={() => generateGraph(size)}
          className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded text-white font-semibold transition-colors cursor-pointer"
          disabled={running}
        >
          Randomize
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <label className="font-medium">Start:</label>
          <select
            value={startNode}
            onChange={(e) => setStartNode(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded"
            disabled={running}
          >
            {Object.keys(graph).map((node) => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 cursor-pointer">
          <label className="font-medium">Target:</label>
          <select
            value={targetNode}
            onChange={(e) => setTargetNode(e.target.value)}
            className="bg-gray-700 text-white px-2 py-1 rounded"
            disabled={running}
          >
            {Object.keys(graph).map((node) => (
              <option key={node} value={node}>{node}</option>
            ))}
          </select>
        </div>

        <button
          onClick={dfs}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-semibold transition-colors cursor-pointer"
          disabled={running}
        >
          Start DFS
        </button>

        <div className="flex items-center gap-2">
          <label className="font-medium">Speed:</label>
          <select
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
            className="bg-gray-800 text-white px-2 py-1 rounded cursor-pointer"
          >
            <option value="Fast">Fast</option>
            <option value="Normal">Normal</option>
            <option value="Slow">Slow</option>
          </select>
        </div>

        <button
          onClick={() => setPaused(!paused)}
          className={`px-4 py-2 rounded font-semibold text-white transition-colors ${
            paused ? "bg-blue-500 hover:bg-blue-600" : "bg-red-500 hover:bg-red-600 cursor-pointer"
          }`}
          disabled={!running}
        >
          {paused ? "Resume" : "Pause"}
        </button>
      </div>

      {error && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-bounce">
          {error}
        </div>
      )}

      {/* Main visualization area */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-20 mt-20 px-4">
        {/* Graph visualization */}
        <div className="relative rounded-lg p-4 " style={{ width: "600px", height: "400px" }}>
          {Object.keys(graph).map((node) => {
            const nodeCount = Object.keys(graph).length;
            const angle = (2 * Math.PI * Array.from(Object.keys(graph)).indexOf(node)) / nodeCount;
            const x = 300 + 150 * Math.cos(angle - Math.PI / 2) - 20;
            const y = 200 + 150 * Math.sin(angle - Math.PI / 2) - 20;

            return (
              <div
                key={node}
                className={`absolute w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-lg transition-all duration-200 ${
                  path.includes(node)
                    ? "bg-green-500 scale-125"
                    : currentNode === node
                    ? "bg-purple-500 scale-125"
                    : visited.includes(node)
                    ? "bg-blue-500"
                    : "bg-gray-600"
                }`}
                style={{ left: `${x}px`, top: `${y}px`, zIndex: 2 }}
              >
                {node}
              </div>
            );
          })}

          {Object.entries(graph).map(([node, neighbors]) => {
            const nodeCount = Object.keys(graph).length;
            const nodeAngle = (2 * Math.PI * Object.keys(graph).indexOf(node)) / nodeCount - Math.PI / 2;
            const nodeX = 300 + 150 * Math.cos(nodeAngle);
            const nodeY = 200 + 150 * Math.sin(nodeAngle);

            return neighbors.map((neighbor) => {
              const neighborAngle = (2 * Math.PI * Object.keys(graph).indexOf(neighbor)) / nodeCount - Math.PI / 2;
              const neighborX = 300 + 150 * Math.cos(neighborAngle);
              const neighborY = 200 + 150 * Math.sin(neighborAngle);

              const dx = neighborX - nodeX;
              const dy = neighborY - nodeY;
              const angle = Math.atan2(dy, dx);
              const radius = 20;
              const startX = nodeX + radius * Math.cos(angle);
              const startY = nodeY + radius * Math.sin(angle);
              const endX = neighborX - radius * Math.cos(angle);
              const endY = neighborY - radius * Math.sin(angle);

              const isPathEdge =
                path.includes(node) &&
                path.includes(neighbor) &&
                Math.abs(path.indexOf(node) - path.indexOf(neighbor)) === 1;

              return (
                <svg
                  key={`${node}-${neighbor}`}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  style={{ zIndex: 1 }}
                >
                  <line
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={isPathEdge ? "#10B981" : "#6B7280"}
                    strokeWidth={isPathEdge ? 3 : 2}
                  />
                  <polygon
                    points={`
                      ${endX},${endY} 
                      ${endX - 12 * Math.cos(angle + Math.PI/6)},${endY - 12 * Math.sin(angle + Math.PI/6)} 
                      ${endX - 12 * Math.cos(angle - Math.PI/6)},${endY - 12 * Math.sin(angle - Math.PI/6)}
                    `}
                    fill={isPathEdge ? "#10B981" : "#6B7280"}
                  />
                </svg>
              );
            });
          })}
        </div>
        {/* Stack visualization */}
        <div className="flex flex-col items-center">
    {/* Stack box container */}
    <div className="bg-gray-900 rounded-lg p-4 w-full md:w-40">
      <h3 className="text-xl font-semibold text-center mb-2">DFS Stack</h3>
      
      {/* Stack items container */}
      <div className="bg-gray-800 rounded-lg p-4 h-64 overflow-y-auto  relative">
  {stack.length === 0 ? (
    <div className="text-gray-400 text-center py-4">Empty</div>
  ) : (
    <div className="flex flex-col-reverse gap-2 items-center">
      {stack.map((node, idx) => (
        <div
          key={idx}
          className={`w-10 py-2 rounded flex items-center justify-center transition-all ${
            idx === stack.length - 1
              ? "bg-purple-600 scale-110 font-bold"
              : "bg-gray-700"
          } ${
            stackAction === 'push' && actionNode === node
              ? 'animate-drop'
              : stackAction === 'pop' && idx === stack.length - 1
              ? 'animate-lift'
              : ''
          }`}
          style={{
            animationFillMode: 'forwards',
            zIndex: stack.length - idx
          }}
        >
          {node}
        </div>
      ))}
    </div>
  )}
</div>
    </div>
    <div className="flex gap-5">
               <div className="flex justify-center items-center gap-4 mt-4 text-xl">
                  <div className=" h-4 w-4 bg-purple-600 rounded-full"></div>
                  Top of Stack
               </div>
            </div>
    {/* Action indicator - now placed BELOW the stack box */}
    {stackAction && (
      <div className={`text-center text-sm font-bold mt-2 ${
        stackAction === 'push' ? 'text-green-400' : 'text-red-400'
      }`}>
        {stackAction.toUpperCase()}: {actionNode}
      </div>
    )}
        </div>
      </div>

      {/* Status messages */}
      <div className="mt-6 text-center">
        {found && (
          <div className="text-2xl font-bold text-yellow-500 mb-2">
            Path found: {path.join(" → ")}
          </div>
        )}
        {running && !found && !paused && (
          <div className="text-lg text-blue-400">
            Searching... Current node: {currentNode}
          </div>
        )}
        {paused && (
          <div className="text-lg text-yellow-400">
            Paused at node: {currentNode}
          </div>
        )}
        {!running && !found && visited.length > 0 && (
          <div className="text-lg text-red-400">
            Target node not found!
          </div>
        )}
      </div>

      {/* Algorithm information */}
      <div className="mt-20 px-6 md:px-2 text-white max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
          About Depth-First Search
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
          <div className="space-y-15">
            {/* Algorithm Steps */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Algorithm:</h3>
              <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
                <li>Start at the root node (or starting node)</li>
                <li>Explore as far as possible along each branch before backtracking</li>
                <li>Uses a stack to keep track of nodes to visit</li>
                <li>Mark nodes as visited to avoid cycles</li>
                <li>Can be implemented recursively or iteratively</li>
                <li>Excellent for pathfinding and solving mazes</li>
              </ul>
            </div>

            {/* Time Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Time Complexity:</h3>
              <ul className="list-disc pl-6 text-gray-200">
                <li>
                  Adjacency List: <span className="font-mono text-yellow-400">O(V + E)</span>
                </li>
                <li>
                  Adjacency Matrix: <span className="font-mono text-red-400">O(V²)</span>
                </li>
                <li>V = Vertices, E = Edges</li>
              </ul>
            </div>

            {/* Space Complexity */}
            <div>
              <h3 className="text-xl font-semibold">Space Complexity:</h3>
              <p className="text-base text-gray-200">
                O(V) – Where V is the number of vertices (for stack and visited storage)
              </p>
            </div>

            {/* Learn More */}
            <div>
              <a
                href="https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/"
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
              <code>{`// Iterative implementation using stack
void DFS(vector<int> adj[], int start, int target) {
  stack<int> s;
  vector<bool> visited(adj->size(), false);
  vector<int> parent(adj->size(), -1);

  s.push(start);
  visited[start] = true;

  while (!s.empty()) {
    int current = s.top();
    s.pop();

    if (current == target) {
      // Reconstruct path
      vector<int> path;
      for (int v = target; v != -1; v = parent[v])
        path.push_back(v);
      reverse(path.begin(), path.end());
      return;
    }

    for (int neighbor : adj[current]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        parent[neighbor] = current;
        s.push(neighbor);
      }
    }
  }
}

// Recursive implementation
void DFSRecursive(vector<int>adj[], int node, vector<bool>&visited)
{
  visited[node] = true;
  for (int neighbor : adj[node]) {
    if (!visited[neighbor]) {
      DFSRecursive(adj, neighbor, visited);
    }
  }
}`}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}