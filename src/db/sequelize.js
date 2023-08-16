// sequelize.js
const sequelize = require('../../config/database');
const produits = require('./mock-produit');
const produitModel = require('../../models/produit');
const UserModel = require('../../models/user');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const Produit = produitModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
// Test de la connexion à la base de données
async function testDatabaseConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

// Synchroniser les modèles avec la base de données
async function syncDatabase() {
  try {
    // Remplacez 'modelsPath' par le chemin vers votre dossier de modèles Sequelize
    require('../../models/produit');
    await sequelize.sync({ force: true });
    console.log('Modèles synchronisés avec la base de données.');

    produits.map(produit => {
      Produit.create({
        nom: produit.nom,
        marque: produit.marque,
        prix: produit.prix,
        picture: produit.picture,
        couleurs: produit.couleurs,
        dimensions: produit.dimensions,
        types: produit.types
      }).then(produit => console.log(produit.toJSON()))
    })

    bcrypt.hash('admin', 10)//permet de crypter le mot de passe pour qu'il soit illisible 
      .then(hash => User.create({username: 'admin', password: hash})
      ).then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  } catch (error) {
    console.error('Erreur lors de la synchronisation des modèles :', error);
  }
}

module.exports = { sequelize, testDatabaseConnection, syncDatabase, Produit, User };
