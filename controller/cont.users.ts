import users, { usersMap } from '../model/users';

export class controllerUser{

    constructor(){
        usersMap()
    }

    async getAll(param:Object = {}){
     return await users.findAll(param)
    }

    async getOne(id:number){
        return await users.findByPk(id)
    }
    async del(id:number){
        return await users.destroy({
            where: {id: id},
          })
    }
    async patch(id:number,param:any){
        return await users.update(param,{where: {id: id}})
    }
   async  createRecord(param:any = {} ) {
      //  let result:object ={}
        return await  users.create(param)
    }

}