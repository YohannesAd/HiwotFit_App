'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/FloatingShapes.module.css';

const FloatingShapes = () => {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const generateShapes = () => {
      const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];
      const newShapes = [];

      for (let i = 0; i < 8; i++) {
        newShapes.push({
          id: i,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
          size: Math.random() * 60 + 20,
          left: Math.random() * 100,
          top: Math.random() * 100,
          animationDelay: Math.random() * 10,
          animationDuration: Math.random() * 10 + 15,
          opacity: Math.random() * 0.3 + 0.1
        });
      }

      setShapes(newShapes);
    };

    generateShapes();
  }, []);

  const renderShape = (shape) => {
    const shapeStyle = {
      left: `${shape.left}%`,
      top: `${shape.top}%`,
      width: `${shape.size}px`,
      height: `${shape.size}px`,
      animationDelay: `${shape.animationDelay}s`,
      animationDuration: `${shape.animationDuration}s`,
      opacity: shape.opacity
    };

    switch (shape.type) {
      case 'circle':
        return (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles.circle}`}
            style={shapeStyle}
          />
        );
      case 'triangle':
        return (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles.triangle}`}
            style={shapeStyle}
          />
        );
      case 'square':
        return (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles.square}`}
            style={shapeStyle}
          />
        );
      case 'hexagon':
        return (
          <div
            key={shape.id}
            className={`${styles.shape} ${styles.hexagon}`}
            style={shapeStyle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.floatingShapes}>
      {shapes.map(renderShape)}
    </div>
  );
};

export default FloatingShapes;
