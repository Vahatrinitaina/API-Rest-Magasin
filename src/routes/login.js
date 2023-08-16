const e = require('express')
const { User } = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const privateKey = require('../auth/private_key')
  
module.exports = (app) => {
  app.post('/api/login', (req, res) => {
  
    User.findOne({ where: { username: req.body.username } }).then(user => {

        if(!user){
            const message='Cet utilisateur n\'existe pas'
            return res.status(404).json({message});
        }

      bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {// compare permet de comparer le mdp entré par l'utilisateur avec celui dans la BD
        if(!isPasswordValid) {
          const message = `Le mot de passe est incorrect`;
          return res.status(401).json({ message})// 401: accès aux ressources non autorisé..mauvais mdp
        }

        //  JWT 
        const token = jwt.sign(// sign permet de generer le jeton
          {userId: user.id},
          privateKey,
          {expiresIn: '24h'}
        )

        const message = `L'utilisateur a été connecté avec succès`;
          return res.json({ message, data: user, token })
      })
    })
    .catch(error=>{
      const message = `L'utilisateur n'a pas pu se connecter. Réessayez plus tard`;
      return res.json({ message, data: error })
    })

  })
}