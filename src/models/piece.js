const piece = (sequelize, DataTypes) => {
    const Piece = sequelize.define('piece', {
        title: {
            type: DataTypes.STRING,
        },
        subtitle: {
            type: DataTypes.STRING,
        },
        composer: {
            type: DataTypes.STRING,
        },
        duration: {
            type: DataTypes.INTEGER,
        },
    });

    return Piece;
};

export default piece;