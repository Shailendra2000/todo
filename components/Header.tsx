'use client'
import Link from "next/link"

function Header(){
    function removeLocalStorageToken (){
        localStorage.removeItem('todo_token')
        localStorage.removeItem('isAdmin')
    }
    return (
        <header className='sticky top-0 z-30 w-full shadow-md px-5 py-2 flex justify-between'>
        <h1 className='text-center z-10 text-2xl text-gray-500 '>Taskify</h1>
        <Link href="auth/login" className='text-red-500' onClick={removeLocalStorageToken}>Logout</Link>
        </header>
    )
}
export default Header