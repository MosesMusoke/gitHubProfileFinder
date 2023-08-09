import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function UserData({ userData }) {
  return (
    <div className="mt-4">
      <img
        src={userData.avatar_url}
        alt={`${userData.login}'s Avatar`}
        className="w-16 h-16 rounded-full inline-block"
      />
      <h2 className="text-xl font-semibold">{userData.name}</h2>
      <p className="text-gray-600">@{userData.login}</p>
      <p className="mt-2">{userData.bio}</p>
      <div className="mt-2 flex">
        <a
          href={userData.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-500 hover:underline"
        >
          <FontAwesomeIcon icon={faGithub} className="mr-1" />
          GitHub Profile
        </a>
      </div>
    </div>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-semibold mb-4">GitHub Profile Viewer</h1>
        <div className="mb-4">
          <label htmlFor="username" className="block font-medium mb-1">
            GitHub Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              placeholder="Enter GitHub username"
              className="border p-2 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="absolute right-2 bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-600"
              onClick={fetchUserData}
            >
              Get Data
            </button>
          </div>
        </div>
        {userData ? (
          <UserData userData={userData} />
        ) : (
          <p className="text-center text-gray-600">
            Enter a GitHub username to fetch data.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;