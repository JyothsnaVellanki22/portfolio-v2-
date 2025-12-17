import { useState, useRef, useEffect } from 'react';
import { IoSend, IoClose } from 'react-icons/io5';
import { chatService } from '../services/chatService';

const ChatWindow = ({ onClose }) => {
    const [messages, setMessages] = useState([
        { id: 1, role: 'ai', content: 'Hi, Welcome to my portfolio! How can I help you today?' },
        // { id: 2, role: 'ai', content: 'What can I help you with?' } 
    ]);
    const [input, setInput] = useState('');
    const [conversationId, setConversationId] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { id: Date.now(), role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input; // Capture input for the call
        setInput('');

        // Create a placeholder for the AI response
        const aiMsgId = Date.now() + 1;
        setMessages(prev => [...prev, { id: aiMsgId, role: 'ai', content: '' }]);

        let fullContent = '';

        await chatService.sendMessage(
            currentInput,
            conversationId, // Pass conversation ID
            (chunk) => {
                // Check for Conversation ID prefix
                // Check for Conversation ID prefix in the accumulated chunk
                if (chunk.startsWith('__CONV_ID__:')) {
                    // Try to extract ID
                    const idPart = chunk.split('\n')[0];
                    if (idPart) {
                        const id = idPart.split(':')[1]?.trim();
                        if (id) setConversationId(parseInt(id));
                    }
                    // Do NOT return here, as chunk might contain more data (the actual message)
                }

                // Normal message handling
                fullContent = chunk;
                // If the chunk is just the ID, we already handled it. 
                // But the generator yields the ID then the text.
                // The chunk here is the ACCUMULATED text from the service if we use the old logic.
                // Wait, chatService.js accumulates: accumulatedResponse += chunk; onChunk(accumulatedResponse);
                // The backend yields: "__CONV_ID__:123\n" then "Hello" then " world"
                // So accumulatedResponse will be "__CONV_ID__:123\nHello" then "__CONV_ID__:123\nHello world"

                // We need to strip the ID prefix from the content we show.
                let displayContent = fullContent;
                if (displayContent.startsWith('__CONV_ID__:')) {
                    const parts = displayContent.split('\n');
                    if (parts.length > 0) {
                        // Remove the first line which is the ID
                        // parts[0] is "__CONV_ID__:..."
                        // We want the rest.
                        // However, since it's streaming, we might get partials.
                        // Let's rely on the fact that the ID comes first and newline.
                        const firstNewLine = displayContent.indexOf('\n');
                        if (firstNewLine !== -1) {
                            displayContent = displayContent.substring(firstNewLine + 1);
                        } else {
                            displayContent = ''; // Only ID received so far
                        }
                    }
                }

                setMessages(prev =>
                    prev.map(msg =>
                        msg.id === aiMsgId ? { ...msg, content: displayContent } : msg
                    )
                );
            },
            () => {
                // Complete
            }
        );
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-window">
            <div className="chat-header">
                <h3>ChatBot</h3>
                <button className="close-btn" onClick={onClose}>
                    <IoClose />
                </button>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.role}`}>
                        {msg.content}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    className="chat-input"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <button className="send-btn" onClick={handleSend} disabled={!input.trim()}>
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default ChatWindow;
