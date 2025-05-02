import React, { useState, useEffect } from 'react';
import { DOOM_MODE_SETTINGS } from './featureConfig';
import { useFeatures } from './FeatureContext';

const DoomMode = () => {
  const { updateStats } = useFeatures();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DOOM_MODE_SETTINGS.timeLimit);
  const [breaksLeft, setBreaksLeft] = useState(DOOM_MODE_SETTINGS.maxBreaks);
  const [intensity, setIntensity] = useState(DOOM_MODE_SETTINGS.intensityLevels[0]);
  const [isBreak, setIsBreak] = useState(false);
  const [punishmentActive, setPunishmentActive] = useState(false);

  useEffect(() => {
    let timer;
    if (isActive && !isBreak && !punishmentActive) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 0) {
            clearInterval(timer);
            handleSessionComplete();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive, isBreak, punishmentActive]);

  const handleSessionComplete = () => {
    setIsActive(false);
    updateStats('doomModeSessions', 1);
    updateStats('totalProductivityTime', DOOM_MODE_SETTINGS.timeLimit);
  };

  const startDoomMode = () => {
    setIsActive(true);
    setTimeLeft(DOOM_MODE_SETTINGS.timeLimit);
    setBreaksLeft(DOOM_MODE_SETTINGS.maxBreaks);
    setPunishmentActive(false);
  };

  const takeBreak = () => {
    if (breaksLeft > 0 && !isBreak) {
      setIsBreak(true);
      setBreaksLeft(prev => prev - 1);
      setTimeout(() => {
        setIsBreak(false);
      }, DOOM_MODE_SETTINGS.breakTime);
    }
  };

  const activatePunishment = () => {
    setPunishmentActive(true);
    setTimeout(() => {
      setPunishmentActive(false);
    }, DOOM_MODE_SETTINGS.punishmentDelay);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      background: isActive ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      marginBottom: '20px',
      transition: 'all 0.3s ease',
      transform: punishmentActive ? 'scale(0.95)' : 'scale(1)'
    }}>
      <h3 style={{ 
        color: isActive ? '#ff0000' : 'white',
        marginBottom: '12px',
        textShadow: isActive ? '0 0 10px #ff0000' : 'none'
      }}>
        DOOM MODE
      </h3>

      {!isActive ? (
        <div style={{ textAlign: 'center' }}>
          <select
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            style={{
              background: '#333',
              color: 'white',
              padding: '8px',
              borderRadius: '4px',
              marginBottom: '12px'
            }}
          >
            {DOOM_MODE_SETTINGS.intensityLevels.map(level => (
              <option key={level} value={level}>
                {level.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            onClick={startDoomMode}
            style={{
              background: 'linear-gradient(45deg, #ff0000, #990000)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            START DOOM MODE
          </button>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontSize: '36px',
            color: isBreak ? '#00ff00' : '#ff0000',
            marginBottom: '12px'
          }}>
            {formatTime(timeLeft)}
          </div>
          <div style={{ color: 'white', marginBottom: '12px' }}>
            Breaks Left: {breaksLeft}
          </div>
          <button
            onClick={takeBreak}
            disabled={breaksLeft === 0 || isBreak}
            style={{
              background: breaksLeft > 0 ? 'linear-gradient(45deg, #00ff00, #009900)' : '#666',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: breaksLeft > 0 ? 'pointer' : 'not-allowed',
              marginBottom: '12px',
              opacity: breaksLeft > 0 ? 1 : 0.5
            }}
          >
            {isBreak ? 'BREAK IN PROGRESS' : 'TAKE BREAK'}
          </button>
          <button
            onClick={activatePunishment}
            style={{
              background: 'linear-gradient(45deg, #ff0000, #990000)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            PUNISHMENT
          </button>
        </div>
      )}

      <style>
        {`
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
          }
        `}
      </style>
    </div>
  );
};

export default DoomMode; 