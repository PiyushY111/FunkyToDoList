import React, { useState } from 'react';
import { GACHA_REWARDS } from './featureConfig';
import { useFeatures } from './FeatureContext';

const GachaSystem = () => {
  const { gachaPoints, addGachaPoints } = useFeatures();
  const [currentReward, setCurrentReward] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const getRandomReward = () => {
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const [rarity, data] of Object.entries(GACHA_REWARDS)) {
      cumulativeProbability += data.probability;
      if (random <= cumulativeProbability) {
        const reward = data.rewards[Math.floor(Math.random() * data.rewards.length)];
        return { rarity, reward };
      }
    }
    return { rarity: 'COMMON', reward: GACHA_REWARDS.COMMON.rewards[0] };
  };

  const spinGacha = () => {
    if (gachaPoints < 100 || isSpinning) return;
    
    setIsSpinning(true);
    addGachaPoints(-100);

    // Simulate spinning animation
    const spinDuration = 2000;
    const spinInterval = 100;
    const spins = spinDuration / spinInterval;
    let currentSpin = 0;

    const spinAnimation = setInterval(() => {
      currentSpin++;
      setCurrentReward(getRandomReward());

      if (currentSpin >= spins) {
        clearInterval(spinAnimation);
        setIsSpinning(false);
      }
    }, spinInterval);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '16px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: 'white', marginBottom: '12px' }}>Gacha System</h3>
      <div style={{ color: 'white', marginBottom: '12px' }}>
        Points: {gachaPoints}
      </div>
      
      <button
        onClick={spinGacha}
        disabled={gachaPoints < 100 || isSpinning}
        style={{
          background: gachaPoints >= 100 ? 'linear-gradient(45deg, #FFD700, #FFA500)' : '#666',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '25px',
          border: 'none',
          cursor: gachaPoints >= 100 ? 'pointer' : 'not-allowed',
          opacity: gachaPoints >= 100 ? 1 : 0.5,
          transition: 'all 0.3s ease',
          transform: isSpinning ? 'scale(0.95)' : 'scale(1)'
        }}
      >
        {isSpinning ? 'Spinning...' : 'Spin (100 points)'}
      </button>

      {currentReward && (
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>
            {currentReward.reward}
          </div>
          <div style={{ color: 'white', textTransform: 'capitalize' }}>
            {currentReward.rarity.toLowerCase()} Reward!
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

export default GachaSystem; 