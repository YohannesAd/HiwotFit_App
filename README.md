# HiwotFit 🏋️‍♀️

A modern fitness web application for tracking workouts, nutrition, and fitness notes.

## 🌐 Live App

**[https://hiwot-fit-app.vercel.app/](https://hiwot-fit-app.vercel.app/)**

---

## ✨ Features

- **Authentication** - Secure login/signup with password reset
- **Workout Library** - 50+ exercises with video demonstrations across 8 muscle groups
- **Workout Tracking** - Log workouts with sets, reps, weight, and notes
- **Workout History** - View past workouts organized by date
- **Notes** - Create rich text notes with file attachments
- **Calorie Calculator** - BMR/TDEE calculations with macro recommendations
- **Profile Management** - Update profile info and pictures
- **Contact Form** - Send feedback directly to the developer

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT & NextAuth.js
- **Styling**: CSS Modules
- **Deployment**: Vercel

---

## 🚀 Local Development

1. **Clone the repository**

```bash
git clone https://github.com/YohannesAd/HiwotFit_App.git
cd HiwotFit_App
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**
   Create `.env.local`:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 👨‍💻 Developer

**Yohannes Addmasie** - [GitHub](https://github.com/YohannesAd)

---

## 📄 License

MIT License - see LICENSE file for details.
