'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import LandingNavbar from './components/LandingNavbar';
import Footer from './components/Footer';
import ScrollAnimations from './components/ScrollAnimations';
import AnimatedCounter from './components/AnimatedCounter';
import RippleButton from './components/RippleButton';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import ParticleBackground from './components/ParticleBackground';
import FloatingShapes from './components/FloatingShapes';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
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
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <ParticleBackground />
      <FloatingShapes />
      <ScrollProgress />
      <ScrollAnimations />
      <LandingNavbar />

      {/* Main content wrapper */}
      <main id="main-content" className={styles.mainContent} role="main">
        {/* Hero Section */}
        <div className={styles.heroSection}>
        <div className={`${styles.heroBackground} hero-background`}></div>
        <div className={`${styles.heroContent} fade-in-up`}>
          <div className={styles.heroTextContainer}>
            <span className={`${styles.heroLabel} fade-in-up`}>WELCOME TO HIWOTFIT</span>
            <h1 className={`${styles.heroTitle} fade-in-up`}>
              TRANSFORM YOUR
              <span className={styles.heroTitleAccent}> FITNESS JOURNEY</span>
            </h1>
            <p className={`${styles.heroSubtitle} fade-in-up`}>
              Complete fitness platform with 50+ exercise videos across 8 muscle groups,
              smart workout tracking, calorie calculator, and  journaling system with notes, image and file uploads options
              - everything you need to achieve your fitness goals.
            </p>
            <div className={`${styles.heroButtons} fade-in-up`}>
              <RippleButton
                className={`${styles.startButton} pulse-animation`}
                onClick={() => router.push('/auth/signup')}
                variant="primary"
                aria-label="Start your free trial - Sign up for HiwotFit"
              >
                <span>START FREE TRIAL</span>
                <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </RippleButton>
              <RippleButton
                className={styles.secondaryButton}
                onClick={() => router.push('/auth/login')}
                variant="secondary"
                aria-label="Sign in to your existing HiwotFit account"
              >
                SIGN IN
              </RippleButton>
            </div>
          </div>
          <div className={`${styles.heroStats} stagger-children`}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <AnimatedCounter end={50} suffix="+" duration={2500} />
              </span>
              <span className={styles.statLabel}>Video Exercises</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <AnimatedCounter end={8} suffix="" duration={2000} />
              </span>
              <span className={styles.statLabel}>Muscle Groups</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>
                <AnimatedCounter end={100} suffix="%" duration={2000} />
              </span>
              <span className={styles.statLabel}>Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className={styles.featuresSection}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
      
          <h2 className={styles.sectionTitle}>Complete Fitness Platform</h2>
          <p className={styles.sectionSubtitle}>
            From workout videos to nutrition tracking and smart notes - everything you need in one app
          </p>
        </div>
        <div className={`${styles.featuresGrid} stagger-children`}>
          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/workout.png" alt="Workout Videos" width={60} height={60} />
              <div className={styles.iconGlow}></div>
            </div>
            <h3 className={styles.featureTitle}>50+ Exercise Videos</h3>
            <p className={styles.featureDescription}>
              Complete video library covering 8 muscle groups: Chest, Back, Shoulders, Arms,
              Legs, Core, Calves, and Glutes. Each exercise includes professional demonstrations
              and detailed instructions.
            </p>
            <div className={styles.featureFooter}>
              <span className={styles.featureBadge}>8 Muscle Groups</span>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/calories.png" alt="Calorie Calculator" width={60} height={60} />
              <div className={styles.iconGlow}></div>
            </div>
            <h3 className={styles.featureTitle}>Smart Calorie Calculator</h3>
            <p className={styles.featureDescription}>
              Advanced BMR and TDEE calculations with personalized macro recommendations.
              Track your daily caloric needs based on your goals, activity level, and body metrics.
            </p>
            <div className={styles.featureFooter}>
              <span className={styles.featureBadge}>BMR/TDEE</span>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/track.png" alt="Workout Tracking" width={60} height={60} />
              <div className={styles.iconGlow}></div>
            </div>
            <h3 className={styles.featureTitle}>Complete Workout Tracking</h3>
            <p className={styles.featureDescription}>
              Log detailed workouts with sets, reps, weight, duration, and calories burned.
              View your workout history organized by date with expandable sections for easy tracking.
            </p>
            <div className={styles.featureFooter}>
              <span className={styles.featureBadge}>Full History</span>
            </div>
          </div>

          <div className={styles.feature}>
            <div className={styles.featureIcon}>
              <Image src="/assets/note.png" alt="Smart Notes" width={60} height={60} />
              <div className={styles.iconGlow}></div>
            </div>
            <h3 className={styles.featureTitle}>iPhone-Style Notes</h3>
            <p className={styles.featureDescription}>
              Organize your fitness notes with automatic time-based grouping (Today, Past 7 Days,
              Past 30 Days). Upload files up to 10MB and keep all your fitness information organized.
            </p>
            <div className={styles.featureFooter}>
              <span className={styles.featureBadge}>File Uploads</span>
            </div>
          </div>
        
          
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className={styles.howItWorksSection}>
        <div className={`${styles.sectionHeader} fade-in-up`}>
        
          <h2 className={styles.sectionTitle}>How It Works</h2>
          <p className={styles.sectionSubtitle}>
            Start your fitness journey with HiwotFit in four simple steps
          </p>
        </div>
        <div className={`${styles.stepsContainer} stagger-children`}>
          <div className={styles.step}>
            <div className={styles.stepNumber}>
              <span>1</span>
              <div className={styles.stepConnector}></div>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Create Free Account</h3>
              <p className={styles.stepDescription}>
                Sign up for free in under 30 seconds. No credit card required - start using all features immediately.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>
              <span>2</span>
              <div className={styles.stepConnector}></div>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Explore Exercise Library</h3>
              <p className={styles.stepDescription}>
                Browse 50+ exercise videos across 8 muscle groups. Watch demonstrations and save your favorites for quick access.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>
              <span>3</span>
              <div className={styles.stepConnector}></div>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Log Your Workouts</h3>
              <p className={styles.stepDescription}>
                Track sets, reps, weight, duration, and calories. Use the calorie calculator for personalized nutrition guidance.
              </p>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.stepNumber}>
              <span>4</span>
            </div>
            <div className={styles.stepContent}>
              <h3 className={styles.stepTitle}>Track Progress & Take Notes</h3>
              <p className={styles.stepDescription}>
                Monitor your workout history, organize fitness notes with file uploads, and watch your progress grow over time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Final CTA Section */}
      <div className={styles.ctaSection}>
        <div className={`${styles.ctaContent} fade-in-up`}>
          <h2 className={styles.ctaTitle}>Ready to Start Your Fitness Journey?</h2>
          <p className={styles.ctaSubtitle}>
            Join the HiwotFit community and get instant access to 50+ exercise videos, smart workout tracking,
            calorie calculator, and iPhone-style notes - all completely free!
          </p>
          <div className={styles.ctaButtons}>
            <RippleButton
              className={styles.ctaButton}
              onClick={() => router.push('/auth/signup')}
              variant="primary"
            >
              <span>START YOUR JOURNEY</span>
              <svg className={styles.buttonIcon} viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </RippleButton>
            <RippleButton
              className={styles.ctaSecondaryButton}
              onClick={() => router.push('/auth/login')}
              variant="ghost"
            >
              Already have an account? Sign In
            </RippleButton>
          </div>
          <div className={styles.ctaTrust}>
            <span className={styles.trustText}>✓ Free forever</span>
            <span className={styles.trustText}>✓ No credit card required</span>
            <span className={styles.trustText}>✓ Cancel anytime</span>
          </div>
        </div>
      </div>
      </main>

      {/* Floating Action Button */}
      <RippleButton
        className={styles.floatingButton}
        onClick={() => router.push('/auth/signup')}
        title="Start Your Fitness Journey"
        variant="primary"
      >
        <svg viewBox="0 0 24 24" fill="none" className={styles.floatingIcon}>
          <path d="M12 2L2 7v10c0 5.55 3.84 10 9 11 5.16-1 9-5.45 9-11V7l-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </RippleButton>

      <BackToTop />
      <Footer />
    </div>
  );
};

export default LandingPage;
