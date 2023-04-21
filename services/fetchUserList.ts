export const fetchUserList = async ({queryKey}:any) => {
    console.log(queryKey[1])
    
    const res = await fetch(
      `http://localhost:9000/users`,{
        headers:{ "authorization":queryKey[1]}
      }
    );
    if (!res.ok) {
      throw new Error(`${res.status}`);
    }
    return res.json();
}