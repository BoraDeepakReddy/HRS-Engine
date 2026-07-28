import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // 1. Create Admin User
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@hrs.com' },
    update: {},
    create: {
      email: 'admin@hrs.com',
      name: 'Super Admin',
      password: adminPassword,
      role: 'admin',
    },
  })
  
  // 2. Create Default User (Hotel Owner)
  const userPassword = await bcrypt.hash('password123', 10)
  const user = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'John Doe',
      password: userPassword,
      role: 'user',
    },
  })

  // 3. Create Hotels
  const hotel1 = await prisma.hotel.create({
    data: {
      name: 'The Azure Retreat',
      description: 'Experience unparalleled luxury on the cliffs of Santorini with breathtaking views of the Aegean Sea.',
      location: 'Santorini, Greece',
      rating: 4.9,
      pricePerNight: 850,
      images: 'https://images.unsplash.com/photo-1542314831-c6a4d14cece2?auto=format&fit=crop&w=800&q=80',
      ownerId: user.id,
      rooms: {
        create: [
          { type: 'Ocean View Suite', maxOccupancy: 2, pricePerNight: 850 },
          { type: 'Cliffside Villa', maxOccupancy: 4, pricePerNight: 1500 }
        ]
      }
    }
  })

  const hotel2 = await prisma.hotel.create({
    data: {
      name: 'Metropolitan Grand',
      description: 'A masterpiece of modern architecture right in the heart of Manhattan.',
      location: 'New York City, USA',
      rating: 4.8,
      pricePerNight: 550,
      images: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      ownerId: user.id,
      rooms: {
        create: [
          { type: 'Deluxe City Room', maxOccupancy: 2, pricePerNight: 550 },
          { type: 'Penthouse Suite', maxOccupancy: 4, pricePerNight: 2200 }
        ]
      }
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
