/**
 * Email Sending Utility
 * 
 * This module provides functionality for sending emails.
 * It uses nodemailer for sending emails.
 */

import nodemailer from 'nodemailer';

/**
 * Send an email
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.text - Plain text email content
 * @param {string} options.html - HTML email content
 * @returns {Promise<boolean>} - Whether the email was sent successfully
 */
export async function sendEmail({ to, subject, text, html }) {
  try {
    // For development, we'll log the email instead of actually sending it
    // In production, you would use a real email service
    if (process.env.NODE_ENV === 'development') {
      console.log('==== EMAIL WOULD BE SENT IN PRODUCTION ====');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text: ${text}`);
      console.log('==== END OF EMAIL ====');
      
      return true;
    }
    
    // In production, use a real email service
    // Here's an example using nodemailer with a service like Gmail
    
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Send the email
    const info = await transporter.sendMail({
      from: `"Fitness App" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    
    console.log(`Email sent: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
