'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/FAQSection.module.css';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const router = useRouter();

  const faqs = [
    {
      id: 1,
      question: "Is HiwotFit really free to use?",
      answer: "Yes! HiwotFit is completely free to use. You get access to all 50+ exercise videos, workout tracking, calorie calculator, notes system, and all features without any cost."
    },
    {
      id: 2,
      question: "How many exercises are available?",
      answer: "We have 50+ professional exercise videos covering 8 muscle groups: Chest, Back, Shoulders, Arms (Biceps/Triceps), Legs, Core, Calves, and Glutes. Each exercise includes detailed video demonstrations."
    },
    {
      id: 3,
      question: "What can I track with HiwotFit?",
      answer: "You can log complete workouts with sets, reps, weight, duration, and calories burned. View your workout history organized by date, save favorite exercises, and use our BMR/TDEE calorie calculator."
    },
    {
      id: 4,
      question: "How does the notes system work?",
      answer: "Our iPhone-style notes system automatically organizes your notes by time (Today, Past 7 Days, Past 30 Days, Monthly). You can upload files up to 10MB and keep all your fitness information organized."
    },
    {
      id: 5,
      question: "Can I use HiwotFit on my mobile device?",
      answer: "Yes! HiwotFit is fully responsive and works perfectly on all devices - smartphones, tablets, and desktop computers. Access your workouts and notes anywhere, anytime."
    },
    {
      id: 6,
      question: "What makes the calorie calculator special?",
      answer: "Our advanced calculator provides BMR (Basal Metabolic Rate) and TDEE (Total Daily Energy Expenditure) calculations with personalized macro recommendations based on your goals and activity level."
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className={styles.faqSection}>
      <div className={`${styles.sectionHeader} fade-in-up`}>
      
        <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
        <p className={styles.sectionSubtitle}>
          Got questions? We've got answers! Find everything you need to know about HiwotFit.
        </p>
      </div>

      <div className={styles.faqContainer}>
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className={`${styles.faqItem} ${openFAQ === faq.id ? styles.open : ''}`}
          >
            <button
              className={styles.faqQuestion}
              onClick={() => toggleFAQ(faq.id)}
            >
              <span>{faq.question}</span>
              <svg
                className={styles.faqIcon}
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className={styles.faqAnswer}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.contactCTA}>
        <p className={styles.contactText}>
          Still have questions? We're here to help!
        </p>
        <button
          className={styles.contactButton}
          onClick={() => router.push('/contact')}
        >
          Contact Support
        </button>
      </div>
    </section>
  );
};

export default FAQSection;
