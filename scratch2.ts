import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.findUnique({ where: { email: 'admin@hrs.com' } })
  if (!user) {
    console.log("No user")
    return
  }
  const isMatch = await bcrypt.compare('admin123', user.password)
  console.log("Password match:", isMatch)
}

main().finally(() => prisma.$disconnect())
