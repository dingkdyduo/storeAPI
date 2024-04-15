import products, { productsMap } from '../model/products';

export class controllerProducts{

    constructor(){
        productsMap()
    }

    async getAll(param:Object = {}){
     return await products.findAll(param)
    }

    async getOne(id:number){
        return await products.findByPk(id)
    }
    async del(id:number){
        return await products.destroy({
            where: {id: id},
          })
    }
    async patch(id:number,param:any){
        return await products.update(param,{where: {id: id}})
    }
   async  createRecord(param:any = {} ) {
      //  let result:object ={}
        return await  products.create(param)
    }

}