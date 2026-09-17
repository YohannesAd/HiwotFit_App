'use client';
import { useEffect } from 'react';

const ScrollAnimations = () => {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all elements with animation classes
    const animatedElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .stagger-children'
    );

    animatedElements.forEach((el) => {
      observer.observe(el);
    });

    // Parallax effect for hero background
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroBackground = document.querySelector('.hero-background');
      
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Handle smooth scroll with offset for fixed navbar
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (target) {
        e.preventDefault();
        const targetId = target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const navbarHeight = 80; // Height of fixed navbar
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Keyboard navigation
    const handleKeyDown = (e) => {
      const target = e.target;
      const isFormField =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable);

      if (!isFormField && !e.altKey && !e.ctrlKey && !e.metaKey) {
        const scrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const canScroll = scrollHeight > viewportHeight + 1;

        if (canScroll) {
          const key = e.key;
          if (key === 'ArrowDown' || key === 'ArrowUp' || key === 'PageDown' || key === 'PageUp' || key === 'Home' || key === 'End' || key === ' ') {
            e.preventDefault();
            const lineScroll = 40;
            const pageScroll = Math.floor(viewportHeight * 0.9);

            if (key === 'ArrowDown') {
              window.scrollBy({ top: lineScroll, left: 0, behavior: 'smooth' });
            } else if (key === 'ArrowUp') {
              window.scrollBy({ top: -lineScroll, left: 0, behavior: 'smooth' });
            } else if (key === 'PageDown' || key === ' ') {
              window.scrollBy({ top: pageScroll, left: 0, behavior: 'smooth' });
            } else if (key === 'PageUp') {
              window.scrollBy({ top: -pageScroll, left: 0, behavior: 'smooth' });
            } else if (key === 'Home') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (key === 'End') {
              window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
            }

            return;
          }
        }
      }

      // Skip to main content with Alt + M
      if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const mainContent = document.querySelector('main') || document.querySelector('[role="main"]');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
      }

      // Navigate sections with Alt + Arrow keys
      if (e.altKey && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const sections = document.querySelectorAll('section, [id^="section"], #features, #how-it-works');
        const currentSection = Array.from(sections).find(section => {
          const rect = section.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        });

        if (currentSection) {
          const currentIndex = Array.from(sections).indexOf(currentSection);
          let targetIndex;

          if (e.key === 'ArrowDown') {
            targetIndex = Math.min(currentIndex + 1, sections.length - 1);
          } else {
            targetIndex = Math.max(currentIndex - 1, 0);
          }

          const targetSection = sections[targetIndex];
          if (targetSection) {
            const navbarHeight = 80;
            const targetPosition = targetSection.offsetTop - navbarHeight;
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default ScrollAnimations;
