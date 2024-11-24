import { initDatabase } from '../src/utils/db.js';

async function setup() {
  try {
    await initDatabase();
    console.log('Base de données initialisée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données:', error);
    process.exit(1);
  }
}

setup();