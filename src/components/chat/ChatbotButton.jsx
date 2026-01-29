import { useEffect } from "react";

export default function LearnWiseEmbed() {
  useEffect(() => {
    if (window.learnWiseInjected) return;
    window.learnWiseInjected = true;

    window.learnWiseSetup = {
      host: "https://aiden.learnwise.ai",
      chatSrc: "https://chat.learnwise.ai",
      assistantId: "Deq_k44qEFKo",
      region: "us",
    };

    const s = document.createElement("script");
    s.src = window.learnWiseSetup.host + "/chat_launcher.js";
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return null;
} 