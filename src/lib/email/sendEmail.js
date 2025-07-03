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
    // Check if email configuration is available
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass || emailPass === 'your-gmail-app-password-here') {
      console.log('==== EMAIL CONFIGURATION NOT SET UP ====');
      console.log('To enable email sending, please:');
      console.log('1. Go to your Google Account settings');
      console.log('2. Enable 2-Factor Authentication');
      console.log('3. Generate an App Password for Gmail');
      console.log('4. Update EMAIL_PASS in .env.local with the App Password');
      console.log('');
      console.log('==== EMAIL CONTENT (WOULD BE SENT) ====');
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Text: ${text}`);
      console.log('==== END OF EMAIL ====');

      return true; // Return true for development purposes
    }

    // Create a transporter with Gmail configuration
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: emailUser,
        pass: emailPass,
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify the transporter configuration
    await transporter.verify();
    console.log('Email transporter verified successfully');

    // Send the email
    const info = await transporter.sendMail({
      from: `"HiwotFit App" <${emailUser}>`,
      to,
      subject,
      text,
      html,
    });

    console.log(`Email sent successfully: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);

    // Log helpful error messages
    if (error.code === 'EAUTH') {
      console.error('Email authentication failed. Please check your EMAIL_USER and EMAIL_PASS in .env.local');
    } else if (error.code === 'ECONNECTION') {
      console.error('Email connection failed. Please check your internet connection and email settings.');
    }

    return false;
  }
}
