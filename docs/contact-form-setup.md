# Contact Form Email Setup Guide

## Overview

The HiwotFit contact form is now fully functional and will send emails to `hiowtfit@gmail.com` when users submit feedback. This guide explains how to complete the email setup.

## Current Status

✅ **Implemented Features:**

- Contact form with validation
- API endpoint for handling submissions
- Email service integration
- Professional HTML email templates
- Error handling and user feedback
- Form state management

⚠️ **Setup Required:**

- Gmail App Password configuration

## Email Setup Instructions

### Step 1: Enable 2-Factor Authentication

1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Follow the prompts to enable 2FA if not already enabled

### Step 2: Generate App Password

1. In Google Account settings, go to **Security** → **App passwords**
2. Select **Mail** as the app
3. Select **Other (Custom name)** as the device
4. Enter "HiwotFit Contact Form" as the name
5. Click **Generate**
6. Copy the 16-character app password (format: xxxx xxxx xxxx xxxx)

### Step 3: Update Environment Variables

1. Open `.env.local` in your project root
2. Replace `your-gmail-app-password-here` with your actual app password:

```env
EMAIL_PASS=your-16-character-app-password
```

**Example:**

```env
EMAIL_PASS=abcd efgh ijkl mnop
```

### Step 4: Test the Contact Form

1. Navigate to `/contact` in your app
2. Fill out the form with test data
3. Submit the form
4. Check your email inbox for the message

## Email Template Features

### Professional Design

- HiwotFit branding with gradient header
- Clean, responsive layout
- Structured information display

### Content Includes

- Sender's name and email
- Timestamp of submission
- Full message content
- Reply-to functionality

### Sample Email Content

```
Subject: HiwotFit Contact Form: Message from John Doe

From: John Doe
Email: john@example.com
Sent: July 3, 2025, 3:45 PM

Message:
I love the app! The workout tracking is fantastic.
Could you add more exercise variations?

💡 Tip: You can reply directly to this email to respond to John.
```

## Technical Implementation

### API Endpoint

- **URL:** `/api/contact`
- **Method:** POST
- **Validation:** Name, email, message required
- **Rate Limiting:** Built-in protection

### Form Validation

- Required fields checking
- Email format validation
- Character limits (Name: 100, Message: 2000)
- Real-time feedback

### Error Handling

- Network errors
- Email service failures
- Validation errors
- User-friendly messages

## Security Features

### Input Sanitization

- XSS prevention
- SQL injection protection
- Email header injection prevention

### Rate Limiting

- Prevents spam submissions
- Server-side validation
- Error logging

## Troubleshooting

### Common Issues

**1. "Email configuration not set up" message**

- Solution: Complete Step 3 above with your actual app password

**2. "Authentication failed" error**

- Check that 2FA is enabled
- Verify app password is correct
- Ensure no extra spaces in password

**3. "Connection failed" error**

- Check internet connection
- Verify Gmail SMTP settings
- Try again after a few minutes

### Development Mode

When `EMAIL_PASS` is not configured, the system will:

- Log email content to console
- Show setup instructions
- Return success to user
- Not actually send emails

This allows development without email setup.

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.js          # Contact form API
│   ├── contact/
│   │   └── page.js               # Contact form UI
│   └── styles/
│       └── Contact.module.css    # Contact form styles
├── lib/
│   └── email/
│       └── sendEmail.js          # Email utility
└── docs/
    └── contact-form-setup.md     # This guide
```

## Production Deployment

### Environment Variables

Ensure these are set in production:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hiowtfit@gmail.com
EMAIL_PASS=your-app-password
```

### Security Considerations

- Never commit app passwords to version control
- Use environment variables in production
- Monitor email sending logs
- Set up email delivery monitoring

## Future Enhancements

### Potential Features

1. **Auto-responder:** Send confirmation emails to users
2. **Categories:** Add subject categories for better organization
3. **File Attachments:** Allow users to attach screenshots
4. **Admin Dashboard:** View and manage contact submissions
5. **Email Templates:** Multiple templates for different purposes

### Analytics

- Track submission rates
- Monitor response times
- Analyze common feedback themes

## Support

If you encounter issues:

1. Check the console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Test with a simple email first
4. Contact your email provider if authentication fails

The contact form is now ready to receive and forward user feedback directly to your email!
