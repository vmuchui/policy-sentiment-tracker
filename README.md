
# 📰 Policy Sentiment Tracker 🇰🇪

A Python-based tool for **scraping Kenyan news headlines**, **extracting trending keywords**, and performing **sentiment analysis** to track public sentiment on current events and policy matters.

---

## 🚀 Features

- ✅ Real-time scraping from major Kenyan news sites (Capital FM & Taifa Leo)
- ✅ Keyword extraction from headlines using NLTK
- ✅ Sentiment analysis using VADER (Positive, Negative, Neutral)
- ✅ Simple dashboard visualization of sentiment distribution
- ✅ Exports all results into a `.csv` file

---

## 📸 Example Output

```
📰 Latest Headlines:
1. Ruto’s deal with Hambee Starts: Sh600mn for CHAN title, reward for every match won
2. Kindiki calls for urgent action by KWS after hyenas mauled 14-year-old boy
...

🔍 Extracted Trending Keywords:
1. wakulima wa miwa kutimiza masharti magumu ya mikopo
2. sababu za natembeya na wamalwa kukoseshana usingizi
...

🧠 Sentiment Analysis:
- (Positive, Score=0.8126) Ruto’s deal with Hambee Starts...
- (Negative, Score=-0.6486) Police arrest notorious Kwale gang...
...

📊 Dashboard:
[A pie chart showing % distribution of Positive, Negative, and Neutral sentiments]
(Figure1.png)
```

---

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/EDGARDEVEN/policy-sentiment-tracker.git
cd policy-sentiment-tracker
```

### 2. Create a virtual environment (recommended)

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install the requirements

```bash
pip install -r requirements.txt
```

---

## ▶️ How to Run

```bash
python main.py
```

The script will:
- Fetch the latest headlines
- Extract keywords
- Analyze sentiment
- Display the sentiment dashboard
- Save the results to `output/sentiment_results_<date>.csv`

---

## 📂 Project Structure

```
policy-sentiment-tracker/
│
├── scraper/
│   └── news_headline_scraper.py        # Scrapes headlines from RSS feeds
│
├── analyzer/
│   ├── sentiment_analyzer.py           # Sentiment scoring logic (VADER)
│
├── dashboard/
│   └── sentiment_dashboard.py          # Simple pie chart visualization
│
├── utils/
│   └── keyword_extractor.py            # Extracts key phrases using NLTK
│
├── output/
│   └── sentiment_results_<date>.csv    # Auto-generated daily results
│
├── main.py                             # Entry point
├── requirements.txt
└── README.md
```

---

## 📌 Dependencies

- `feedparser`
- `nltk`
- `matplotlib`
- `pandas`

You can install them via:

```bash
pip install -r requirements.txt
```

---

## 📅 Future Enhancements

- Integrate Twitter/X for public opinion on policy matters
- Deploy as a live dashboard using Streamlit or Flask
- Auto-schedule daily analysis using cron or Task Scheduler
- Add notification/email support

---

## 🧠 Author

**Edgar Deven** – [GitHub](https://github.com/EDGARDEVEN)

Feel free to fork, modify, or contribute!

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
