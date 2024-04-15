import {  DataTypes,Model } from 'sequelize';
import  sequelize  from '../DB/postgress'

export default class users extends Model {
  public id?: number;
  public username!: string;
  public fullname!: string;
  public password!: string;
  public avatar?: string;
}

export const usersMap = () => {
    users.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    fullname: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    username: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'users',
    timestamps: true,
    createdAt: false,
    updatedAt:false
  });
  users.sync();
}
