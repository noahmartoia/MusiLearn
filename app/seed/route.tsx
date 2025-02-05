import bcrypt from 'bcrypt';
import postgres from 'postgres';
import { users } from '../lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  console.log('Extension uuid-ossp créée');
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      name VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      createdAt TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
  console.log('Table users créée');

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await sql`
        INSERT INTO users (id, email, password, name, role, createdAt)
        VALUES (${user.id}, ${user.email}, ${hashedPassword}, ${user.name}, ${user.role}, ${new Date()})
        ON CONFLICT (id) DO NOTHING;
      `;
      console.log(`Utilisateur inséré : ${user.email}`);
    }),
  );

  return insertedUsers;
}

async function seedCourses() {
  await sql`
    CREATE TABLE IF NOT EXISTS courses (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      instrument VARCHAR(50) NOT NULL,
      teacherId UUID REFERENCES users(id) ON DELETE CASCADE,
      level VARCHAR(50) NOT NULL,
      schedule VARCHAR(100) NOT NULL,
      capacity INT NOT NULL
    );
  `;
  console.log('Table courses créée');
  // Insérer des cours d'exemple si nécessaire
}

async function seedEnrollments() {
  await sql`
    CREATE TABLE IF NOT EXISTS enrollments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID REFERENCES courses(id) ON DELETE CASCADE,
      enrollmentDate TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      status VARCHAR(50) NOT NULL
    );
  `;
  console.log('Table enrollments créée');
  // Insérer des inscriptions d'exemple si nécessaire
}

async function seedProgress() {
  await sql`
    CREATE TABLE IF NOT EXISTS progress (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      studentId UUID REFERENCES users(id) ON DELETE CASCADE,
      courseId UUID REFERENCES courses(id) ON DELETE CASCADE,
      date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      evaluation TEXT,
      comments TEXT
    );
  `;
  console.log('Table progress créée');
  // Insérer des progressions d'exemple si nécessaire
}

export async function GET() {
  try {
    await seedUsers();
    await seedCourses();
    await seedEnrollments();
    await seedProgress();

    return new Response(JSON.stringify({ message: 'Database seeded successfully' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'exécution du seed:', error);
    return new Response(JSON.stringify({ error: error }), { status: 500 });
  }
}
