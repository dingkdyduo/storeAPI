import {DataTypes,Model } from 'sequelize';
import  sequelize  from '../DB/postgress'

export interface categoryAttributes {
    id: number;
    name : string;
    shortdescription? : string;
    longdescription ?: string;
}
 

export default class category extends Model {
  public id?: number;
  public name!: string;
  public shortdescription?: string;
  public longdescription?: string;
}

export const categoryMap = () => {
 category.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    shortdescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    longdescription: {
      type: DataTypes.STRING(2000),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    timestamps: true,
    createdAt: false,
    updatedAt:false
  });
  category.sync();
}



/*
export function category() {
    const category: any = sequelize.define('category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {type:DataTypes.STRING,allowNull:false},
        shortdescription: {type:DataTypes.STRING,allowNull:false},
        longdescription: {type:DataTypes.STRING,allowNull:true},
    });
    console.log(category)
    return category;
}
*/
