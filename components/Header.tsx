'use client'
import Link from "next/link"

function Header(){
    function removeLocalStorageToken (){
        localStorage.removeItem('todo_token')
        localStorage.removeItem('isAdmin')
        console.log("ok")
    }
    return (
        <header className='sticky top-0 z-30 w-full shadow-md px-20 flex justify-between py-2'>
        <h1 className='text-center z-10 text-2xl text-gray-500 '>Taskify</h1>
        <Link href="login" className='text-red-500' onClick={removeLocalStorageToken}>Logout</Link>
        </header>
    )
}
export default Header