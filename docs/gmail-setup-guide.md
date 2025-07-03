# Gmail App Password Setup Guide for HiwotFit Contact Form

## Overview
This guide will walk you through setting up Gmail App Password for the email `hiowtfit@gmail.com` to enable the HiwotFit contact form to send emails.

---

## Step 1: Enable 2-Factor Authentication (2FA)

### 1.1 Access Google Account Settings
1. **Open your web browser** and go to: https://myaccount.google.com/
2. **Sign in** with your `hiowtfit@gmail.com` account
3. You'll see the Google Account dashboard

### 1.2 Navigate to Security Settings
1. **Click on "Security"** in the left sidebar menu
   - You'll see various security options
2. **Look for "2-Step Verification"** section
   - It should show "Off" if not enabled yet

### 1.3 Enable 2-Step Verification
1. **Click on "2-Step Verification"**
2. **Click "Get Started"** button
3. **Enter your password** when prompted
4. **Choose your verification method:**
   - **Phone number (Recommended):** Enter your phone number
   - **Authenticator app:** Use Google Authenticator or similar
5. **Follow the prompts** to complete setup:
   - For phone: You'll receive a text with a code
   - Enter the verification code
6. **Click "Turn On"** to enable 2FA

### 1.4 Verify 2FA is Active
- You should see "2-Step Verification: On" in your security settings
- You may be prompted to add backup methods (recommended)

---

## Step 2: Generate Gmail App Password

### 2.1 Access App Passwords
1. **Stay in the Security section** of your Google Account
2. **Look for "App passwords"** (this only appears after 2FA is enabled)
   - If you don't see it, refresh the page
3. **Click on "App passwords"**

### 2.2 Create New App Password
1. **You'll see "App passwords" page**
2. **Click the dropdown** that says "Select app"
3. **Choose "Mail"** from the dropdown
4. **Click the second dropdown** that says "Select device"
5. **Choose "Other (Custom name)"**
6. **Enter a name:** Type "HiwotFit Contact Form"
7. **Click "Generate"**

### 2.3 Copy Your App Password
1. **Google will generate a 16-character password**
   - Format: `abcd efgh ijkl mnop` (4 groups of 4 characters)
2. **Copy this password immediately** - you won't see it again
3. **Keep it secure** - treat it like a regular password

---

## Step 3: Update HiwotFit Configuration

### 3.1 Open Your Project
1. **Navigate to your HiwotFit project folder**
2. **Open the `.env.local` file** in your code editor

### 3.2 Update Email Configuration
1. **Find this line:**
   ```env
   EMAIL_PASS=your-gmail-app-password-here
   ```

2. **Replace with your actual app password:**
   ```env
   EMAIL_PASS=abcd efgh ijkl mnop
   ```
   *(Use your actual 16-character password)*

3. **Save the file**

### 3.3 Restart Your Development Server
1. **Stop your current server** (Ctrl+C in terminal)
2. **Restart with:** `npm run dev`
3. **Wait for compilation to complete**

---

## Step 4: Test the Contact Form

### 4.1 Access the Contact Form
1. **Open your browser** and go to: http://localhost:3001/contact
2. **Fill out the test form:**
   - **Name:** Your Test Name
   - **Email:** your-email@example.com
   - **Message:** This is a test message from the contact form.

### 4.2 Submit and Verify
1. **Click "Send Feedback"**
2. **You should see:** "Sending..." then "Thank you for your feedback!"
3. **Check the terminal** for success logs
4. **Check `hiowtfit@gmail.com` inbox** for the email

---

## Troubleshooting

### Issue: "App passwords" option not visible
**Solution:** 
- Ensure 2FA is properly enabled
- Refresh the Google Account page
- Try logging out and back in

### Issue: "Authentication failed" error
**Solution:**
- Double-check the app password is copied correctly
- Ensure no extra spaces in the password
- Try generating a new app password

### Issue: "Less secure app access" message
**Solution:**
- This is normal - App passwords are the secure method
- Don't enable "Less secure app access"
- Use App passwords instead

### Issue: Email not received
**Solution:**
- Check spam/junk folder
- Verify the email address `hiowtfit@gmail.com` is correct
- Check terminal logs for error messages

---

## Security Best Practices

### Protect Your App Password
- **Never share** your app password
- **Don't commit** it to version control
- **Store securely** in environment variables only

### Monitor Usage
- **Check your Google Account activity** regularly
- **Revoke unused app passwords** from time to time
- **Use unique app passwords** for different applications

### Backup Access
- **Set up backup phone numbers** for 2FA
- **Save backup codes** provided by Google
- **Keep recovery email** up to date

---

## Expected Results

### Successful Setup Indicators
✅ 2FA enabled on Google Account  
✅ App password generated successfully  
✅ `.env.local` updated with correct password  
✅ Contact form sends emails without errors  
✅ Emails received at `hiowtfit@gmail.com`  

### Email Format You'll Receive
```
From: HiwotFit App <hiowtfit@gmail.com>
To: hiowtfit@gmail.com
Subject: HiwotFit Contact Form: Message from [User Name]

[Professional HTML email with user's message]
```

---

## Quick Reference

### Important URLs
- **Google Account:** https://myaccount.google.com/
- **Security Settings:** https://myaccount.google.com/security
- **App Passwords:** https://myaccount.google.com/apppasswords

### Configuration File
```env
# .env.local
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=hiowtfit@gmail.com
EMAIL_PASS=your-16-character-app-password
```

### Test Command
```bash
# Restart development server
npm run dev
```

Once completed, your HiwotFit contact form will be fully functional and sending emails to `hiowtfit@gmail.com`! 🎉
