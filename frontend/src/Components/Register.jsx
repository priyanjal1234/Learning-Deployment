import React, { useState } from 'react'
import { registerUser } from '../services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    let navigate = useNavigate()
    const [register, setregister] = useState({
        username: '',
        email: '',
        password: ''
    })

    function handleRegisterChange(e) {
        const { name,value } = e.target 
        setregister(prev => ({...prev,[name]:value}))
    }

    async function handleRegisterSubmit(e) {
        e.preventDefault()
        let registerUserRes = await registerUser(register)
        if(registerUserRes.status === 201) {
            toast.success("Registration Successfull")
            localStorage.setItem("token",registerUserRes.data.token)
            navigate("/home")
        }
    }

    return (
        <div className='w-full h-screen bg-zinc-900 text-white p-10'>
            <h1 className='text-3xl font-semibold mb-5'>Create Your Account</h1>
            <form onSubmit={handleRegisterSubmit}>
                <input onChange={handleRegisterChange} value={register.username} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="text" placeholder='Username' name='username' />
                <input onChange={handleRegisterChange} value={register.email} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="email" placeholder='Email' name='email' />
                <input onChange={handleRegisterChange} value={register.password} className='px-3 py-2 bg-zinc-700 outline-none mr-4' type="password" placeholder='Password' name='password' />
                <button className='px-3 py-2 bg-blue-600 rounded-lg' type="submit">Create</button>
            </form>
            <Link to={'/login'} className='block text-blue-600 mt-3 cursor-pointer'>Login</Link>
        </div>
    )
}

export default Register