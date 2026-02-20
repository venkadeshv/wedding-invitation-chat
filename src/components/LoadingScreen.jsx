import React, { useState } from 'react';
import { Lock, Unlock } from 'lucide-react';

const LoadingScreen = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [loaded, setLoaded] = useState(false);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setProgress(old => {
                if (old >= 100) {
                    clearInterval(interval);
                    setLoaded(true);
                    return 100;
                }
                return old + 2; // finish in ~2-3 secs
            });
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-screen" onClick={loaded ? onComplete : undefined} style={{ cursor: loaded ? 'pointer' : 'default' }}>
            {!loaded ? (
                <Lock size={48} color="#25D366" style={{ marginBottom: 20 }} />
            ) : (
                <Unlock size={48} color="#25D366" style={{ marginBottom: 20, animation: 'bounce 1s infinite' }} />
            )}

            <h2 style={{ color: '#075E54' }}>WhatsApp</h2>
            <p style={{ color: '#808080' }}>{loaded ? "Tap to Enter Chat" : "End-to-end encrypted"}</p>

            {!loaded && (
                <div className="progress-bar" style={{
                    width: '200px',
                    height: '4px',
                    background: '#ddd',
                    marginTop: 20,
                    borderRadius: 2,
                    overflow: 'hidden'
                }}>
                    <div style={{
                        width: `${progress}%`,
                        height: '100%',
                        background: '#25D366',
                        transition: 'width 0.1s'
                    }} />
                </div>
            )}
            <style>{`
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
      `}</style>
        </div>
    );
};

export default LoadingScreen;
