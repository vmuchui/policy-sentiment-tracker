
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

First, ensure you have the required NLTK data files. On the terminal run:

```bash
python -m nltk.downloader punkt stopwords vader_lexicon punkt_tab  # This will download the required nltk data
```

Then, run the main script:

```bash
python main.py
```

The script will:
- Fetch the latest headlines
- Extract keywords
- Analyze sentiment
- Display the sentiment dashboard
- Save the results to `exports/sentiment_results_<date>.csv and backend/results.json`

Then, run the local server:
1. Open a terminal and navigate to the `backend` directory.
2. Start the server using:  
```bash
uvicorn main:app --reload
```
3. Open your browser and go to `http://127.0.1:8000/api/sentiment`. To confirm its working, you should see a JSON response with the latest sentiment analysis results.

To run the frontend:
1. Open a new terminal and navigate to the `frontdash` directory.
2. Start the frontend using:
```bash
npm install  # Install dependencies
npm run dev  # Start the development server
```
3. Update the `fetch_url` in `frontdash/src/App.tsx` on line 23 to point to your backend server, e.g., `http://127.0.1:8000/api/sentiment`.

4. Open your browser and go to `http://localhost:5173/`. You should see the sentiment dashboard with the latest analysis results.

---

## 📅 Future Enhancements

- Integrate Twitter/X for public opinion on policy matters
- Deploy as a live dashboard using Streamlit or Flask
- Auto-schedule daily analysis using cron or Task Scheduler
- Add notification/email support

---

## 🧠 Author

**Edgar Deven** – [GitHub](https://github.com/EDGARDEVEN)

Check License for details on contribution.

---

## 📄 License

This project is licensed under the [CommercialLicense](LICENSE).
