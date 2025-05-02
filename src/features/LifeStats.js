import React from 'react';
import { useFeatures } from './FeatureContext';

const StatCard = ({ title, value, icon, color }) => (
  <div style={{
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '150px'
  }}>
    <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
    <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
    <div style={{ color: color || '#b19cd9', fontSize: '14px' }}>{title}</div>
  </div>
);

const LifeStats = () => {
  const { userStats } = useFeatures();

  const formatTime = (ms) => {
    const hours = Math.floor(ms / 3600000);
    const minutes = Math.floor((ms % 3600000) / 60000);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
      background: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '12px',
      marginBottom: '20px'
    }}>
      <h3 style={{ color: 'white', marginBottom: '16px', textAlign: 'center' }}>
        Life Stats Dashboard
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '16px',
        marginBottom: '16px'
      }}>
        <StatCard
          title="Tasks Completed"
          value={userStats.tasksCompleted}
          icon="✅"
          color="#33cc33"
        />
        <StatCard
          title="Quests Completed"
          value={userStats.questsCompleted}
          icon="⚔️"
          color="#ffcc00"
        />
        <StatCard
          title="Rewards Earned"
          value={userStats.rewardsEarned}
          icon="🎁"
          color="#ff69b4"
        />
        <StatCard
          title="DOOM Sessions"
          value={userStats.doomModeSessions}
          icon="💀"
          color="#ff0000"
        />
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        padding: '16px',
        marginTop: '16px'
      }}>
        <h4 style={{ color: 'white', marginBottom: '12px' }}>Productivity Overview</h4>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{ fontSize: '24px' }}>⏱️</div>
          <div>
            <div style={{ color: 'white', fontSize: '18px' }}>
              Total Focus Time
            </div>
            <div style={{ color: '#b19cd9' }}>
              {formatTime(userStats.totalProductivityTime)}
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{ color: '#b19cd9', fontSize: '14px' }}>
          Last Updated: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default LifeStats; 