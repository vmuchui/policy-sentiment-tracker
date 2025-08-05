import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./index.css";

ChartJS.register(ArcElement, Tooltip, Legend);

interface SentimentItem {
  sentiment: "Positive" | "Neutral" | "Negative";
  score: number;
  headline: string;
}

interface DashboardData {
  sentiments: SentimentItem[];
  keywords: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("https://policy-sentiment-tracker.onrender.com/api/sentiment")
      .then((res) => res.json())
      .then((json: DashboardData) => setData(json))
      .catch((err) => console.error("Failed to fetch data:", err));
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-700">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  const sentimentCounts = {
    Positive: data.sentiments.filter((s) => s.sentiment === "Positive").length,
    Neutral: data.sentiments.filter((s) => s.sentiment === "Neutral").length,
    Negative: data.sentiments.filter((s) => s.sentiment === "Negative").length,
  };

  const pieData = {
    labels: ["Positive", "Neutral", "Negative"],
    datasets: [
      {
        data: Object.values(sentimentCounts),
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
  responsive: true,
  maintainAspectRatio: false, // allows height control
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            📰 Policy Sentiment Tracker
          </h1>
          <p className="text-center text-sm mt-1 opacity-90">
          Tracking real-time public sentiment on current policy issues
          </p>
          <span className="text-sm text-gray-500 italic">
            Powered by NLP & News Analytics
          </span>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10">
        {/* Overview */}
        <section className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">📊 Sentiment Overview</h2>
          <div className="w-64 h-64 mx-auto">
          <Pie data={pieData} options={pieOptions} />
          </div>
          <div className="mt-4 flex justify-around text-sm text-gray-600">
            <p>✅ Positive: {sentimentCounts.Positive}</p>
            <p>⚖️ Neutral: {sentimentCounts.Neutral}</p>
            <p>❌ Negative: {sentimentCounts.Negative}</p>
          </div>
        </section>

        {/* Keywords and Headlines */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-3">🔍 Top Trending Keywords</h2>
            <div className="flex flex-wrap gap-2">
              {data.keywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {kw}
                </span>
              ))}
            </div>
          </section>

          <section className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-3">📰 Recent Headlines</h2>
            <ul className="space-y-3 max-h-[350px] overflow-y-auto">
              {data.sentiments.map((item, idx) => (
                <li key={idx} className="border-b pb-2 text-sm">
                  <span
                    className={`font-semibold mr-2 ${
                      item.sentiment === "Positive"
                        ? "text-green-600"
                        : item.sentiment === "Negative"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  {item.headline}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t text-center text-sm text-gray-500 py-4">
        <p>
          © {new Date().getFullYear()} Policy Sentiment Tracker - Built by Deven Cybersecurity Services
        </p>
      </footer>
    </div>
  );
};

export default App;
