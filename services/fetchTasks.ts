export interface IGetTaskRequestParams{
    token:string,
    userId:number|null|undefined
  }
    export const fetchTasks = async ({queryKey}:any) => {
      let url = `http://localhost:9000/task`
      if(queryKey[1].userId){
        url+=`?userId=${queryKey[1].userId}`
      }
      const res = await fetch(
        url,{
          headers:{ "authorization":queryKey[1].token}
        }
      );
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res.json();
  }