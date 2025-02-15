import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [state, setState] = useState("");
  const [news, setNews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(50);

  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  const formatStateName = (stateName) => {
    return stateName.toLowerCase().replace(/\s+/g, "-");
  };

  const fetchNews = async () => {
    if (!state) {
      setError("Please select a state.");
      return;
    }
    setError("");
    setLoading(true);
    setCountdown(50); 

    try {
      const formattedState = formatStateName(state);
      
     
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      const response = await axios.get(
        `https://news-app-3-bu1s.onrender.com/get_news?state=${formattedState}`
      );

      clearInterval(timer); 
      setLoading(false);
      
      if (Array.isArray(response.data)) {
        setNews(response.data);
      } else {
        setNews([]);
        setError("Invalid response from API.");
      }
    } catch (err) {
      setError("Failed to fetch news.");
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-900 to-gray-700 text-white p-6">

      <marquee className="text-lg font-bold text-yellow-400 py-2 w-full">
        🔥 Latest News Updates 🔥 🔥 Latest News Updates 🔥 🔥 Latest News Updates 🔥
      </marquee>

      <h1 className="text-4xl font-extrabold mt-4">Today's News</h1>

      <div className="flex space-x-2 mt-6">
        <select
          className="border font-bold p-2 rounded w-64 text-white bg-blue-400"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Select a state</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={fetchNews}
        >
          Get News
        </button>
      </div>

      {error && <p className="text-red-400 mt-2">{error}</p>}

    
      {loading && (
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Fetching news... ⏳ {countdown}s</p>
        </div>
      )}

      {!loading && (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
          {news.length > 0 ? (
            news.map((item, index) => (
              <div
                key={index}
                className="bg-gray-800 p-4 rounded-xl shadow-lg hover:scale-105 transition"
              >
                <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
              </div>
            ))
          ) : (
            <p className="text-gray-300 col-span-3 text-center">No news available</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
