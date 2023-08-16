const valideTypes = ["Outillage", "Electromenager", "Jardinage", "Electrique", "Peinture", "Verrerie", "Colle", "Bureatique", "Construction"]
const valideCoul = ["Rouge", "Blanc", "Bleue", "Gris", "Orange", "Violet", "Grenat", "Noir", "Vert", "Marron"]

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('produit', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
     /* unique: { //contrainte d'unicite
        message: 'Le nom est deja pris, choisissez un autre'
      },*/
      validate: {
        notEmpty: { message: 'Le champ nom ne doit pas etre vide' },
        notNull: { msg: 'nom est une propriete requise' }
      }
    },
    marque: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { message: 'Le champ marque ne doit pas etre vide' },
        notNull: { msg: 'marque est une propriete requise' }
      }
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: { msg: 'utilisez uniquement des nombres entiers svp pour les points de vie' },
        notNull: { msg: 'hp est une propriete requise' },
        min: {
          args: [0],
          message: 'le chiffre le plus bas accepte est 0'
        },
        max: {
          args: [9999],
          message: 'le chiffre le plus haut accepte est 9999'
        }
      }
    },
    dimensions: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { message: 'Le champ dimension ne doit pas etre vide' },
        notNull: { msg: 'marque est une propriete requise' }
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'l\'URL de l\'image que vous avez introduit est invalide ' },
        notNull: { msg: 'picture est une propriete requise' }
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split(',')// en mode get, split permet d'obtenir la valeure desire en tableau ["plane", "poisson"]
      },
      set(types) {
        return this.setDataValue('types', types.join())// en mode set, types.join() permet de transformer le resultat en chaine de caractere: "plante", tableau
      },
      validate: {
        isTypeValid(value) {// isTypeValid est ici un validateur personnalisee
          if (!value) {
            throw new Error('Un produit doit avoir au moins un type') //throw et Error sont utilises pour definir un nouveau type d'erreur
          }
          if (value.split(',') > 3) {
            throw new Error(' Un produit ne doit pas avoir plus de 3 types en meme temps')
          }
          value.split(',').forEach(type => {
            if (!valideTypes.includes(type)) { // si le type n'appartient pas a la liste predifinie dans le tableau valideTypes...
              throw new Error(`Le type d'un produit doit appartenir a la liste suivante: ${valideTypes}`)
            }
          });
        }
      }
    },
    couleurs: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('couleurs').split(',')// en mode get, split permet d'obtenir la valeure desire en tableau ["plane", "poisson"]
      },
      set(couleurs) {
        return this.setDataValue('couleurs', couleurs.join())// en mode set, types.join() permet de transformer le resultat en chaine de caractere: "plante", tableau
      },
      validate: {
        isTypeValide(value) {// isTypeValide est ici un validateur personnalisee
          if (!value) {
            throw new Error('Un produit doit avoir au moins un type de couleur') //throw et Error sont utilises pour definir un nouveau type d'erreur
          }
          if (value.split(',') > 3) {
            throw new Error(' Un produit ne doit pas avoir plus de 3 types de couleurs en meme temps')
          }
          value.split(',').forEach(couleurs => {
            if (!valideCoul.includes(couleurs)) { // si le type n'appartient pas a la liste predifinie dans le tableau valideTypes...
              throw new Error(`Le type de couleur d'un produit doit appartenir a la liste suivante: ${valideCoul}`)
            }
          });
        }
      }
    }


  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}