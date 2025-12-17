import { useState } from 'react';
import { FaCommentDots, FaTimes } from 'react-icons/fa';
import ChatWindow from './ChatWindow';
import '../styles/ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chat-widget-container">
            {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}

            <button
                className="chat-toggle-btn"
                onClick={toggleChat}
                aria-label="Toggle Chat"
            >
                {isOpen ? <FaTimes className="chat-icon" /> : <FaCommentDots className="chat-icon" />}
            </button>
        </div>
    );
};

export default ChatWidget;
