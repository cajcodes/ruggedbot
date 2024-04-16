document.addEventListener("DOMContentLoaded", function () {
    const chatbotForm = document.getElementById("chatbot-form");
    const chatbotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatContainer = document.getElementById("chatbot-container");  // Updated from "chat-container"
  
    let conversationHistory = [
      {
        role: "system",
        content: "RuggedEdgeAIAssistant: Be professional, courteous, and brief. Provide concise responses and ask users questions to guide conversation. Located in Houston, RuggedEdge specializes in industrial digital transformation with purpose-built, industrial-grade, intrinsically-safe edge computing hubs with public/private 5G and enterprise-grade Wi-Fi 6 and Wi-Fi 6E connectivity ready to clip to your belt. Empower the future of industry with EdgeOne (class 1, div 1 & ATEX Zone 1) and EdgeTwo (class 1, div 2 & ATEX Zone 2) devices, seamlessly managed by the cloud-based EdgeConnect platform, which provides ease and reliability in managing connected devices and PPE like gas detectors, hearing protection, and handheld tools. Both devices ship August 2023. These are essential for operations and safety in the field. Visit our [products page](https://ruggededge.ai/products) for EdgeOne, EdgeTwo and EdgeConnect. Learn about Digital Tranformation, appilications, architecture, and industries on our [solutions page](https://ruggededge.ai/solutions). Our goals are to empower through innovation ([about page](https://ruggededge.ai/about)), enhance reliability, and reduce risks. Configure profiles and devices using EdgeConnect, and pair with tools. EdgeOne/Two provide alerts. For help, click 📞/✉️ above. FAQs are below the chat. Use Markdown for clarity when sharing steps, explanations, or URLs. Share steps one by one, asking for readiness before proceeding."
      }
    ];
  
    // Display greeting message
    addMessageToContainer("assistant", "Hi, I'm the RuggedEdge AI Assistant. How can I help you on your digital journey today?", chatbotMessages);
  
    async function sendMessageToAssistant(userMessage) {
      conversationHistory.push({ role: "user", content: userMessage });
      // Typing indicator
      const typingIndicator = document.createElement("div");
      typingIndicator.id = "ti";
      typingIndicator.classList.add("typing-indicator");
      const typingText = document.createElement("span");
      typingText.textContent = "I'm typing";
      typingIndicator.appendChild(typingText);
  
      for (let i = 0; i < 3; i++) {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        typingIndicator.appendChild(dot);
      }
  
      chatContainer.appendChild(typingIndicator);
      typingIndicator.style.display = "inline-flex"; // set the display property to make the indicator visible
  
      try {
        const response = await axios.post(
          "https://us-central1-codebot-project.cloudfunctions.net/chatBotGpt4",
          { messages: conversationHistory }
        );
  
        chatContainer.removeChild(typingIndicator);  // Updated from "chatbotMessages"
  
        conversationHistory.push({ role: "assistant", content: response.data.message });
  
        return response.data.message;
      } catch (error) {
        console.error("Error while sending message to assistant:", error);
        chatContainer.removeChild(typingIndicator);  // Updated from "chatbotMessages"
        return "Error: Unable to process your request.";
      }
    }
  
    function addMessageToContainer(role, message, container) {
      const converter = new showdown.Converter();
      const htmlContent = converter.makeHtml(message);
  
      const messageElement = document.createElement("div");
  
      if (role === "user") {
        messageElement.classList.add("user-message");
        messageElement.setAttribute('style', 'color: white;');
      } else if (role === "assistant") {
        messageElement.classList.add("assistant-message");
        messageElement.setAttribute('style', 'color: black;');
      }
  
      messageElement.innerHTML = htmlContent;
      container.appendChild(messageElement);
  
      // Scroll the chat to the bottom
      container.scrollTop = container.scrollHeight;
    }
  
    chatbotForm.addEventListener("submit", async function (event) {
      event.preventDefault();
  
      const userMessage = chatbotInput.value.trim();
      if (userMessage === "") return;
  
      addMessageToContainer("user", userMessage, chatbotMessages);
  
      chatbotInput.value = "";
  
      try {
        const assistantResponse = await sendMessageToAssistant(userMessage);
        addMessageToContainer("assistant", assistantResponse, chatbotMessages);
      } catch (error) {
        console.error("Error in sendMessageToAssistant:", error);
        addMessageToContainer("assistant", "Error: Unable to process your request.", chatbotMessages);
      }
    });
  });
  