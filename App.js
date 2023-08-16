const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const { testDatabaseConnection, syncDatabase} = require('./src/db/sequelize');

const app = express();
const port = 3000;

// Test de la connexion à la base de données
testDatabaseConnection();
// Synchroniser les modèles avec la base de données et ajout des nouveaux produits
syncDatabase();

app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))
    .use(bodyParser.json())

    // Nous placerons ici nos futures points de terminaison
require('./src/routes/findAllProduits')(app) // permet de trouver tous les produits

require('./src/routes/findProduitByPk')(app)// permet de trouver un produit via son ID

require('./src/routes/createProduit')(app)// permet de créer un nouveau produit
require('./src/routes/updateProduit')(app)// mise à jour d'un produit
require('./src/routes/deleteProduit')(app) // suppréssion d'un produit
require('./src/routes/login')(app)// login au REST API

// gestion d'erreur 404 par ici
app.use(({res})=>{
    const message = 'impossible de trouver la ressource demandee, corrigez votre url'
    res.status(404).json({message})// permet de definir une statut, le  code correspond a l'erreur, 404: page not found
})

app.listen(port, () => console.log(`Notre app tourne sur le port ${port}`))
