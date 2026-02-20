import React from 'react';
import { Check, CheckCheck } from 'lucide-react';

const MessageBubble = ({ message }) => {
    const isSystem = message.type === 'system';
    const isRight = message.sender === 'Groom' || message.sender === 'Dad';

    if (isSystem) {
        return (
            <div className="message-row system">
                <div className="message-bubble icon-system">
                    {message.content}
                </div>
            </div>
        );
    }

    // Handle RSVP / Action Button
    if (message.type === 'button') {
        return (
            <div className="message-row system" style={{ margin: '20px 0' }}>
                <button
                    onClick={() => alert("🎉 Yay! Can't wait to see you there!")}
                    style={{
                        background: '#25D366',
                        color: 'white',
                        border: 'none',
                        padding: '12px 24px',
                        borderRadius: 24,
                        fontSize: 16,
                        fontWeight: 'bold',
                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                        cursor: 'pointer'
                    }}
                >
                    {message.content}
                </button>
            </div>
        )
    }

    return (
        <div className={`message-row ${isRight ? 'sent' : 'received'}`}>
            <div className="message-bubble">
                {!isRight && <div className="sender-name">{message.sender}</div>}

                {message.type === 'image' && (
                    <img src={message.content} alt="attachment" style={{ maxWidth: '100%', borderRadius: 8 }} />
                )}

                {message.type === 'text' && (
                    <div>{message.content}</div>
                )}

                <div className="msg-meta">
                    <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    {isRight && <CheckCheck size={14} color="#4fc3f7" />}
                </div>
            </div>
        </div>
    );
};

export default MessageBubble;
