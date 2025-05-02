export const FEATURES = {
  MOOD_SORTING: {
    id: 'mood_sorting',
    name: 'Mood-Based Task Sorting',
    type: 'productivity',
    description: 'Sort and display tasks based on your current mood',
    icon: '🎭',
    enabled: true,
    requiresAuth: false
  },
  PROCRASTINATION_MODE: {
    id: 'procrastination_mode',
    name: 'Procrastination Mode',
    type: 'fun',
    description: 'Entertaining distractions while you delay tasks',
    icon: '🎮',
    enabled: true,
    requiresAuth: false
  },
  LIFE_QUESTS: {
    id: 'life_quests',
    name: 'Random Life Quests',
    type: 'gamified',
    description: 'Daily side quests to make life more interesting',
    icon: '⚔️',
    enabled: true,
    requiresAuth: false
  },
  GHOST_TASKS: {
    id: 'ghost_tasks',
    name: 'Ghost Tasks',
    type: 'mystery',
    description: 'Mysterious tasks that appear contextually',
    icon: '👻',
    enabled: true,
    requiresAuth: false
  },
  GACHA_REWARDS: {
    id: 'gacha_rewards',
    name: 'Gacha Rewards',
    type: 'game_mechanics',
    description: 'Random rewards for completing tasks',
    icon: '🎲',
    enabled: true,
    requiresAuth: false
  },
  AI_TASKS: {
    id: 'ai_tasks',
    name: 'AI-Powered Auto Tasks',
    type: 'ai',
    description: 'Smart task suggestions and automation',
    icon: '🤖',
    enabled: false,
    requiresAuth: true
  },
  DOOM_MODE: {
    id: 'doom_mode',
    name: 'DOOM Mode',
    type: 'hardcore',
    description: 'Intense productivity mode for the brave',
    icon: '💀',
    enabled: true,
    requiresAuth: false
  },
  LIFE_STATS: {
    id: 'life_stats',
    name: 'Life Stats Dashboard',
    type: 'analytics',
    description: 'Detailed statistics about your productivity',
    icon: '📊',
    enabled: true,
    requiresAuth: false
  }
};

export const MOODS = {
  HAPPY: { id: 'happy', icon: '😊', color: '#FFD700' },
  NEUTRAL: { id: 'neutral', icon: '😐', color: '#A9A9A9' },
  SAD: { id: 'sad', icon: '😢', color: '#4682B4' },
  ANGRY: { id: 'angry', icon: '😠', color: '#FF4500' },
  EXCITED: { id: 'excited', icon: '🤩', color: '#FF69B4' },
  TIRED: { id: 'tired', icon: '😴', color: '#8B4513' }
};

export const QUEST_TYPES = {
  DAILY: 'daily',
  WEEKLY: 'weekly',
  SPECIAL: 'special',
  HIDDEN: 'hidden'
};

export const GACHA_REWARDS = {
  COMMON: { probability: 0.6, rewards: ['🌟', '🎯', '💫'] },
  RARE: { probability: 0.3, rewards: ['🏆', '🎪', '🎨'] },
  EPIC: { probability: 0.08, rewards: ['👑', '💎', '🎭'] },
  LEGENDARY: { probability: 0.02, rewards: ['🔥', '⚡', '💫'] }
};

export const DOOM_MODE_SETTINGS = {
  timeLimit: 25 * 60 * 1000, // 25 minutes
  breakTime: 5 * 60 * 1000, // 5 minutes
  maxBreaks: 4,
  punishmentDelay: 1000, // 1 second
  intensityLevels: ['easy', 'medium', 'hard', 'nightmare']
}; 