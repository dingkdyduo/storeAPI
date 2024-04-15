import {  DataTypes,Model } from 'sequelize';
import  sequelize  from '../DB/postgress'

export default class products extends Model {
  public id?: number;
  public name!: string;
  public category_name!: string;
  public price!: string;
  public product_description?: string;
  public image?: string;
}

export const productsMap = () => {
  products.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },
    category_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    product_description: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true,
    createdAt: false,
    updatedAt:false
  });
  products.sync();
}
