
export class errorHandling {
    constructor() {
        // establish mongo here or/and email sender
    }

   public  send(httpCode:Number,error:Object,res:any){
    res.status(httpCode).json(error);
   }
}