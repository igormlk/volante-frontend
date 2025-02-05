import { DataTypes } from "sequelize";
import db from "../config/database.js";

export const Vehicle = db.define('vehicle', {
    plate: {
        type: DataTypes.STRING(7),
        allowNull: false
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    model: {
        type: DataTypes.STRING,
        allowNull: true
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    },
    km: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fuel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    chassi: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    tableName: 'vehicles'
})