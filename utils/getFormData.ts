import { IFormData } from "@/interfaces/formData.interface";

export const getFormData = (form:HTMLFormElement, feilds:string[]) => {
    const formData = new FormData(form);
    let loginData : IFormData = {};
    console.log(formData)
    feilds.forEach( (feild) => {
      loginData[`${feild}`] = formData.get(`${feild}`)
    })
    return loginData
  }