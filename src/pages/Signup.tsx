import React from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '../store'
import { CredentialFormData } from '../types/index.type'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const schema = z.object({
    email: z.string()
          .email({ message: 'Please enter a valid email' }),
    password: z
          .string()
          .min(1, { message: 'Please enter a valid password' })
          .max(50),
    confirmedPassword: z
                .string()
                .min(1, { message: 'Please enter a valid password' })
                .max(50)
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Password doesn't match",
    path: ["confirmedPassword"]
  })

const Signup = () => {
    const { registerUser } = useUserStore()
    const {register, handleSubmit, formState: {errors, isLoading}} = useForm<CredentialFormData>({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()

    const onSubmit = async(data:CredentialFormData) => {
       const res = await registerUser(data)
       if(res?.ok) {
        navigate('/login')
       }
    }
  return (
    <div className='bg-[url("./assets/bg-image.jpg")] bg-cover h-screen -mt-[68px] flex justify-center items-center'>
        <div className=' w-1/4 min-h-[300px] bg-white text-gray-800 py-4 px-8 rounded-md shadow-xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center text-3xl font-bold mb-4'>Sign Up</h2>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input 
                            className='block w-full px-3 py-1 rounded-md bg-blue-50'
                            id='email'
                            type="email" 
                            placeholder='example@mail.com' 
                            {...register('email', {required: true})}
                        />
                    {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input 
                            className='block w-full px-3 py-1 rounded-md bg-blue-50'
                            id='password'
                            type="password" 
                            {...register('password', {required: true})} 
                            />
                            {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="confirmedPassword">Password(confirm)</label>
                        <input 
                            id='confirmedPassword'
                            className='block w-full px-3 py-1 rounded-md bg-blue-50'
                            type="password" 
                            {...register('confirmedPassword', {required: true})} 
                            />
                            {errors.confirmedPassword && <p className='text-red-500'>{errors.confirmedPassword.message}</p>}
                    </div>
                <button className='bg-green-500 hover:bg-green-800 duration-300 text-white w-full py-1 px-3 rounded-full mt-5 mb-2'>Sign up</button>
                <Link className='text-xs text-blue-800 underline' to={'/login'} >Already have an account? Login</Link>
            </form>
        </div>
    </div>
  )
}

export default Signup