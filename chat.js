const chatbotIcon = document.getElementById('chatbot-icon');
const closeChatbot = document.getElementById('close-chatbot');

const chatbotContainer = document.getElementById('chatbot-container');
const chatbotMessages = document.getElementById('chatbot-messages');
const userInput = document.getElementById('user-input');
const sendMessage = document.getElementById('send-message');

chatbotIcon.addEventListener('click', () => {
    chatbotContainer.style.display = 'flex';
    chatbotIcon.style.display = 'none';
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
    chatbotIcon.style.display = 'flex';
});

sendMessage.addEventListener('click', sendUserMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendUserMessage();
    }
});

function sendUserMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user-message');
        userInput.value = '';
        getBotResponse(message);
    }
}

function addMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getBotResponse(message) {
    try {
        const response = await fetch('https://wild-kristi-spyrosigma-81e0cee1.koyeb.app/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message }),
        });
        const data = await response.json();
        console.log(data)
        addMessage(data, 'bot-message');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, I encountered an error. Please try again later.', 'bot-message');
    }
}
