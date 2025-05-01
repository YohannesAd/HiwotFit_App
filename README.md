This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# HiwotFit_App 🏋️‍♀️

HiwotFit_App is a comprehensive fitness web application built with **Next.js** to help users track their workouts, discover exercises, and calculate their daily calorie needs. The app provides personalized fitness guidance and tracking tools.

---

## 🚀 Current Status: Version 1.0 Ready

### ✅ Features Implemented:

- **Landing Page**
  - Full background image with responsive design
  - Motivational quote
  - Navigation and "Start Your Journey" CTA
- **Authentication System**
  - Complete user registration and login
  - Secure password management
  - Forgot Password flow with email verification
  - User profile management with profile picture
  - MongoDB database integration for user data storage
- **Workout Features**
  - Comprehensive list of muscle groups (Chest, Back, Legs, Arms, Shoulders, etc.)
  - Detailed exercise pages for each muscle group
  - Exercise videos with proper form demonstrations
  - Exercise descriptions and instructions
  - Favorite exercises functionality to save preferred workouts
- **Calorie Tracking**
  - Personal information form (age, weight, height, gender)
  - Advanced activity level selection
  - Goal setting (cut, bulk, maintain)
  - Support for both metric and imperial measurements
  - Calorie calculation results with macronutrient breakdown
  - Calorie data storage linked to user accounts
- **User Dashboard**
  - User profile management
  - Saved favorite exercises
  - Calorie calculation history
  - Account settings

---

## ✨ Upcoming Features for Future Versions:

- 📊 Detailed progress tracking and analytics
- 📆 Workout scheduling and calendar integration
- 🏆 Achievement system and fitness goals
- 💬 Community features and social sharing
- 📱 Mobile app version
- 🔔 Workout reminders and notifications
- 📈 Advanced fitness metrics and body composition tracking

---

## 🛠️ Technologies Used:
- Next.js for frontend and API routes
- MongoDB for database
- JWT for authentication
- React for UI components
- CSS Modules for styling
- Responsive design principles

---

## 🗂️ Folder Structure
```
src/
  app/
    api/                    → API routes for authentication, profile, favorites, etc.
    auth/                   → Login, Signup, Forgot Password, etc.
    components/             → Navbar, Footer, Buttons, ProtectedRoute
    context/                → AuthContext for user authentication state
    dashboard/              → User dashboard pages
    features/
      workout/              → Muscle group list & exercises
      calories/             → Calorie tracking forms and results
    profile/                → User profile management
    styles/                 → CSS modules for each page
  lib/
    auth/                   → Authentication utilities
    db/                     → Database connection and models
public/
  assets/                   → Images and static assets
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YohannesAd/HiwotFit_App.git
cd HiwotFit_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 👩‍💻 Contributors

- Hiwot Beshe - Lead Developer
