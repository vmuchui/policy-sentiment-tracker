// src/App.tsx

import React, { useEffect, useState, useRef } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  // type ChartEvent,
  // type ActiveElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import { autoTable} from "jspdf-autotable";
import "./index.css";

ChartJS.register(ArcElement, Tooltip, Legend);

type Sentiment = "Positive" | "Neutral" | "Negative";

interface SentimentItem {
  headline: string;
  sentiment: Sentiment;
  score: number;
}

interface DashboardData {
  sentiments: SentimentItem[];
  keywords: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<Sentiment[]>([]);

  
  const [asPercentage, setAsPercentage] = useState(false);

  const chartRef = useRef<ChartJS<"pie"> | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("selectedSentiments");
    if (saved) {
      setSelected(JSON.parse(saved));
    }

    fetch("https://policy-sentiment-tracker.onrender.com/api/sentiment")
      .then((res) => res.json())
      .then((json: DashboardData) => setData(json))
      .catch((err) => console.error("Failed to fetch data:", err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedSentiments", JSON.stringify(selected));
  }, [selected]);

  if (loading || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="animate-pulse flex items-center space-x-8">
          <div className="w-64 h-64 rounded-full bg-gray-300" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-96 h-6 bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const counts: Record<Sentiment, number> = {
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  };
  data.sentiments.forEach((s) => counts[s.sentiment]++);
  const total = counts.Positive + counts.Neutral + counts.Negative;

  const labels: Sentiment[] = ["Positive", "Neutral", "Negative"];
  const values = labels.map((lab) =>
    asPercentage
      ? parseFloat(((counts[lab] / total) * 100).toFixed(1))
      : counts[lab]
  );
  const backgroundColor = ["#4ade80", "#facc15", "#f87171"];
  const pieData = {
    labels,
    datasets: [{ data: values, backgroundColor, borderWidth: 1 }],
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) =>
            asPercentage ? `${ctx.parsed}%` : ctx.parsed,
        },
      },
    },
    onClick: (evt: unknown) => {
      // const chartEvt = evt as ChartEvent;
      if (!chartRef.current) return;
      const elements = chartRef.current.getElementsAtEventForMode(
        evt as MouseEvent,
        "nearest",
        { intersect: true },
        false
      );
      if (elements.length) {
        const idx = elements[0].index!;
        const sentiment = labels[idx];
        setSelected((prev) =>
          prev.includes(sentiment)
            ? prev.filter((s) => s !== sentiment)
            : [ sentiment]
        );
      }
    },
  };

  const filtered = data.sentiments.filter((s) =>
    selected.length > 0 ? selected.includes(s.sentiment) : false
  );

  const exportCSV = () => {
    const header = ["Headline", "Sentiment", "Score"];
    const rows = filtered.map((r) => [
      `"${r.headline.replace(/"/g, '""')}"`,
      r.sentiment,
      r.score.toString(),
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "headlines.csv";
    a.click();
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Filtered Headlines", 14, 20);
    // (doc as any).
    autoTable(doc,{
      head: [["Headline", "Sentiment", "Score"]],
      body: filtered.map((r) => [r.headline, r.sentiment, r.score.toFixed(4)]),
      startY: 28,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
    });
    doc.save("headlines.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            📰 Policy Sentiment Tracker
          </h1>
          <p className="text-sm text-gray-500 italic">
            Powered by NLP & News Analytics
          </p>
        </div>
      </header>

      {/* Main */}
      <main className="flex-grow max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Controls */}
        <div className="flex items-center gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={asPercentage}
              onChange={() => setAsPercentage((v) => !v)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Show as percentage</span>
          </label>
          <span className="text-sm text-gray-600">
            (Click slices to multi‐select)
          </span>
        </div>

        {/* Sentiment Overview */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">📊 Sentiment Overview</h2>
          <div className="w-full h-64 relative">
            <Pie
              ref={chartRef as any}
              data={pieData}
              options={pieOptions}
            />
          </div>
          <div className="mt-4 flex justify-around text-sm text-gray-600">
            {labels.map((lab, i) => (
              <p key={lab} className="flex items-center gap-1">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ backgroundColor: backgroundColor[i] }}
                />
                {lab}:{" "}
                {asPercentage
                  ? `${values[i]}%`
                  : counts[lab]}
              </p>
            ))}
          </div>
        </section>

        {/* Filtered Headlines & Export */}
        {selected.length > 0 && (
          <section className="bg-white rounded-lg shadow p-6 space-y-4">
            <h2 className="text-lg font-medium">
              Showing {filtered.length} headline
              {filtered.length > 1 ? "s" : ""} with {" "}
              <span className="font-semibold">{selected.join(", ")} Sentiment</span>
            </h2>

            <ul className="max-h-64 overflow-y-auto divide-y">
              {filtered.map((h, idx) => (
                <li
                  key={idx}
                  className="flex justify-between py-2 text-sm"
                >
                  <span className="flex-1 pr-4">{h.headline}</span>
                  <span className="font-mono text-gray-600">
                    {h.score.toFixed(4)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex gap-4">
              <button
                onClick={exportCSV}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring"
              >
                Export CSV
              </button>
              <button
                onClick={exportPDF}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring"
              >
                Export PDF
              </button>
            </div>
          </section>
        )}
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
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Policy Sentiment Tracker —
        Built by Deven Cybersecurity Services
      </footer>
    </div>
  );
};

export default App;