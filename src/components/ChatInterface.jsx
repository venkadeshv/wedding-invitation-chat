import React, { useRef, useEffect } from 'react';
import { ArrowLeft, MoreVertical, Phone, Video, Paperclip, Camera, Mic, Smile } from 'lucide-react';
import MessageBubble from './MessageBubble';

const ChatInterface = ({ messages, isTyping, typingSender }) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    return (
        <div className="app-container">
            {/* Header */}
            <div className="chat-header">
                <ArrowLeft size={20} />
                <div className="avatar">
                    {/* Placeholder avatar */}
                    <img src="https://via.placeholder.com/40" alt="Avatar" style={{ width: '100%', height: '100%' }} />
                </div>
                <div className="user-info" style={{ flex: 1 }}>
                    <h2>Wedding Plans 💍</h2>
                    <p>{isTyping ? `${typingSender} is typing...` : 'Online'}</p>
                </div>
                <Video size={20} />
                <Phone size={20} />
                <MoreVertical size={20} />
            </div>

            {/* Chat Area */}
            <div className="chat-area">
                {messages.map((msg, index) => (
                    <MessageBubble key={index} message={msg} />
                ))}

                {isTyping && (
                    <div className="message-row received">
                        <div className="message-bubble typing-indicator">
                            {typingSender} is typing...
                        </div>
                    </div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* Footer */}
            <div className="chat-footer">
                <Smile size={24} color="#808080" />
                <div style={{
                    flex: 1,
                    background: 'white',
                    borderRadius: 20,
                    padding: '8px 12px',
                    fontSize: 14,
                    color: '#808080',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <span>Message</span>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <Paperclip size={20} color="#808080" />
                        <Camera size={20} color="#808080" />
                    </div>
                </div>
                <div style={{
                    width: 40, height: 40,
                    borderRadius: '50%',
                    background: '#075E54',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Mic size={20} color="white" />
                </div>
            </div>
        </div>
    );
};

export default ChatInterface;
