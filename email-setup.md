# Email Setup Guide for Falcon Electro Optics Website

This guide explains how to set up the email functionality for the contact form on the Falcon Electro Optics website using EmailJS.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from client-side JavaScript code without requiring a server. It's perfect for static websites like this one.

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/) and sign up for a free account
2. The free plan allows you to send 200 emails per month, which should be sufficient for most small websites

### 2. Create an Email Service

1. After signing in, go to the "Email Services" tab
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the instructions to connect your email account
5. Give your service a name (e.g., "Falcon Contact Form")
6. Note down the **Service ID** for later use

### 3. Create an Email Template

1. Go to the "Email Templates" tab
2. Click "Create New Template"
3. Design your email template using the variables that match the form fields:
   - `{{from_name}}` - The name of the person submitting the form
   - `{{from_email}}` - The email address of the person submitting the form
   - `{{phone}}` - The phone number (if provided)
   - `{{subject}}` - The subject of the message
   - `{{message}}` - The message content

4. Here's a sample template you can use:

```
Subject: New Contact Form Submission: {{subject}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Message:
{{message}}
```

5. Save your template and note down the **Template ID**

### 4. Get Your Public Key

1. Go to the "Account" tab
2. Find your **Public Key** in the API Keys section

### 5. Update the Website Code

1. Open the `js/script.js` file
2. Replace the placeholder values with your actual EmailJS credentials:

```javascript
const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";
const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID";
```

For example:

```javascript
const EMAILJS_PUBLIC_KEY = "user_a1b2c3d4e5f6g7h8i9j0";
const EMAILJS_SERVICE_ID = "service_abc123";
const EMAILJS_TEMPLATE_ID = "template_xyz789";
```

## Testing the Form

After setting up EmailJS and updating the credentials in the script.js file:

1. Open the website in a browser
2. Go to the Contact page
3. Fill out the form and submit it
4. You should receive an email at the address associated with your EmailJS service

## Troubleshooting

If you're not receiving emails:

1. Check the browser console for any error messages
2. Verify that your EmailJS credentials are correct
3. Make sure your email service is properly connected in the EmailJS dashboard
4. Check your spam/junk folder for the test emails

## Alternative: Using Formspree

If you prefer an even simpler solution, you can use [Formspree](https://formspree.io/) instead:

1. Sign up for a free Formspree account
2. Create a new form
3. Update the contact form in `contact.html` to use Formspree:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Remove the EmailJS-specific code from script.js

Formspree's free plan allows 50 submissions per month.