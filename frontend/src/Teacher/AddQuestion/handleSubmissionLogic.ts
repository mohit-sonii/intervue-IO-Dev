import type { OptionsType } from "../../types"

export const areAllFieldsValid=(questionText:string,allOptions:OptionsType[]):{status:number,message:string}=>{

    if(questionText.length ==0 ||questionText.length>100){
        return {status:409,message:"Question Field does not match the constrains"}
    }
    if(allOptions.length<2){
        return {status:409,message:"Atleast add 2 options"}
    }
    let countTrue = 0;
    for(const object of allOptions){
        if(object.correctOption=='yes'){
            countTrue++;
        }
        if(countTrue>1){
            return {status:400,message:"No more than 1 option can be true"}
        }
        if(object.optionName.length==0){
            return {status:409,message:"No Option can be empty !!"}
        }
        if(object.correctOption.length==0){
            return {status:409,message:"Option must be either True or False"}
        }
    }
    return {status:200,message:"Question Posted Successfully"}
}