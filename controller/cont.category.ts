import category, { categoryMap } from '../model/category';

export class controllerCategory{

    constructor(){
        categoryMap()
    }

    async getAll(param:Object = {}){
     return await category.findAll(param)
    }

    async getOne(id:number){
        return await category.findByPk(id)
    }
    async del(id:number){
        return await category.destroy({
            where: {id: id},
          })
    }
    async patch(id:number,param:any){
        return await category.update(param,{where: {id: id}})
    }
   async  createRecord(param:any = {} ) {
      //  let result:object ={}
        return await  category.create(param)
    }

}