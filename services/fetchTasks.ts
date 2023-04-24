export interface IGetTaskRequestParams{
    token:string,
    userId:number|null|undefined,
    statusId:number,
    page:number,
    limit:number
  }
    export const fetchTasks = async (queryKey:IGetTaskRequestParams) => {
      let url = `http://localhost:9000/task?statusId=${queryKey.statusId}&page=${queryKey.page}&limit=${queryKey.limit}`
      if(queryKey.userId){
        url+=`&userId=${queryKey.userId}`
      }
      const res = await fetch(
        url,{
          headers:{ "authorization":queryKey.token}
        }
      );
      if (!res.ok) {
        throw new Error(`${res.status}`);
      }
      return res.json();
  }