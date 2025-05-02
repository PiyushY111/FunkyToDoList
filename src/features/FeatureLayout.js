import React from 'react';

const FeatureLayout = ({ children }) => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '20px',
      padding: '20px',
      background: 'linear-gradient(45deg, #1a0033, #330066)',
      fontFamily: "'Comic Sans MS', cursive, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated gradient bar at the top */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #ff00ff, #00ffff, #ff00ff)',
        backgroundSize: '200% 100%',
        animation: 'gradientMove 3s linear infinite',
        zIndex: 1000
      }} />

      {/* Header */}
      <div style={{
        gridColumn: '1 / -1',
        textAlign: 'center',
        marginBottom: '20px',
        padding: '20px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        backdropFilter: 'blur(10px)'
      }}>
        <h1 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#ff00ff',
          textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
          margin: 0
        }}>
          CRAZY TASKS
        </h1>
        <p style={{
          color: '#b19cd9',
          marginTop: '8px',
          fontSize: '18px'
        }}>
          Where organization meets chaos!
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        gridColumn: '1 / -1',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {children}
      </div>

      {/* Add CSS animations */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </div>
  );
};

export default FeatureLayout; 