const { ValidationError, UniqueConstraintError } = require('sequelize')
const { Produit } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.post('/api/produits', auth, (req, res) => {
    Produit.create(req.body)// create permet de crée le produit...toutefois nous devons inclure poste dans la ligne précedente
      .then(produit => {
        const message = `Le produit ${req.body.name} a bien été crée.`
        res.json({ message, data: produit })
      })
      .catch(error =>{
        if (error instanceof ValidationError){// en cas d'erreur de la validation, nous appellons ici le code 400 puisque c'est de la faute de l'tuillisateur
          res.status(400).json({message: error.message, data: error})
        }
        if (error instanceof UniqueConstraintError){ // en d'erreur d'unicite pour la partie create et update
          res.status(400).json({message: error.message, data: error})
        }
        const message = `La liste des produits n'a pas ete recuperee, reessayez dans quelques instant svp`
        res.status(500).json({message, data: error})
      })
  })
}