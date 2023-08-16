const { Produit } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.delete('/api/produits/:id', auth, (req, res) => {
    Produit.findByPk(req.params.id).then(produit => {// trouve le produit grace à son ID

      if (produit === null){
        const message = `le produit n'existe pas, ressayez un autre identifiant`
        res.status(404).json({message})
      }

      const produitDeleted = produit;
      return Produit.destroy({// destroy permet de supprimer le produit choisi
        where: { id: produit.id }
      })
      .then(_ => {
        const message = `Le produit avec l'identifiant n°${produitDeleted.id} a bien été supprimé.`
        res.json({message, data: produitDeleted })
      })
    })
    .catch(error =>{
      const message = `La liste des produits n'a pas ete supprimé, elle n'est plus disponible`
      res.status(500).json({message, data: error})
    })
  })
}