# HiwotFit_App 🏋️‍♀️

HiwotFit_App is a comprehensive fitness web application built with **Next.js** that empowers users to track their workouts, log daily exercise sessions, manage nutrition goals, and organize fitness-related notes. The app provides a complete fitness ecosystem with workout recording, calorie tracking, rich note-taking capabilities, and detailed progress monitoring to help users achieve their fitness goals.

---

## 🚧 Current Status: In Development

### ✅ Features Implemented So Far:

- **Landing Page**
  - Professional design with custom logo
  - Motivational content and feature highlights
  - Navigation and "Get Started" CTA
- **Authentication System**
  - Login page with email/password
  - Signup page for new users
  - Password reset flow (email verification)
  - JWT-based authentication with secure cookies
- **User Dashboard**
  - Personalized welcome message
  - Quick access to workouts and calorie tracking
  - Stats display (workouts, calories, favorites)
  - Recent activity tracking
- **Workout System**
  - Categorized exercise library by muscle groups (chest, back, shoulders, arms, legs, core, calf, glutes)
  - Video demonstrations for each exercise
  - Detailed exercise instructions and tips
  - Favorite exercise functionality
- **Workout Recording & Tracking** 🆕
  - Daily workout logging with detailed exercise tracking
  - Record workout duration, calories burned, and notes
  - Track sets, reps, weight, and exercise-specific details
  - Workout history organized by date with expandable sections
  - Quick workout logging from home page and workout history page
  - Comprehensive workout session management
- **Notes Feature** 🆕
  - Rich text note creation with embedded media support
  - File upload functionality (images, documents up to 10MB)
  - Hierarchical organization (Last 7 Days → Monthly → Yearly)
  - Note editing, viewing, and deletion capabilities
  - Attachment management with multiple file types
  - Accessible via profile dropdown menu
- **Calorie Tracking**
  - Personal information form (age, weight, height, gender, activity level, goal)
  - BMR and TDEE calculations
  - Macronutrient recommendations (protein, carbs, fat)
  - Calculation history and records
- **User Profile**
  - Profile picture upload and management
  - Account settings and preferences
  - Password change functionality

---

## 🛠️ Technology Stack

- **Frontend**: Next.js 15, React 19
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, NextAuth.js
- **Styling**: CSS Modules
- **Charts**: Chart.js with react-chartjs-2
- **Deployment**: Vercel (planned)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18.0 or higher
- npm or yarn package manager
- MongoDB connection (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YohannesAd/HiwotFit_App.git
cd HiwotFit_App
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

---

## 📱 Features & Usage

### Authentication
- Sign up with email and password
- Log in to access personalized features
- Reset password via email verification

### Workout System
- Browse exercises by muscle group (chest, back, shoulders, arms, legs, core, calf, glutes)
- View detailed exercise instructions with video demonstrations
- Save favorite exercises for quick access

### Workout Recording & Tracking
- **Log Daily Workouts**: Record your workouts with detailed information
  - Workout name and primary muscle group
  - Duration and estimated calories burned
  - Individual exercise tracking (sets, reps, weight)
  - Personal notes and observations
- **Workout History**: View your complete workout journey
  - Organized by date with expandable sections
  - Detailed workout summaries and exercise breakdowns
  - Track progress over time
- **Quick Access**: Log workouts from home page or dedicated workout history page

### Notes Feature
- **Rich Text Notes**: Create detailed notes with formatting and media
  - Embed images and videos directly in note content
  - Upload files and attachments (up to 10MB each)
  - Rich text editing with toolbar controls
- **Smart Organization**: Notes automatically organized by time
  - Last 7 Days for recent notes
  - Monthly grouping for older notes
  - Yearly archives for long-term storage
- **Full Management**: Create, edit, view, and delete notes
  - Accessible via profile dropdown menu
  - Search and browse through your note collection

### Calorie & Nutrition Tracking
- Calculate daily calorie needs based on personal metrics
- Get personalized macronutrient recommendations
- Track calorie calculations over time

### User Profile
- Update profile information
- Change profile picture
- Manage account settings

---

## 🔮 Upcoming Features

- 📊 Advanced progress tracking and analytics with charts
- 📱 Mobile-responsive design improvements
- 🏋️ Custom workout routine builder and templates
- 📆 Workout scheduling and reminders
- 🥗 Meal planning and nutrition recipes
- 🌐 Social sharing and community features
- 📈 Progress photos and body measurements tracking
- 🔍 Advanced search and filtering for notes and workouts
- 📤 Export functionality for workout data and notes
- 🎯 Goal setting and achievement tracking
- 📲 Push notifications for workout reminders

---

## 👨‍💻 Contributors

- [Yohannes Addmasie](https://github.com/YohannesAd) - Lead Developer

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🙏 Acknowledgments

- Special thanks to all the fitness enthusiasts who provided feedback
- Exercise video content creators
- Next.js and React communities for their excellent documentation