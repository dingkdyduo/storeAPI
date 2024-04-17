import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { errorHandling } from '../common/error.handling';
import { controllerCategory } from '../controller/cont.category'
import  sanitizeUserInput  from '../middleware/sanitizebody'


export class CategoryRoutes extends CommonRoutesConfig {

    private categ = new controllerCategory()
    constructor(app: express.Application) {
        super(app, 'CategoryRoutes');
    }
     configureRoutes() {
        this.app.route(`/category/filtered`)
        .post(async (req: express.Request, res: express.Response) => {
            //get filtered category
            let params = {}
            if(req.body){
               params = {where: req.body}
            }
            let response =  await  this.categ.getAll(params) 
            res.status(200).json(response);     
         })

        this.app.route(`/category`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /category
            sanitizeUserInput(req)
            next();
        })
        .get(async (req: express.Request, res: express.Response) => {
         //get all category
         let response =  await  this.categ.getAll() 
         res.status(200).json(response);     
   
        })
        .post(async(req: express.Request, res: express.Response) => {  
            try{
            let  response =  await this.categ.createRecord(req.body)
            res.status(200).json({message:`category: ${response.name} was created with ID: ${response.id}`});
            } catch (error:any){
               res.status(400).json({message: error.original.message} ) ;   
            }
                
        });

       this.app.route(`/category/:id`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /category/:userId
            next();
        })
        .get(async(req: express.Request, res: express.Response) => {
            let response =  await  this.categ.getOne(Number(req.params.id)) 
            res.status(200).json(response);     
        })
        .patch(async (req: express.Request, res: express.Response) => {
            let response =  await  this.categ.patch(Number(req.params.id),req.body)
            let message=response[0]>0 ? `${response[0]} record updated`:`no record for ID:  ${req.params.id} `
            res.status(200).json({message:message});     

        })
        .delete(async(req: express.Request, res: express.Response) => {
            let response =  await  this.categ.del(Number(req.params.id))
            let message=response>0 ? `${response} record deleted`:`no record for ID: ${req.params.id} `
            res.status(200).json({message:message}); 
        });
        return this.app;
    }
}