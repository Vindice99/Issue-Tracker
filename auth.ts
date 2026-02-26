import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Resend from "next-auth/providers/resend"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/prisma/client"
 
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params:{
          access_type: "offline", //get refesh token
          prompt: "consent",
        }
    }}),
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY || "",
    }),
  ],
  callbacks: {
    async jwt({token, user, account}: {token: any; user?: any; account?: any}) {
      // Initial sign in
      if (account && user) {
        return {
           ...token,
          role: user.role,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at! * 1000,
          userId: user.id,
        }
      }

      // Refresh role from database on every token refresh
      if (token.userId) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.userId },
          select: { role: true },
        });
        if (dbUser) {
          token.role = dbUser.role;
        }
      }

     // Access token still valid
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token)
  }, 
  async session({session, token}: {session: any; token: any}) {
      session.user.id = token.userId
      session.user.role = token.role
      session.accessToken = token.accessToken
      session.error = token.error
      return session
    }
}})

async function refreshAccessToken(token: any) {
  try {
    //get a new access token using the refresh token
    const url = "https://oauth2.googleapis.com/token"
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      }),
    })

    const refreshedTokens = await response.json()

    if (!response.ok) throw refreshedTokens

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}