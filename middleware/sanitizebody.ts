import helper from '../helper/common.helper'

export default function sanitizeUserInput(req:any){
    const commonHelper = new  helper()
     req = commonHelper.escapeChar(req)
     return
}
