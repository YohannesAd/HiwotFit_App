'use client';
import React, { useState } from 'react';
import styles from '../styles/Contact.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import navbarStyles from '../styles/Navbar.module.css';

const Contact = () => {
  const router = useRouter();
  const { user } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedback: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Smart navigation function that goes to the appropriate home page
  const handleBackNavigation = () => {
    // If user is authenticated, go to /home, otherwise go to landing page
    const targetPage = user ? '/home' : '/';
    router.push(targetPage);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setMessageType('success');
        // Reset form
        setFormData({
          name: '',
          email: '',
          feedback: ''
        });
      } else {
        setMessage(data.error || 'Failed to send message');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setMessage('An error occurred. Please try again later.');
      setMessageType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.contactContainer}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <button onClick={handleBackNavigation} className={navbarStyles.backButton} style={{ marginBottom: 16 }}>
          ← Back
        </button>
      </div>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <p className={styles.contactText}>
        Have questions or feedback? Fill out the form below or email us at
        <a href="mailto:hiowtfit@gmail.com" style={{ color: '#e38e0f' }}>HiwotFit Support</a>
      </p>
      {/* Display success/error message */}
      {message && (
        <div className={`${styles.message} ${messageType === 'success' ? styles.successMessage : styles.errorMessage}`}>
          {message}
        </div>
      )}

      <form className={styles.contactForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.inputField}
          placeholder="Your Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
        <input
          type="email"
          className={styles.inputField}
          placeholder="Your Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
        <textarea
          className={`${styles.inputField} ${styles.textArea}`}
          placeholder="Your Feedback"
          name="feedback"
          value={formData.feedback}
          onChange={handleInputChange}
          required
          disabled={isSubmitting}
        />
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Feedback'}
        </button>
      </form>
    </div>
  );
};

export default Contact; 