module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        /*unique:{ //contrainte d'unicite
            message: 'Le nom est deja pris, choisissez un autre'
          },*/
      },
      password: {
        type: DataTypes.STRING
      }
    })
  }