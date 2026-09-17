'use client';
import { useState, useEffect } from 'react';
import styles from '../styles/TestimonialsSection.module.css';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Fitness Enthusiast",
      image: "/assets/user1.jpg",
      content: "The 50+ exercise videos are amazing! I love how I can track my workouts with sets, reps, and weight. The calorie calculator helped me understand my nutrition needs perfectly.",
      rating: 5
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Personal Trainer",
      image: "/assets/user2.jpg",
      content: "As a trainer, I love the comprehensive exercise library covering all 8 muscle groups. The video demonstrations are professional and the workout history tracking is excellent.",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Busy Professional",
      image: "/assets/user3.jpg",
      content: "The iPhone-style notes feature is genius! I can upload my meal photos and workout plans. The favorites system makes it easy to find my go-to exercises quickly.",
      rating: 5
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Beginner",
      image: "/assets/user4.jpg",
      content: "Perfect for beginners! The exercise videos show proper form, and I can track everything from duration to calories burned. The BMR calculator was eye-opening!",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`${styles.star} ${index < rating ? styles.filled : ''}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={`${styles.sectionHeader} fade-in-up`}>

        <h2 className={styles.sectionTitle}>What Our Users Say</h2>
        <p className={styles.sectionSubtitle}>
          Join thousands of satisfied users who have transformed their lives with HiwotFit
        </p>
      </div>

      <div className={styles.testimonialsContainer}>
        <div className={styles.testimonialCard}>
          <div className={styles.testimonialContent}>
            <div className={styles.quote}>
              <svg viewBox="0 0 24 24" fill="none" className={styles.quoteIcon}>
                <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21c0 1 0 1 1 1z" fill="currentColor"/>
                <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" fill="currentColor"/>
              </svg>
            </div>
            <p className={styles.testimonialText}>
              {testimonials[currentTestimonial].content}
            </p>
            <div className={styles.rating}>
              {renderStars(testimonials[currentTestimonial].rating)}
            </div>
          </div>
          
          <div className={styles.testimonialAuthor}>
            <div className={styles.authorInfo}>
              <h4 className={styles.authorName}>
                {testimonials[currentTestimonial].name}
              </h4>
              <p className={styles.authorRole}>
                {testimonials[currentTestimonial].role}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.testimonialNavigation}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.navDot} ${index === currentTestimonial ? styles.active : ''}`}
              onClick={() => setCurrentTestimonial(index)}
            />
          ))}
        </div>
      </div>

      <div className={styles.socialProof}>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>50+</span>
          <span className={styles.statLabel}>Exercise Videos</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>8</span>
          <span className={styles.statLabel}>Muscle Groups</span>
        </div>
        <div className={styles.statItem}>
          <span className={styles.statNumber}>100%</span>
          <span className={styles.statLabel}>Free to Use</span>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
