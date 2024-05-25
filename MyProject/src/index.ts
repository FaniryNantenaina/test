// src/app.ts
import "reflect-metadata";
import express from 'express';
import { AppDataSource } from './data-source';
import Routes from './routes/route';
import cors from "cors";


async function startServer() {
  try {
    // Initialisation de la connexion à la base de données
    await AppDataSource.initialize();
    console.log('Connected to database');

    

    // Initialisation de l'application Express

    const PORT = 3004;

    // Middleware pour parser les requêtes JSON
    const app = express();
    const bodyParser = require('body-parser');
   app.use(cors());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    // Ajout des routes
    app.use('/api', Routes);

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
  }
}

// Démarrage du serveur
startServer();


