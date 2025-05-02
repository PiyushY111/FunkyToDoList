import React from 'react';
import { MOODS } from './featureConfig';
import { useFeatures } from './FeatureContext';

const MoodSelector = () => {
  const { currentMood, updateMood } = useFeatures();

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
      <h3 style={{ color: 'white', marginBottom: '12px' }}>Current Mood</h3>
      <div style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }}>
        {Object.values(MOODS).map(mood => (
          <button
            key={mood.id}
            onClick={() => updateMood(mood)}
            style={{
              background: currentMood.id === mood.id ? mood.color : 'transparent',
              border: `2px solid ${mood.color}`,
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              transform: currentMood.id === mood.id ? 'scale(1.1)' : 'scale(1)',
              boxShadow: currentMood.id === mood.id ? `0 0 10px ${mood.color}` : 'none'
            }}
          >
            {mood.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector; 