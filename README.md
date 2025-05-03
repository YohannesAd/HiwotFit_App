# HiwotFit_App 🏋️‍♀️

HiwotFit_App is a fitness web application built with **Next.js** to help users track their workouts and daily calorie needs. The app is designed to provide personalized workout routines and nutrition tracking to help users achieve their fitness goals.

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
  - Categorized exercise library by muscle groups
  - Video demonstrations for each exercise
  - Detailed exercise instructions and tips
  - Favorite exercise functionality
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

### Workout Tracking
- Browse exercises by muscle group
- View detailed exercise instructions with video demonstrations
- Save favorite exercises for quick access

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

- 📊 Advanced progress tracking and analytics
- 📱 Mobile-responsive design improvements
- 🏋️ Custom workout routine builder
- 📆 Workout scheduling and reminders
- 🥗 Meal planning and recipes
- 🌐 Social sharing functionality
- 📈 Progress photos and measurements tracking

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