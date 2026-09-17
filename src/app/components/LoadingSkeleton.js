'use client';
import styles from '../styles/LoadingSkeleton.module.css';

const LoadingSkeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  count = 1 
}) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      className={`${styles.skeleton} ${className}`}
      style={{
        width,
        height,
        borderRadius,
        marginBottom: count > 1 ? '0.5rem' : '0'
      }}
    />
  ));

  return count === 1 ? skeletons[0] : <div>{skeletons}</div>;
};

// Predefined skeleton components for common use cases
export const TextSkeleton = ({ lines = 3, className = '' }) => (
  <div className={className}>
    {Array.from({ length: lines }, (_, index) => (
      <LoadingSkeleton
        key={index}
        height="16px"
        width={index === lines - 1 ? '70%' : '100%'}
        className={styles.textLine}
      />
    ))}
  </div>
);

export const CardSkeleton = ({ className = '' }) => (
  <div className={`${styles.cardSkeleton} ${className}`}>
    <LoadingSkeleton height="200px" borderRadius="12px" className={styles.cardImage} />
    <div className={styles.cardContent}>
      <LoadingSkeleton height="24px" width="80%" className={styles.cardTitle} />
      <TextSkeleton lines={2} className={styles.cardText} />
      <LoadingSkeleton height="40px" width="120px" borderRadius="20px" className={styles.cardButton} />
    </div>
  </div>
);

export const ButtonSkeleton = ({ className = '' }) => (
  <LoadingSkeleton
    height="44px"
    width="140px"
    borderRadius="22px"
    className={className}
  />
);

export default LoadingSkeleton;
