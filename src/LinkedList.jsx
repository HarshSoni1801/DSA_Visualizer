import React, { useState, useEffect } from 'react';

const LinkedList = () => {
  const [list, setList] = useState([1,2]);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [messageVariant, setMessageVariant] = useState('bg-blue-100 text-blue-800');
  const [searchValue, setSearchValue] = useState('');
  const [highlightedIndexes, setHighlightedIndexes] = useState([]);

  // Clear highlights after 2 seconds
  useEffect(() => {
    if (highlightedIndexes.length > 0) {
      const timer = setTimeout(() => {
        setHighlightedIndexes([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [highlightedIndexes]);

  const showMessage = (text, variant) => {
    setMessage(text);
    setMessageVariant(variant);
  };

  // Add node to front
  const addFront = () => {
    if (!inputValue.trim()) {
      showMessage('Please enter a value to add', 'bg-red-100 text-red-800');
      return;
    }
    setList([inputValue, ...list]);
    setInputValue('');
    showMessage(`Added "${inputValue}" to front`, 'bg-green-100 text-green-800');
  };

  // Add node to rear
  const addRear = () => {
    if (!inputValue.trim()) {
      showMessage('Please enter a value to add', 'bg-red-100 text-red-800');
      return;
    }
    setList([...list, inputValue]);
    setInputValue('');
    showMessage(`Added "${inputValue}" to rear`, 'bg-green-100 text-green-800');
  };

  // Delete from front
  const deleteFront = () => {
    if (list.length === 0) {
      showMessage('List is empty - nothing to delete', 'bg-red-100 text-red-800');
      return;
    }
    const deletedValue = list[0];
    setList(list.slice(1));
    showMessage(`Deleted "${deletedValue}" from front`, 'bg-yellow-100 text-yellow-800');
  };

  // Delete from rear
  const deleteRear = () => {
    if (list.length === 0) {
      showMessage('List is empty - nothing to delete', 'bg-red-100 text-red-800');
      return;
    }
    const deletedValue = list[list.length - 1];
    setList(list.slice(0, -1));
    showMessage(`Deleted "${deletedValue}" from rear`, 'bg-yellow-100 text-yellow-800');
  };

  // Delete specific node
  const deleteNode = (index) => {
    const deletedValue = list[index];
    setList(list.filter((_, i) => i !== index));
    showMessage(`Deleted node with value "${deletedValue}"`, 'bg-yellow-100 text-yellow-800');
  };

  // Add node after specific index
  const addAfterNode = (index) => {
    if (!inputValue.trim()) {
      showMessage('Please enter a value to insert', 'bg-red-100 text-red-800');
      return;
    }
    const newList = [...list];
    newList.splice(index + 1, 0, inputValue);
    setList(newList);
    setInputValue('');
    showMessage(`Added "${inputValue}" after position ${index + 1}`, 'bg-green-100 text-green-800');
  };

  // Find element with highlighting
  const findElement = () => {
    if (!searchValue.trim()) {
      showMessage('Please enter a value to search', 'bg-red-100 text-red-800');
      return;
    }
    
    const foundIndexes = [];
    list.forEach((item, index) => {
      if (item.toString() === searchValue.toString()) {
        foundIndexes.push(index);
      }
    });
    
    setHighlightedIndexes(foundIndexes);
    
    if (foundIndexes.length === 0) {
      showMessage(`"${searchValue}" not found in list`, 'bg-red-100 text-red-800');
    } else if (foundIndexes.length === 1) {
      showMessage(`"${searchValue}" found at position ${foundIndexes[0] + 1}`, 'bg-green-100 text-green-800');
    } else {
      showMessage(
        `"${searchValue}" found at positions: ${foundIndexes.map(i => i + 1).join(', ')}`, 
        'bg-green-100 text-green-800'
      );
    }
  };

  const resetList = () => {
    setList([]);
    showMessage('List has been reset', 'bg-indigo-100 text-indigo-800');
  };

  const isEmpty = () => {
    showMessage(
      list.length === 0 ? 'List is empty' : `List has ${list.length} items`, 
      'bg-blue-100 text-blue-800'
    );
  };

  return (
    <div className="w-full text-white fade-delay">
      <h1 className="text-5xl font-bold mb-10">Linked List Visualization</h1>
      

      {/* Linked List Visualization */}
      <div className="bg-gray-900 w-[90%] max-w-6xl mx-auto text-white rounded-lg shadow-md overflow-hidden p-6 mb-8">
        <h2 className="text-2xl font-semibold text-center mb-4">Linked List</h2>
        
        <div className="flex justify-start w-full h-[150px] rounded-md p-4 bg-gray-800 overflow-x-auto custom-scrollbar">
  {list.length === 0 ? (
    <div className="italic w-full h-full flex items-center justify-center">Empty</div>
  ) : (
    <div className="flex items-center gap-4 min-w-max">
      {list.map((item, index) => (
        <div key={index} className="flex items-center">
          {/* Node Container */}
          <div className="flex flex-col items-center mx-2">
            {/* Node with search highlight */}
            <div
              className={`relative transition-all duration-200 ${
                highlightedIndexes.includes(index) ? 'ring-4 ring-yellow-400 animate-pulse' : ''
              }`}
            >
              <div
                className={`w-20 py-3 px-2 text-center rounded-md text-white ${
                  index === 0
                    ? 'bg-red-600 hover:bg-red-700'
                    : index === list.length - 1
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                } ${highlightedIndexes.includes(index) ? 'scale-110' : ''}`}
              >
                {item}
                {index === 0 && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                    HEAD
                  </span>
                )}
                {index === list.length - 1 && (
                  <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-600 text-white text-xs px-2 py-1 rounded-md">
                    TAIL
                  </span>
                )}
              </div>
              {/* Delete Node Button */}
              <button
                onClick={() => deleteNode(index)}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>

          {/* Arrow between nodes */}
          {index < list.length - 1 && (
            <div className="relative mx-1">
              <div className="flex items-center">
                <div className="w-12 h-0.5 bg-gray-400"></div>
                <div className="w-2 h-2 border-r-2 border-t-2 border-gray-400 transform rotate-45"></div>
              </div>
              {/* Add Node Button */}
              <button
                onClick={() => addAfterNode(index)}
                className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded-md"
              >
                Add
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )}
        </div>
      </div>

         {/* Message display */}
         <div className='mx-auto max-w-1/2 mb-6 h-10 rounded-md text-center flex items-center justify-center opacity-50'>
            {message && (
               <div className={`${messageVariant} h-full w-full flex items-center justify-center rounded-md`}>
                  {message}
               </div>
            )}
         </div>
      {/* Main Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-6xl mx-auto">
        <button
          onClick={addFront}
          className="px-5 py-3 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Front
        </button>
        
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter value"
          className="px-2 py-3 min-w-[120px] rounded-md bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
        
        <button
          onClick={addRear}
          className="px-5 py-3 bg-blue-600 cursor-pointer text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Rear
        </button>
        
        <button
          onClick={deleteFront}
          className="px-5 py-3 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Front
        </button>
        
        <button
          onClick={deleteRear}
          className="px-5 py-3 cursor-pointer bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Delete Rear
        </button>
      </div>

      {/* Search Controls */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-6xl mx-auto">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search value"
          className="px-2 py-3 min-w-[150px] bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
        />
        
        <button
          onClick={findElement}
          className="px-5 py-3 cursor-pointer bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Find
        </button>
        
        <button
          onClick={isEmpty}
          className="px-5 py-3 cursor-pointer bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          Check Empty
        </button>
        
        <button
          onClick={resetList}
          className="px-5 py-3 cursor-pointer bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Reset List
        </button>
      </div>

      {/* Algorithm Information */}
      <div className="mt-20 px-6 md:px-2 text-white max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold border-b-2 border-gray-600 pb-2 mb-8">
    About Linked List Data Structure
  </h2>
  <div className="grid md:grid-cols-2 gap-4">
    {/* Left Column: Algorithm, Time & Space Complexity, Learn More */}
    <div className="space-y-10">
      {/* Algorithm Steps */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Features:</h3>
        <ul className="list-disc pl-6 text-gray-200 space-y-1 text-base">
          <li>Linear collection of data elements called nodes</li>
          <li>Each node contains data and a pointer/reference to the next node</li>
          <li>Dynamic data structure that can grow/shrink at runtime</li>
          <li>Insertion and deletion at any position is efficient</li>
          <li>No memory waste (allocates memory as needed)</li>
          <li>Used to implement stacks, queues, and other data structures</li>
        </ul>
      </div>

      {/* Time Complexity */}
      <div>
        <h3 className="text-xl font-semibold">Time Complexity:</h3>
        <ul className="list-disc pl-6 text-gray-200 space-y-1">
          <li>
            Insertion at head: <span className="font-mono text-yellow-400">O(1)</span>
          </li>
          <li>
            Insertion at tail: <span className="font-mono text-yellow-400">O(1)</span> (with tail pointer)
          </li>
          <li>
            Deletion at head: <span className="font-mono text-yellow-400">O(1)</span>
          </li>
          <li>
            Deletion at tail: <span className="font-mono text-yellow-400">O(n)</span>
          </li>
          <li>
            Search/Access: <span className="font-mono text-yellow-400">O(n)</span>
          </li>
        </ul>
      </div>

      {/* Space Complexity */}
      <div>
        <h3 className="text-xl font-semibold">Space Complexity:</h3>
        <p className="text-base text-gray-200">
          O(n) – Where n is the number of elements stored in the list<br />
          (Extra space required for pointers/references)
        </p>
      </div>

      {/* Learn More */}
      <div>
        <a
          href="https://www.geeksforgeeks.org/data-structures/linked-list/"
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
      <pre className="bg-gray-900 rounded p-4 overflow-x-auto text-sm text-green-200 max-h-136 overflow-y-auto">
        <code>{`#include <iostream>
using namespace std;

struct Node {
    int data;
    Node* next;
};

class LinkedList {
    Node* head;
    Node* tail;
    
public:
    LinkedList() : head(nullptr), tail(nullptr) {}
    
    void insertFront(int value) {
        Node* newNode = new Node{value, head};
        head = newNode;
        if (!tail) tail = head;
    }
    
    void insertRear(int value) {
        if (!head) {
            insertFront(value);
            return;
        }
        Node* newNode = new Node{value, nullptr};
        tail->next = newNode;
        tail = newNode;
    }
    
    void deleteFront() {
        if (!head) return;
        Node* temp = head;
        head = head->next;
        delete temp;
        if (!head) tail = nullptr;
    }
    
    void deleteRear() {
        if (!head) return;
        if (head == tail) {
            deleteFront();
            return;
        }
        Node* current = head;
        while (current->next != tail) {
            current = current->next;
        }
        delete tail;
        tail = current;
        tail->next = nullptr;
    }
    
    void display() {
        Node* current = head;
        while (current) {
            cout << current->data << " -> ";
            current = current->next;
        }
        cout << "NULL" << endl;
    }
};

int main() {
    LinkedList list;
    list.insertFront(10);
    list.insertRear(20);
    list.insertFront(5);
    list.display();  // 5 -> 10 -> 20 -> NULL
    
    list.deleteFront();
    list.deleteRear();
    list.display();  // 10 -> NULL
    
    return 0;
}`}</code>
      </pre>
    </div>
  </div>
</div>
    </div>
  );
};

export default LinkedList;