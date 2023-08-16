const { Produit } = require('../db/sequelize')
const { ValidationError, UniqueConstraintError } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.put('/api/produits/:id',auth, (req, res) => {
    const id = req.params.id
    Produit.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
     return Produit.findByPk(id).then(produit => { //return permet de factoriser le comportement de l'erreur 500 a la fois sur findBypk et sur update
        if (produit === null){
          const message = `le produit n'existe pas, ressayez un autre identifiant`
          res.status(404).json({message})
        }
        const message = `Le pokémon ${produit.name} a bien été modifié.`
        res.json({message, data: produit })
      })
    })
    .catch(error =>{
      if (error instanceof ValidationError){// en cas d'erreur de la validation, nous appellons ici le code 400 puisque c'est de la faute de l'tuillisateur
        res.status(400).json({message: error.message, data: error})
      }
      if (error instanceof UniqueConstraintError){ // en d'erreur d'unicite pour la partie create et update
        res.status(400).json({message: error.message, data: error})
      }
        const message = `La liste des produits n'a pas ete modifiee, reessayez dans quelques instant svp`
        res.status(500).json({message, data: error})
      })
  })
}