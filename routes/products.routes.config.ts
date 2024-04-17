import {CommonRoutesConfig} from '../common/common.routes.config';
import express from 'express';
import { errorHandling } from '../common/error.handling';
import { controllerProducts} from '../controller/cont.products'


export class productsRoutes extends CommonRoutesConfig {

    private prod = new controllerProducts()
    constructor(app: express.Application) {
        super(app, 'ProductsRoutes');
    }
     configureRoutes() {
        this.app.route(`/products/filtered`)
        .post( async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let params = {}
            if(req.body){
               params = {where: req.body}
            }
            let response =  await  this.prod.getAll(params) 
            res.status(200).json(response);     
        })

        this.app.route(`/products`)
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
         let response =  await  this.prod.getAll(params) 
         res.status(200).json(response);     
   
        })
        .post(async(req: express.Request, res: express.Response) => {  
            try{
            let  response =  await this.prod.createRecord(req.body)
            res.status(200).json({message:`Products: ${response.name} was created with ID: ${response.id}`});
            } catch (error:any){
                let msg = error.original?.message ||  error.errors
                res.status(400).json({message: msg} ) ;   
            }
                
        });

       this.app.route(`/products/:id`)
        .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
            // this middleware function runs before any request to /category/:userId
            next();
        })
        .get(async(req: express.Request, res: express.Response) => {
            let response =  await  this.prod.getOne(Number(req.params.id)) 
            res.status(200).json(response);     
        })
        .patch(async (req: express.Request, res: express.Response) => {
            let response =  await  this.prod.patch(Number(req.params.id),req.body)
            let message=response[0]>0 ? `${response[0]} record updated`:`no record for ID: req.params.id `
            res.status(200).json({message:message});     

        })
        .delete(async(req: express.Request, res: express.Response) => {
            let response =  await  this.prod.del(Number(req.params.id)) 
            let message=response>0 ? `${response} record deleted`:`no record for ID: ${req.params.id} `
            res.status(200).json({message:message}); 

        });
        return this.app;
    }
}