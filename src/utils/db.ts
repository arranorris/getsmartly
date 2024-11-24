import { createClient } from '@libsql/client';

const client = createClient({
  url: process.env.VITE_DATABASE_URL as string,
  authToken: process.env.VITE_DATABASE_AUTH_TOKEN,
});

// Vérifie la connexion à la base de données
export async function testDatabaseConnection() {
  try {
    await client.execute('SELECT 1');
    console.log('Connexion à la base de données réussie !');
    return true;
  } catch (error) {
    console.error('Erreur de connexion à la base de données:', error);
    return false;
  }
}

// Le reste du fichier db.ts reste identique...
// (Gardons le code existant pour les fonctions initDatabase, createUser, etc.)