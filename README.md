#CPE-Web-App


## Running the app

```bash
npm install
npm run dev
```

## Building the app

```bash
npm run build
```

## Local development & LearnWise chatbot

The LearnWise chat embed runs in an **https** iframe. Browsers block it from reading tokens when the parent app is served over **http** (e.g. `http://localhost:5173`). So the chat may fail with CORS/403 errors on localhost.

**To test the chatbot locally**, serve the app over https using a tunnel:

1. Install [ngrok](https://ngrok.com/) (or use another HTTPS tunnel).
2. Start the app: `npm run dev`.
3. In another terminal, run: `ngrok http 5173` (or whatever port Vite uses).
4. Open the **https** URL ngrok gives you (e.g. `https://abc123.ngrok.io`) in the browser. The chatbot should work there.

Once deployed to an **https** host (e.g. production/staging), the chatbot works without any tunnel.

