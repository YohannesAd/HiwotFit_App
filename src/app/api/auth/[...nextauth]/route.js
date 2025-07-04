// Temporarily disabled for deployment
// import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db/connect';
import User from '@/lib/db/models/User';

// NextAuth configuration for user authentication using credentials provider

// Temporary simple handler for deployment
export async function GET() {
  return new Response('NextAuth temporarily disabled for deployment', { status: 200 });
}

export async function POST() {
  return new Response('NextAuth temporarily disabled for deployment', { status: 200 });
}

/*
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Connect to the database
          await dbConnect();

          // Find user by email
          const user = await User.findOne({ email: credentials.email });

          // If user not found, return null
          if (!user) {
            return null;
          }

          // Compare provided password with stored hash
          const isPasswordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // If password does not match, return null
          if (!isPasswordMatch) {
            return null;
          }

          // Update last login timestamp
          user.lastLogin = new Date();
          await user.save();

          // Return user data for session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            username: user.username,
            profilePicture: user.profilePicture,
          };
        } catch (error) {
          console.error('Authentication error:', error);
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user info to JWT token
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token info to session
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.profilePicture = token.profilePicture;
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === 'development',
});

// Export handler for GET and POST requests
export { handler as GET, handler as POST };
*/
