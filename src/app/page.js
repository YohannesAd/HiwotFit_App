'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import Footer from './components/Footer';
import Image from 'next/image';
import styles from "../app/styles/LandingPage.module.css";

const LandingPage = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if user is authenticated and redirect to home page
  useEffect(() => {
    if (isClient && !loading) {
      console.log('LandingPage - Auth state loaded, user:', user ? 'authenticated' : 'not authenticated');

      // If user is authenticated, redirect to home page
      if (user) {
        console.log('LandingPage - User is authenticated, redirecting to home page');
        router.push('/home');
      }
    }
  }, [isClient, loading, user, router]);

  return (
    <div className={styles.landingPage}>
      <LandingNavbar />

      {/* Main content wrapper */}
      <div className={styles.mainContent}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>TRANSFORM YOUR FITNESS JOURNEY</h1>
          <p className={styles.heroSubtitle}>
            Personalized workouts and nutrition tracking designed to help you reach your goals
          </p>
          <button
            className={styles.startButton}
            onClick={() => router.push('/auth/login')}
          >
            GET STARTED
          </button>
        </div>
      </div>

      {/* Features Section */}
      <div className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose HiwotFit?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/workout.png" alt="Workout Videos" width={60} height={60} />
            </div>
            <h3 className={styles.featureTitle}>WORKOUT VIDEOS</h3>
            <p className={styles.featureDescription}>
              Access expert-guided videos for every muscle group to perfect your form and maximize results.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/calories.png" alt="Calorie Tracking" width={60} height={60} />
            </div>
            <h3 className={styles.featureTitle}>CALORIE TRACKING</h3>
            <p className={styles.featureDescription}>
              Get personalized nutrition plans based on your goals, activity level, and body metrics.
            </p>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/workout.png" alt="Favorites" width={60} height={60} />
            </div>
            <h3 className={styles.featureTitle}>SAVE FAVORITES</h3>
            <p className={styles.featureDescription}>
              Build your custom workout routines by saving your favorite exercises for quick access.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className={styles.howItWorksSection}>
        <h2 className={styles.sectionTitle}>How It Works</h2>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Sign Up</h3>
            <p className={styles.stepDescription}>Create your free account in seconds</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Set Goals</h3>
            <p className={styles.stepDescription}>Tell us about your fitness objectives</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Get Your Plan</h3>
            <p className={styles.stepDescription}>Receive personalized workout & nutrition plans</p>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>4</div>
            <h3 className={styles.stepTitle}>Track Progress</h3>
            <p className={styles.stepDescription}>Monitor your improvements and stay motivated</p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>READY TO START YOUR FITNESS JOURNEY?</h2>
        <button
          className={styles.ctaButton}
          onClick={() => router.push('/auth/login')}
        >
          SIGN IN NOW
        </button>
      </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
