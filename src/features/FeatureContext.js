import React, { createContext, useContext, useState, useEffect } from 'react';
import { FEATURES, MOODS } from './featureConfig';

const FeatureContext = createContext();

export const FeatureProvider = ({ children }) => {
  const [activeFeatures, setActiveFeatures] = useState({});
  const [currentMood, setCurrentMood] = useState(MOODS.NEUTRAL);
  const [userStats, setUserStats] = useState({
    tasksCompleted: 0,
    questsCompleted: 0,
    rewardsEarned: 0,
    doomModeSessions: 0,
    totalProductivityTime: 0
  });
  const [ghostTasks, setGhostTasks] = useState([]);
  const [activeQuests, setActiveQuests] = useState([]);
  const [gachaPoints, setGachaPoints] = useState(0);

  // Initialize features from localStorage
  useEffect(() => {
    const savedFeatures = localStorage.getItem('activeFeatures');
    if (savedFeatures) {
      setActiveFeatures(JSON.parse(savedFeatures));
    } else {
      // Initialize with default enabled features
      const defaultFeatures = Object.entries(FEATURES).reduce((acc, [key, feature]) => {
        acc[key] = feature.enabled;
        return acc;
      }, {});
      setActiveFeatures(defaultFeatures);
      localStorage.setItem('activeFeatures', JSON.stringify(defaultFeatures));
    }
  }, []);

  // Save features to localStorage when they change
  useEffect(() => {
    localStorage.setItem('activeFeatures', JSON.stringify(activeFeatures));
  }, [activeFeatures]);

  const toggleFeature = (featureId) => {
    setActiveFeatures(prev => ({
      ...prev,
      [featureId]: !prev[featureId]
    }));
  };

  const updateMood = (mood) => {
    setCurrentMood(mood);
    localStorage.setItem('currentMood', JSON.stringify(mood));
  };

  const addGhostTask = (task) => {
    setGhostTasks(prev => [...prev, { ...task, id: Date.now() }]);
  };

  const removeGhostTask = (taskId) => {
    setGhostTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const addQuest = (quest) => {
    setActiveQuests(prev => [...prev, { ...quest, id: Date.now() }]);
  };

  const completeQuest = (questId) => {
    setActiveQuests(prev => prev.filter(quest => quest.id !== questId));
    setUserStats(prev => ({
      ...prev,
      questsCompleted: prev.questsCompleted + 1
    }));
  };

  const updateStats = (statType, value) => {
    setUserStats(prev => ({
      ...prev,
      [statType]: prev[statType] + value
    }));
  };

  const addGachaPoints = (points) => {
    setGachaPoints(prev => prev + points);
  };

  const contextValue = {
    activeFeatures,
    toggleFeature,
    currentMood,
    updateMood,
    userStats,
    updateStats,
    ghostTasks,
    addGhostTask,
    removeGhostTask,
    activeQuests,
    addQuest,
    completeQuest,
    gachaPoints,
    addGachaPoints
  };

  return (
    <FeatureContext.Provider value={contextValue}>
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatures = () => {
  const context = useContext(FeatureContext);
  if (!context) {
    throw new Error('useFeatures must be used within a FeatureProvider');
  }
  return context;
}; 