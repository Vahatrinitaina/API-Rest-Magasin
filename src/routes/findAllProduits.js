const { Op } = require('sequelize')// operateur sequelize
const produits = require('../db/mock-produit')
const { Produit } = require('../db/sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/produits',auth , (req, res) => {//on applique auth pour s'authentifier
    if (req.query.nom) { 
      const nom = req.query.nom //on utilise query pour preciser les parametres de recherche...ici c'est name...params uniquement pour id
       if (nom.length < 2){
                const mes = 'le terme de recherche minimun est de 2'
                res.status(400).json({mes});
       }     
      const limit = parseInt(req.query.limit) || 5; // Parser le parametre 'limit' pour le transformer en int, la valeure par defaut ici est 5
      
      return Produit.findAndCountAll({// findAndCountAll permet de trouver le nombre et le resultat total demandee
        where: {
          nom: {//name ici est la propriete du modele sequelize
            [Op.like]: `%${nom}%`  //name ici est la critere de recherche. eq comme iquivalent (exact). 'like'...pour trouver des resultat avec le terme de recherche
          }
        },
        order: ['nom'],//ordonne le resultat par nom
        limit:limit
      })
        .then(({count, rows}) => {// count pour compter le nombre de resultat, rows pour le total
          const message = `il y a ${count} qui correspond au terme de recherche ${nom}.`
          res.json({ message, data: rows })
        })
    }
    else {
      Produit.findAll({order: ['nom']})
        .then(produits => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: produits })
        })
        .catch(error => {
          const message = `La liste des produits n'a pas ete recuperee, reessayez dans quelques instant svp`
          res.status(500).json({ message, data: error })
        })
    }
  })
}