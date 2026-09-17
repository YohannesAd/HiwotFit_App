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
- **Notes** - Create rich text notes with file attachments and picture upload functionalites
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

### MongoDB connection troubleshooting

`querySrv ENOTFOUND` means the MongoDB Atlas hostname cannot be resolved, before
authentication or account creation happens. Check that the cluster exists and is
running in Atlas; resume it if paused. Copy its current **Connect > Drivers**
connection string into `MONGODB_URI` in `.env.local`, supplying your database
credentials and database name. Restart the development server after changing it.
For a deployed app, update the hosting environment variable and redeploy as well.
Do not commit or share the connection string with its password.

Run the read-only connection check before retrying signup:

```bash
node test-db-connection.js
```

The command exits with a nonzero status if connection or ping fails.
If the hostname resolves but connecting still fails, check Atlas database user
credentials and Network Access for the machine running the app.

Run the connection retry regression tests with `node --test tests/db-connect.test.js`.

If the underlying server error is `UNABLE_TO_VERIFY_LEAF_SIGNATURE` or
`unable to verify the first certificate`, Node may need the trusted certificates
from your operating system. On Node 22.15+ (including this project's local Node
22.16 installation), test with:

```bash
npm run db:check:system-ca
```

If it succeeds, stop the existing development server and restart with:

```bash
npm run dev:system-ca
```

These commands enable Node's `--use-system-ca` option and keep TLS certificate
verification enabled. The regular development and deployment commands are unchanged.

## 👨‍💻 Developer

**Yohannes Addmasie** - [GitHub](https://github.com/YohannesAd)

---

## 📄 License

MIT License - see LICENSE file for details.
