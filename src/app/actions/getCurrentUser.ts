import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import prisma from '@/app/libs/prismadb'

export async function getSession() {
  return await getServerSession(authOptions)
}

// AMAZING NEXT 13 SERVERS COMPONENT BE ABLE TO FETECH DATA FROM DATA BASE
// WITHOUT URL CALL (fetch data base from layout server component : amazing)
export default async function getCurrentUser() {
  try {
    const session = await getSession()

    if (!session?.user?.email) {
      return null
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
    })

    if (!currentUser) {
      return null
    }

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null,
    }
  } catch (error: any) {
    // we are not going to throw an error
    // because this is not api call , it is direct communication with database
    // throw our server component
    return null
  }
}
