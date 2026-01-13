# How to Share Your App

Since this is a Web Application, you can't just send a single file (like an .exe or .apk). Instead, you have two main options to share it:

## Option 1: Share on Local WiFi (Instant)
You can let anyone on your same WiFi network access the app immediately.

1.  Make sure your computer and your junior's phone/laptop are on the **same WiFi**.
2.  I have updated the start command. Just restart the app.
3.  Look at the terminal output for **Network: http://192.168.x.x:5173**.
4.  Share that link with your juniors. They can open it on their phones and install it as an App!

## Option 2: Deploy Online (Permanent)
To share it with anyone, anywhere, you need to host it online.

### Step 1: Database (MongoDB Atlas)
1.  Go to [MongoDB Atlas](https://www.mongodb.com/atlas).
2.  Create a free cluster.
3.  Get the **Connection String** (looks like `mongodb+srv://...`).
4.  Replace your local `MONGO_URI` in `.env` with this new string.

### Step 2: Backend (Render.com)
1.  Push your code to **GitHub**.
2.  Go to [Render](https://render.com).
3.  Create a **New Web Service**.
4.  Connect your GitHub repo.
5.  Set `Root Directory` to `server`.
6.  Set `Build Command` to `npm install`.
7.  Set `Start Command` to `npm start`.
8.  Add your Environment Variables (`MONGO_URI`, `GEMINI_API_KEY`).

### Step 3: Frontend (Vercel)
1.  Go to [Vercel](https://vercel.com).
2.  Import your GitHub repo.
3.  Set `Root Directory` to `client`.
4.  Deploy!
5.  **Important**: You will need to update the API URL in your frontend code (currently `localhost:5000`) to your new Render Backend URL.

## Option 3: Android APK (Advanced)
If you really want an `.apk` file:
1.  You need to deploy the app online first (Option 2).
2.  Go to [PWABuilder](https://www.pwabuilder.com/).
3.  Enter your website URL.
4.  Download the **Android Package**.
