/**
 * Contact Form API
 * 
 * This API endpoint handles contact form submissions and sends emails
 * to the developer with user feedback and inquiries.
 */

import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email/sendEmail';

/**
 * POST handler for contact form submissions
 * @param {Request} request - The incoming request object
 * @returns {NextResponse} - The API response
 */
export async function POST(request) {
  try {
    // Parse request body
    const { name, email, feedback } = await request.json();
    
    // Validate required fields
    if (!name || !email || !feedback) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate field lengths
    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Name cannot exceed 100 characters' },
        { status: 400 }
      );
    }

    if (feedback.length > 2000) {
      return NextResponse.json(
        { error: 'Feedback cannot exceed 2000 characters' },
        { status: 400 }
      );
    }

    // Prepare email content
    const subject = `HiwotFit Contact Form: Message from ${name}`;
    
    const textContent = `
New contact form submission from HiwotFit App:

Name: ${name}
Email: ${email}
Timestamp: ${new Date().toLocaleString()}

Message:
${feedback}

---
This message was sent through the HiwotFit contact form.
You can reply directly to this email to respond to the user.
    `.trim();

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #e38e0f, #f4a261); padding: 20px; border-radius: 10px 10px 0 0;">
          <h2 style="color: white; margin: 0; text-align: center;">HiwotFit Contact Form</h2>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; border: 1px solid #e9ecef;">
          <h3 style="color: #333; margin-top: 0;">New Message Received</h3>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p style="margin: 5px 0;"><strong>From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #e38e0f;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Sent:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <h4 style="color: #333; margin-top: 0;">Message:</h4>
            <p style="line-height: 1.6; color: #555; white-space: pre-wrap;">${feedback}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 10px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 0; font-size: 14px; color: #666;">
              💡 <strong>Tip:</strong> You can reply directly to this email to respond to ${name}.
            </p>
          </div>
        </div>
        
        <div style="background: #333; color: white; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="margin: 0; font-size: 12px;">
            This message was sent through the HiwotFit contact form.<br>
            <strong>HiwotFit</strong> - Transform Your Fitness Journey
          </p>
        </div>
      </div>
    `;

    // Send email to developer
    const emailSent = await sendEmail({
      to: 'hiowtfit@gmail.com',
      subject: subject,
      text: textContent,
      html: htmlContent
    });

    if (!emailSent) {
      console.error('Failed to send contact form email');
      return NextResponse.json(
        { error: 'Failed to send message. Please try again later.' },
        { status: 500 }
      );
    }

    // Log successful submission
    console.log(`Contact form submission from ${name} (${email}) sent successfully`);

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback! Your message has been sent successfully.'
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'An error occurred while sending your message. Please try again later.' },
      { status: 500 }
    );
  }
}
