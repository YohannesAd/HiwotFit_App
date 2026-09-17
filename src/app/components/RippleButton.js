'use client';
import { useState } from 'react';
import styles from '../styles/RippleButton.module.css';

const RippleButton = ({ 
  children, 
  onClick, 
  className = '', 
  disabled = false,
  variant = 'primary',
  ...props 
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = (event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      x,
      y,
      size,
      id: Date.now()
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event) => {
    if (!disabled) {
      createRipple(event);
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <button
      className={`${styles.rippleButton} ${styles[variant]} ${className} ${disabled ? styles.disabled : ''}`}
      onClick={handleClick}
      disabled={disabled}
      {...props}
    >
      <span className={styles.content}>{children}</span>
      <div className={styles.rippleContainer}>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className={styles.ripple}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </div>
    </button>
  );
};

export default RippleButton;
