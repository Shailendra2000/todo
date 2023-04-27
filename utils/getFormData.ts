import { IFormData } from "@/interfaces/formData.interface";

export const getFormData = (form:HTMLFormElement, feilds:String[]) => {
    const formData = new FormData(form);
    let loginData : IFormData = {};
    feilds.map( (feild) => {
      loginData[`${feild}`] = formData.get(`${feild}`)
    })
    return loginData
  }