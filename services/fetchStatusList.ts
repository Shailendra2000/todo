export const fetchStatusList = async ({queryKey}:any) => {
    console.log(queryKey[1])
    
    const res = await fetch(
      `http://localhost:9000/task-status`,{
        headers:{ "authorization":queryKey[1]}
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return res.json();
}