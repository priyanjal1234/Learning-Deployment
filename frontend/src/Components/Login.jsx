import React, { useState } from 'react'
import { loginUser } from '../services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate()
    const [login, setlogin] = useState({
        email: '',
        password: ''
    })

    function handleLoginChange(e) {
        const { name,value } = e.target 
        setlogin(prev => ({...prev,[name]:value}))
    }

    async function handleLoginSubmit(e) {
        e.preventDefault()
        let loginUserRes = await loginUser(login)
        if(loginUserRes.status === 200) {
            toast.success("Login Success")
            localStorage.setItem("token",loginUserRes.data.token)
            navigate("/home")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Login Account</h1>
            <form onSubmit={handleLoginSubmit}>
                <input className='px-3 py-2 bg-zinc-700 outline-none mr-4' onChange={handleLoginChange} value={login.email} type="email" placeholder='Email' name='email'/>
                <input className='px-3 py-2 bg-zinc-700 outline-none mr-4' onChange={handleLoginChange} value={login.password} type="password" placeholder='Password' name='password'/>
                <button className='px-3 py-2 bg-blue-600 rounded-lg' type="submit">Login</button>
            </form>
            <Link className='text-blue-600 cursor-pointer block mt-3' to={'/'}>Sign up</Link>
        </div>
    )
}

export default Login