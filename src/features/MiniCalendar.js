import React from 'react';

const getMonthMatrix = (year, month) => {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const matrix = [];
  let week = [];
  let day = 1 - firstDay;
  for (let i = 0; i < 6; i++) {
    week = [];
    for (let j = 0; j < 7; j++, day++) {
      if (day > 0 && day <= daysInMonth) {
        week.push(day);
      } else {
        week.push(null);
      }
    }
    matrix.push(week);
  }
  return matrix;
};

const MiniCalendar = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const matrix = getMonthMatrix(year, month);

  return (
    <div style={{
      background: 'rgba(0,0,0,0.2)',
      borderRadius: '12px',
      padding: '20px',
      minWidth: '320px',
      color: 'white',
      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '20px',
    }}>
      <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', letterSpacing: '1px' }}>
        {monthNames[month]} {year}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', width: '100%' }}>
        {weekDays.map((d) => (
          <div key={d} style={{ textAlign: 'center', color: '#b19cd9', fontWeight: 'bold' }}>{d}</div>
        ))}
        {matrix.flat().map((d, i) => (
          <div
            key={i}
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '8px',
              background: d === date ? 'linear-gradient(135deg, #ff00ff, #330066)' : 'transparent',
              color: d === date ? '#fff' : '#b19cd9',
              fontWeight: d === date ? 'bold' : 'normal',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              border: d === date ? '2px solid #ff00ff' : 'none',
              boxShadow: d === date ? '0 0 8px #ff00ff' : 'none',
              opacity: d ? 1 : 0.3
            }}
          >
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar; 