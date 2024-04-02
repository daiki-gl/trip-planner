import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUserStore } from '../store'
import { CredentialFormData } from '../types/index.type'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom'

const schema = z.object({
    email: z.string()
          .email({ message: 'Please enter a valid email' }),
    password: z
          .string()
          .min(1, { message: 'Please enter a valid password' })
          .max(50)
    })

const Login = () => {
    const { loginUser } = useUserStore()
    const {register, handleSubmit, formState: {errors, isLoading}} = useForm<CredentialFormData>({
        resolver: zodResolver(schema)
    })
    const navigate = useNavigate()
    
    const onSubmit = async (data:CredentialFormData) => {
        const res = await loginUser(data)
        const { data: token, error } = await res?.json()
        if(res?.ok && token) {
            window.localStorage.setItem("token",token)
            navigate('/')
        } else {
            const notify = (error:string) => toast.error(error);
            notify(error)
        }
    }

    return (
        <div className='bg-[url("./assets/bg-image.jpg")] bg-cover h-screen -mt-[68px] flex justify-center items-center'>
            <ToastContainer/>
            <div className=' w-1/4 min-h-[300px] bg-white text-gray-800 py-4 px-8 rounded-md shadow-xl'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h2 className='text-center text-3xl font-bold mb-4'>Login</h2>
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
                <button className='bg-green-500 hover:bg-green-800 duration-300 text-white w-full py-1 px-3 rounded-full mt-5 mb-2'>Login</button>
                <Link className='text-xs text-blue-800 underline' to={'/register'} >Don't have an account? Sign up</Link>
            </form>
            </div>
    </div>
    )
}

export default Login