const { Produit } = require('../db/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/produits/:id', auth, (req, res) => {
    Produit.findByPk(req.params.id)// l'identifiant permet de trouver le produit 
      .then(produit => {
        if (produit === null){
          const message = `le produit n'existe pas, ressayez un autre identifiant`
          res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: produit })
      })
      .catch(error =>{
        const message = `La liste des produits n'a pas ete recuperee, reessayez dans quelques instant svp`
        res.status(500).json({message, data: error})
      })
  })
}