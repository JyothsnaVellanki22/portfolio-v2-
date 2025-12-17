export const chatService = {
    async sendMessage(message, conversationId, onChunk, onComplete) {
        try {
            const response = await fetch('http://localhost:8003/chat/stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // TODO: Add auth when login is implemented on FE
                },
                body: JSON.stringify({ message, conversation_id: conversationId }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let accumulatedResponse = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value, { stream: true });
                accumulatedResponse += chunk;
                onChunk(accumulatedResponse);
            }

            onComplete();
        } catch (error) {
            console.error('Error sending message:', error);
            onChunk('Sorry, I encountered an error. Please check if the backend is running.');
            onComplete();
        }
    }
};
