'use client';

import React, { useState, useMemo } from 'react';

interface ScheduleItem {
  id: string;
  date: string;
  time: string;
  boxType: string;
}

const TimeSchedulingPage = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [boxType, setBoxType] = useState('');
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedDate, setEditedDate] = useState('');
  const [editedTime, setEditedTime] = useState('');
  const [editedBoxType, setEditedBoxType] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSave = () => {
    if (!date || !time || !boxType) {
      setErrorMessage('Please fill in all the details.'); // Set error message
      return;
    }

    const id = Date.now().toString();
    const newScheduleItem: ScheduleItem = {
      id,
      date,
      time,
      boxType,
    };
    setSchedule([...schedule, newScheduleItem]);
    setDate('');
    setTime('');
    setBoxType('');
    setErrorMessage(''); // Clear error message after successful save
  };

  const handleDelete = (id: string) => {
    setSchedule(schedule.filter((item) => item.id !== id));
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingId(item.id);
    setEditedDate(item.date);
    setEditedTime(item.time);
    setEditedBoxType(item.boxType);
  };

  const handleUpdate = () => {
    setSchedule(
      schedule.map((item) =>
        item.id === editingId
          ? { ...item, date: editedDate, time: editedTime, boxType: editedBoxType }
          : item
      )
    );
    setEditingId(null);
  };

  const boxTypeOptions = ['A', 'B', 'C'];

  const sortedSchedule = useMemo(() => {
    return [...schedule].sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA.getTime() - dateTimeB.getTime();
    });
  }, [schedule]);

  return (
    <div
      className="flex min-h-screen text-gray-800"
      style={{
        backgroundColor: '#ADD8E6',
      }}
    >
      {/* Left Side: Scheduling Form */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Time Scheduling</h1>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold"> </strong>
              <span className="block sm:inline"> {errorMessage}</span>
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="boxType" className="block text-sm font-medium text-gray-700">
              Box Type
            </label>
            <select
              id="boxType"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={boxType}
              onChange={(e) => setBoxType(e.target.value)}
            >
              <option value="">Select Box Type</option>
              {boxTypeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>

      {/* Right Side: Display Scheduled Items */}
      <div className="w-1/2 flex justify-center items-center">
        {sortedSchedule.length > 0 ? (
          <div className="w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Scheduled Items</h2>
            <ul>
              {sortedSchedule.map((item) => (
                <li key={item.id} className="mb-2 p-4 border border-gray-300 rounded-md bg-white">
                  {editingId === item.id ? (
                    <>
                      {/* Edit Mode */}
                      <input
                        type="date"
                        value={editedDate}
                        onChange={(e) => setEditedDate(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                      />
                      <input
                        type="time"
                        value={editedTime}
                        onChange={(e) => setEditedTime(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                      />
                      <select
                        value={editedBoxType}
                        onChange={(e) => setEditedBoxType(e.target.value)}
                        className="w-full mb-2 p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Box Type</option>
                        {boxTypeOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      <div className="flex justify-end">
                        <button
                          onClick={handleUpdate}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* View Mode */}
                      <div>
                        <strong>Date:</strong> {item.date}
                      </div>
                      <div>
                        <strong>Time:</strong> {item.time}
                      </div>
                      <div>
                        <strong>Box Type:</strong> {item.boxType}
                      </div>
                      <div className="flex justify-end mt-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center">
            <p>No scheduled items yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeSchedulingPage;
