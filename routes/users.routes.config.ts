import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { controllerUser } from '../controller/cont.users'

export class UsersRoutes extends CommonRoutesConfig {
    private users = new controllerUser()

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route(`/users`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /category
            next();
        })
        .get(async (req: express.Request, res: express.Response) => {
         //get all category
         let params = {}
         if(req.body){
            params = {where: req.body}
         }
         let response =  await  this.users.getAll(params) 
         res.status(200).json(response);     
   
        })
        .post(async(req: express.Request, res: express.Response) => {  
            try{
            let  response =  await this.users.createRecord(req.body)
            res.status(200).json({message:`user: ${response.fullname} was created with ID: ${response.id}`});
            } catch (error:any){
                res.status(400).json({message: error.original.message} ) ;   
            }
                
        });

       this.app.route(`/users/:id`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /category/:userId
            
                next();
           
        })
        .get(async(req: express.Request, res: express.Response) => {
            let response =  await  this.users.getOne(Number(req.params.id)) 
            res.status(200).json(response);     
        })
        .patch(async (req: express.Request, res: express.Response) => {
            let response =  await  this.users.patch(Number(req.params.id),req.body)
            let message=response[0]>0 ? `${response[0]} record updated`:`no record for ID:  ${req.params.id}`
            res.status(200).json({message:message});     

        })
        .delete(async(req: express.Request, res: express.Response) => {
            let response:any =  await  this.users.del(Number(req.params.id)) 
            let message=response>0 ? `${response} record updated`:`no record for ID: ${req.params.id} `
            res.status(200).json({message:message}); 

        })

        .post(async (req: express.Request, res: express.Response) => {
            //get filtered category
            let params = {}
            if(req.body){
               params =  {where: req.body}
            }
            let response =  await  this.users.getAll(params) 
            res.status(200).json(response);     
         })
 
        return this.app;
    }
}