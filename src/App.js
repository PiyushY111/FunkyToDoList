import React, { useState, useEffect, useRef } from "react";
import { FeatureProvider } from './features/FeatureContext';
import FeatureLayout from './features/FeatureLayout';
import MoodSelector from './features/MoodSelector';
import GachaSystem from './features/GachaSystem';
import DoomMode from './features/DoomMode';
import LifeStats from './features/LifeStats';
import MiniCalendar from './features/MiniCalendar';

// Simple custom icon components instead of using lucide-react
const IconSparkle = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18m-9-9h18" />
    <path d="M7.5 12 A 4.5 4.5 0 0 1 12 7.5 A 4.5 4.5 0 0 1 16.5 12 A 4.5 4.5 0 0 1 12 16.5 A 4.5 4.5 0 0 1 7.5 12 Z" />
  </svg>
);

const IconCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconPlus = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconTrash = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const IconZap = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconBomb = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4" />
    <path d="M5 5l2.5 2.5" />
    <path d="M19 5l-2.5 2.5" />
    <path d="M16 16l3 3" />
    <path d="M8 16l-3 3" />
  </svg>
);

const CrazyTodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [rotation, setRotation] = useState(0);
  const [shake, setShake] = useState(false);
  const [colors, setColors] = useState({
    bg: "#1a0033",
    accent: "#ff00ff",
    cardBg: "#000066"
  });
  
  // New state for floating tasks effect
  const [floatingTasks, setFloatingTasks] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [crazyMode, setCrazyMode] = useState(false);
  const appRef = useRef(null);

  // Random color generator
  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Toggle colors randomly with better color combinations
  const toggleCrazyColors = () => {
    const newBg = randomColor();
    const newAccent = randomColor();
    const newCardBg = randomColor();
    
    setColors({
      bg: newBg,
      accent: newAccent,
      cardBg: newCardBg
    });
    
    // Update document background
    document.body.style.background = `linear-gradient(45deg, ${newBg}, ${newCardBg})`;
    
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  // Load stored tasks
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) setTasks(storedTasks);
    
    // Start rotation animation
    const rotateInterval = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 100);
    
    return () => clearInterval(rotateInterval);
  }, []);

  // Save tasks
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // New function for task explosion effect
  const explodeTasks = () => {
    if (isExploding || tasks.length === 0) return;
    
    setIsExploding(true);
    
    // Get app dimensions for positioning
    const appWidth = appRef.current?.offsetWidth || window.innerWidth;
    const appHeight = appRef.current?.offsetHeight || window.innerHeight;
    
    // Create floating tasks
    const newFloatingTasks = tasks.map(task => ({
      ...task,
      position: {
        x: Math.random() * (appWidth - 150),
        y: Math.random() * (appHeight - 100) + 50
      },
      velocity: {
        x: (Math.random() - 0.5) * 15,
        y: (Math.random() - 0.5) * 15
      },
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.8,
      opacity: 1
    }));
    
    setFloatingTasks(newFloatingTasks);
    
    // Set a timeout to clear the explosion
    setTimeout(() => {
      setFloatingTasks([]);
      setIsExploding(false);
    }, 5000);
    
    toggleCrazyColors();
  };

  // Update floating tasks positions
  useEffect(() => {
    if (floatingTasks.length === 0) return;
    
    const updateInterval = setInterval(() => {
      setFloatingTasks(prev => 
        prev.map(task => ({
          ...task,
          position: {
            x: task.position.x + task.velocity.x,
            y: task.position.y + task.velocity.y
          },
          velocity: {
            x: task.velocity.x * 0.98,
            y: task.velocity.y * 0.98 + 0.2 // Add gravity
          },
          rotation: task.rotation + task.velocity.x,
          opacity: task.opacity * 0.99
        }))
      );
    }, 30);
    
    return () => clearInterval(updateInterval);
  }, [floatingTasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    // Add task with random properties
    setTasks([...tasks, { 
      id: Date.now(), 
      text: newTask, 
      completed: false,
      color: randomColor(),
      fontSize: Math.floor(Math.random() * 10) + 16, // 16-26px
      rotate: Math.floor(Math.random() * 20) - 10, // -10 to 10 degrees
      bouncy: Math.random() > 0.5
    }]);
    setNewTask("");
    toggleCrazyColors();
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? 
      { ...task, completed: !task.completed, color: randomColor() } : 
      task
    ));
  };

  const deleteTask = (id) => {
    setShake(true);
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
      setShake(false);
    }, 300);
  };

  // Toggle crazy mode with global effects
  const toggleCrazyMode = () => {
    setCrazyMode(!crazyMode);
    if (!crazyMode) {
      explodeTasks();
      // Add global crazy mode effects
      document.body.style.animation = 'crazyMode 2s infinite';
      document.body.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    } else {
      // Remove global crazy mode effects
      document.body.style.animation = 'none';
      document.body.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    }
  };

  // Add global styles for crazy mode
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes crazyMode {
        0% { transform: rotate(0deg); }
        25% { transform: rotate(1deg); }
        50% { transform: rotate(0deg); }
        75% { transform: rotate(-1deg); }
        100% { transform: rotate(0deg); }
      }
      
      .crazy-mode-active {
        animation: crazyMode 2s infinite;
      }
      
      .crazy-mode-active * {
        transition: all 0.3s ease;
      }
      
      .crazy-mode-active button:hover {
        transform: scale(1.1) rotate(5deg);
      }
      
      .crazy-mode-active input:focus {
        transform: scale(1.02);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Apply crazy mode class to body
  useEffect(() => {
    if (crazyMode) {
      document.body.classList.add('crazy-mode-active');
    } else {
      document.body.classList.remove('crazy-mode-active');
    }
  }, [crazyMode]);

  // Custom animation classes
  const crazyStyles = {
    app: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      background: `linear-gradient(45deg, ${colors.bg}, #330066)`,
      transition: "background 0.5s ease",
      fontFamily: crazyMode ? "'Comic Sans MS', cursive, sans-serif" : "'Comic Sans MS', cursive, sans-serif",
      overflow: "hidden",
      position: "relative"
    },
    header: {
      padding: "24px 16px"
    },
    titleContainer: {
      textAlign: "center",
      marginBottom: "32px",
      animation: shake ? "bounce 0.5s" : "none"
    },
    title: {
      fontSize: "48px",
      fontWeight: "bold",
      color: crazyMode ? randomColor() : "#ff00ff",
      textShadow: crazyMode ? 
        `0 0 10px ${randomColor()}, 0 0 20px ${randomColor()}, 0 0 30px ${randomColor()}` : 
        "0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff",
      display: "inline-flex",
      alignItems: "center",
      animation: crazyMode ? "rainbow 2s linear infinite" : "none"
    },
    subtitle: {
      color: "#b19cd9",
      marginTop: "8px"
    },
    inputContainer: {
      maxWidth: "500px",
      margin: "0 auto",
      display: "flex",
      marginBottom: "32px"
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "8px 0 0 8px",
      backgroundColor: "#1a0033",
      color: "white",
      border: "2px solid #9933cc",
      outline: "none",
      textShadow: "0 0 5px #ff00ff"
    },
    addButton: {
      background: "linear-gradient(to right, #9933cc, #ff00ff)",
      color: "white",
      padding: "0 16px",
      borderRadius: "0 8px 8px 0",
      display: "flex",
      alignItems: "center",
      transition: "all 0.3s"
    },
    randomizeButton: {
      margin: "0 auto",
      display: "block",
      marginBottom: "24px",
      background: "linear-gradient(to right, #ff00ff, #9933cc)",
      color: "white",
      padding: "8px 16px",
      borderRadius: "50px",
      boxShadow: `0 0 10px ${colors.accent}`,
      transition: "all 0.3s",
      transform: `rotate(${rotation/4}deg)`
    },
    explodeButton: {
      margin: "0 auto",
      display: "block",
      marginBottom: "24px",
      background: crazyMode ? 
        `linear-gradient(to right, ${randomColor()}, ${randomColor()})` : 
        "linear-gradient(to right, #ff3300, #ff9900)",
      color: "white",
      padding: "12px 20px",
      borderRadius: "50px",
      boxShadow: `0 0 15px ${crazyMode ? randomColor() : "#ff6600"}`,
      transition: "all 0.3s",
      transform: crazyMode ? `rotate(${rotation/2}deg) scale(1.1)` : "none",
      fontSize: "18px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      animation: crazyMode ? "pulse 0.5s infinite" : "none"
    },
    crazyModeToggle: {
      margin: "0 auto 24px auto",
      background: crazyMode ? 
        `linear-gradient(to right, ${randomColor()}, ${randomColor()})` : 
        "linear-gradient(to right, #9900cc, #cc0099)",
      color: "white",
      padding: "8px 16px",
      borderRadius: "50px",
      boxShadow: `0 0 10px ${crazyMode ? randomColor() : "#cc0099"}`,
      transition: "all 0.3s",
      border: "none",
      cursor: "pointer"
    },
    columnsContainer: {
      flex: "1",
      padding: "16px",
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "24px"
    },
    column: {
      borderRadius: "8px",
      padding: "16px",
      animation: shake ? "pulse 0.5s" : "none",
      background: `linear-gradient(135deg, ${colors.cardBg}, #660066)`,
      boxShadow: `0 0 15px ${colors.accent}`
    },
    columnTitle: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "16px",
      textAlign: "center",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    taskList: {
      listStyle: "none",
      padding: 0,
      margin: 0
    },
    emptyText: {
      textAlign: "center",
      color: "#b19cd9",
      fontStyle: "italic"
    },
    icon: {
      width: "20px", 
      height: "20px",
      marginRight: "8px"
    },
    iconSmall: {
      width: "14px", 
      height: "14px"
    },
    floatingTask: {
      position: "absolute",
      padding: "12px",
      borderRadius: "8px",
      background: "#330066",
      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      pointerEvents: "none",
      zIndex: 100
    }
  };

  // Add media query for larger screens with JavaScript
  if (window.innerWidth >= 768) {
    crazyStyles.columnsContainer.gridTemplateColumns = "1fr 1fr 1fr";
  }

  return (
    <FeatureProvider>
      <FeatureLayout>
        {/* Centered Mini Calendar at the top */}
        <div style={{
          gridColumn: '1 / -1',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <MiniCalendar />
        </div>
        <div style={{
          gridColumn: '1 / -1',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={crazyStyles.inputContainer}>
            <input 
              type="text" 
              value={newTask} 
              onChange={(e) => setNewTask(e.target.value)} 
              placeholder="Add a wild new task"
              style={crazyStyles.input}
            />
            <button 
              onClick={addTask} 
              style={crazyStyles.addButton}
            >
              <span style={crazyStyles.icon}><IconPlus /></span>
              <span>Add</span>
            </button>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={explodeTasks} 
              disabled={isExploding || tasks.length === 0}
              style={{
                ...crazyStyles.explodeButton,
                opacity: isExploding || tasks.length === 0 ? 0.6 : 1
              }}
            >
              <span style={{...crazyStyles.icon, marginRight: "4px"}}>
                <IconBomb />
              </span>
              EXPLODE TASKS!
            </button>
            
            <button 
              onClick={toggleCrazyMode} 
              style={crazyStyles.crazyModeToggle}
            >
              {crazyMode ? "DISABLE CRAZY MODE" : "ENABLE CRAZY MODE"}
            </button>
          </div>
        </div>
        <MoodSelector />
        <GachaSystem />
        <DoomMode />
        
        <div style={{
          gridColumn: '1 / -1',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          padding: '20px',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          {/* Pending Tasks */}
          <div style={{
            ...crazyStyles.column,
            background: `linear-gradient(135deg, ${colors.cardBg}, #660066)`,
            transform: crazyMode ? `rotate(${Math.sin(Date.now() / 1000) * 3}deg)` : "none",
            transition: "transform 0.5s ease"
          }}>
            <h2 style={crazyStyles.columnTitle}>
              <span style={{...crazyStyles.icon, color: "#ffcc00"}}><IconZap /></span>
              Pending
            </h2>
            <ul style={crazyStyles.taskList}>
              {tasks.filter(task => !task.completed).map(task => (
                <li key={task.id} 
                  style={{ 
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    background: `linear-gradient(90deg, #330066, ${task.color})`,
                    transform: `rotate(${task.rotate}deg) ${crazyMode ? `scale(${0.9 + Math.sin(Date.now() / 1000 + task.id) * 0.1})` : ''}`,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transition: "all 0.3s",
                    animation: task.bouncy ? "bounce 1s infinite" : "none",
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          border: "2px solid #b19cd9",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          marginRight: "12px",
                          background: "transparent",
                          cursor: 'pointer'
                        }}
                      />
                      <span 
                        style={{ 
                          fontSize: `${task.fontSize}px`,
                          color: crazyMode ? randomColor() : "white",
                          textShadow: "0 0 5px rgba(255,255,255,0.5)"
                        }}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      style={{ 
                        color: "#ff6666", 
                        background: "none", 
                        border: "none",
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                        ':hover': {
                          background: 'rgba(255, 102, 102, 0.1)'
                        }
                      }}
                    >
                      <span style={crazyStyles.icon}><IconTrash /></span>
                    </button>
                  </div>
                </li>
              ))}
              {tasks.filter(task => !task.completed).length === 0 && (
                <li style={crazyStyles.emptyText}>No pending tasks</li>
              )}
            </ul>
          </div>
          
          {/* Completed Tasks */}
          <div style={{
            ...crazyStyles.column,
            background: `linear-gradient(135deg, ${colors.cardBg}, #006666)`,
            transform: crazyMode ? `rotate(${Math.sin(Date.now() / 1000 + 2) * 3}deg)` : "none",
            transition: "transform 0.5s ease"
          }}>
            <h2 style={crazyStyles.columnTitle}>
              <span style={{...crazyStyles.icon, color: "#33cc33"}}><IconCheck /></span>
              Completed
            </h2>
            <ul style={crazyStyles.taskList}>
              {tasks.filter(task => task.completed).map(task => (
                <li key={task.id} 
                  style={{ 
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    background: `linear-gradient(90deg, #003366, ${task.color})`,
                    transform: `rotate(${task.rotate}deg) ${crazyMode ? `scale(${0.9 + Math.sin(Date.now() / 1000 + task.id) * 0.1})` : ''}`,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    opacity: 0.8,
                    transition: "all 0.3s",
                    animation: task.bouncy ? "bounce 1s infinite" : "none",
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          marginRight: "12px",
                          background: "#33cc33",
                          cursor: 'pointer'
                        }}
                      >
                        <span style={{...crazyStyles.iconSmall, color: "white"}}>
                          <IconCheck />
                        </span>
                      </button>
                      <span 
                        style={{ 
                          fontSize: `${task.fontSize}px`,
                          color: crazyMode ? randomColor() : "white",
                          textDecoration: "line-through",
                          textShadow: "0 0 5px rgba(255,255,255,0.5)"
                        }}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      style={{ 
                        color: "#ff6666", 
                        background: "none", 
                        border: "none",
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                        ':hover': {
                          background: 'rgba(255, 102, 102, 0.1)'
                        }
                      }}
                    >
                      <span style={crazyStyles.icon}><IconTrash /></span>
                    </button>
                  </div>
                </li>
              ))}
              {tasks.filter(task => task.completed).length === 0 && (
                <li style={crazyStyles.emptyText}>No completed tasks</li>
              )}
            </ul>
          </div>
          
          {/* All Tasks */}
          <div style={{
            ...crazyStyles.column,
            background: `linear-gradient(135deg, ${colors.cardBg}, #660033)`,
            transform: crazyMode ? `rotate(${Math.sin(Date.now() / 1000 + 4) * 3}deg)` : "none",
            transition: "transform 0.5s ease"
          }}>
            <h2 style={crazyStyles.columnTitle}>
              <span style={{...crazyStyles.icon, color: "#ffcc00"}}><IconSparkle /></span>
              All Tasks
            </h2>
            <ul style={crazyStyles.taskList}>
              {tasks.map(task => (
                <li key={task.id} 
                  style={{ 
                    padding: "12px",
                    borderRadius: "8px",
                    marginBottom: "12px",
                    background: `linear-gradient(90deg, #4d0033, ${task.color})`,
                    transform: `rotate(${task.rotate}deg) ${crazyMode ? `scale(${0.9 + Math.sin(Date.now() / 1000 + task.id) * 0.1})` : ''}`,
                    boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                    transition: "all 0.3s",
                    animation: task.bouncy ? "bounce 1s infinite" : "none",
                    cursor: 'pointer'
                  }}
                  onClick={() => toggleTask(task.id)}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTask(task.id);
                        }}
                        style={{ 
                          width: "24px", 
                          height: "24px", 
                          borderRadius: "50%", 
                          border: task.completed ? "none" : "2px solid #b19cd9",
                          display: "flex", 
                          alignItems: "center", 
                          justifyContent: "center", 
                          marginRight: "12px",
                          background: task.completed ? "#33cc33" : "transparent",
                          cursor: 'pointer'
                        }}
                      >
                        {task.completed && (
                          <span style={{...crazyStyles.iconSmall, color: "white"}}>
                            <IconCheck />
                          </span>
                        )}
                      </button>
                      <span 
                        style={{ 
                          fontSize: `${task.fontSize}px`,
                          color: crazyMode ? randomColor() : "white",
                          textDecoration: task.completed ? "line-through" : "none",
                          textShadow: "0 0 5px rgba(255,255,255,0.5)"
                        }}
                      >
                        {task.text}
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                      style={{ 
                        color: "#ff6666", 
                        background: "none", 
                        border: "none",
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '4px',
                        transition: 'all 0.2s',
                        ':hover': {
                          background: 'rgba(255, 102, 102, 0.1)'
                        }
                      }}
                    >
                      <span style={crazyStyles.icon}><IconTrash /></span>
                    </button>
                  </div>
                </li>
              ))}
              {tasks.length === 0 && (
                <li style={crazyStyles.emptyText}>No tasks yet</li>
              )}
            </ul>
          </div>
        </div>
        
        {/* Floating/Exploding Tasks */}
        {floatingTasks.map(task => (
          <div
            key={`floating-${task.id}`}
            style={{
              ...crazyStyles.floatingTask,
              left: `${task.position.x}px`,
              top: `${task.position.y}px`,
              transform: `rotate(${task.rotation}deg) scale(${task.scale})`,
              opacity: task.opacity,
              background: `linear-gradient(90deg, ${task.color}, ${randomColor()})`,
              transition: "none",
              padding: "8px 12px",
              boxShadow: `0 0 20px ${task.color}`,
              color: "white",
              zIndex: 1000,
              fontSize: `${task.fontSize}px`,
              textDecoration: task.completed ? "line-through" : "none",
              pointerEvents: 'none'
            }}
          >
            {task.text}
          </div>
        ))}

        {/* Add CSS animations */}
        <style>
          {`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulse {
              0% { opacity: 1; transform: scale(1); }
              50% { opacity: 0.8; transform: scale(1.1); }
              100% { opacity: 1; transform: scale(1); }
            }
            @keyframes rainbow {
              0% { color: red; }
              14% { color: orange; }
              28% { color: yellow; }
              42% { color: green; }
              57% { color: blue; }
              71% { color: indigo; }
              85% { color: violet; }
              100% { color: red; }
            }
          `}
        </style>
      </FeatureLayout>
    </FeatureProvider>
  );
};

export default CrazyTodoApp;