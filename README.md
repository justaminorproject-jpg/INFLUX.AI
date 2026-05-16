# INFLUX.AI — Deploy to Vercel (powered by Groq)

Groq is free, extremely fast, and requires no credit card to start.

---

## Step 1 — Get your FREE Groq API key
1. Go to https://console.groq.com
2. Sign up (free — no credit card needed)
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)

---

## Step 2 — Push to GitHub
Unzip the folder, then in your terminal:
```bash
cd influx-ai
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/influx-ai.git
git push -u origin main
```

---

## Step 3 — Deploy on Vercel
1. Go to https://vercel.com → **Add New Project**
2. Import your GitHub repo — Vercel auto-detects Next.js
3. Click **Deploy**
4. Once live → **Settings → Environment Variables**
5. Add:
   - **Name:** `GROQ_API_KEY`
   - **Value:** `gsk_your_key_here`
6. Click **Save** → then **Redeploy**

Your app is live!

---

## Run locally
```bash
npm install
# Edit .env.local — paste your Groq key
npm run dev
# Open http://localhost:3000
```

---

## Change the AI model
Open `pages/api/claude.js` and swap the `model` field:

| Model | Speed | Best for |
|---|---|---|
| `llama-3.3-70b-versatile` | Fast | Best overall (default) |
| `llama-3.1-8b-instant` | Blazing | Quick captions, simple tasks |
| `mixtral-8x7b-32768` | Fast | Long scripts, 32K context |
| `gemma2-9b-it` | Fast | Short punchy content |

---

## Groq Free Tier Limits
- ~14,400 requests/day on most models
- No credit card required
- More than enough for personal use

---

## Notes
- Your API key lives only on the server (`pages/api/claude.js`) — never visible to users
- Saved Library uses `localStorage` — data stays in the user's browser per device
