module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "user_details",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      gender: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      status: {
        type: DataTypes.SMALLINT,
        allowNull: false,
      },
    },
    {
      timestamps: false, // Disable automatic creation of createdAt and updatedAt columns
    }
  );

  return User;
};
