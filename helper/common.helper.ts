
export default class helper{
         
    constructor() {

    }

    escapeChar(req:any){
        for (const key in  req.body){
            req.body[key] = req.body[key].replaceAll("''","\-");
            req.body[key] = req.body[key].replaceAll("-","\-");
        }

        for (const key in  req.param){
            req.param[key] = req.param[key].replaceAll("\'","'");
            req.param[key] = req.param[key].replaceAll("\-","-");
        }
        return req
    }

}