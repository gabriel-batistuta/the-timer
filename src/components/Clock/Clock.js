import React, { useState, useEffect, useRef } from 'react';
import './Clock.css';

const hour = (date) => {
  return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
};

const formatDate = (date) => {
  return `${date.getDate()}, ${date.getMonth() + 1}, ${date.getFullYear()}`;
};

const calculateDaysToNextYear = (date) => {
  const currentYear = date.getFullYear();
  const nextYear = currentYear + 1;
  const nextYearStartDate = new Date(`${nextYear}-01-01`);
  const timeDifference = nextYearStartDate.getTime() - date.getTime();
  const daysToNextYear = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysToNextYear;
};

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const [showNewYearMessage, setShowNewYearMessage] = useState(false);
  const bodyRef = useRef(null);

  useEffect(() => {
    const widthWindow = window.innerWidth;
    if (widthWindow > 414) {
      const body = bodyRef.current
      if (body) {
        const container = document.querySelector('div.container')
        container.style.width = '25%';
      } 
    }

    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setDate(currentDate);

      const daysToNextYear = calculateDaysToNextYear(currentDate);
      if (daysToNextYear === 0) {
        setShowNewYearMessage(true);
      } else {
        setShowNewYearMessage(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  

  return (
    <div class="body" ref={bodyRef}>
      <div class="container">
        <div class="date-container">
          <strong><span>{formatDate(date)}</span></strong>
        </div>
        <div class="hour-container">
          <strong><span>{hour(date)}</span></strong> 
        </div>
        <div class="DaysNewYear-container">
        {showNewYearMessage ? (
            <strong><span>Feliz Ano Novo!</span></strong>
          ) : (
            <strong><span>{calculateDaysToNextYear(date)}</span></strong>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clock;
export { hour, formatDate, calculateDaysToNextYear };
