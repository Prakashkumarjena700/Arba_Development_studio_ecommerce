import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { login, sendingMailForResetPassword } from '../redux/Auth/authActions';
import { Link, useNavigate } from 'react-router-dom';
import { HiEyeOff, HiEye } from "react-icons/hi";
import loginBg from '../assets/signup_login_bg.png'
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const [userName, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showForgetPass, setShowForgetPass] = useState(false)
  const [email, setEmail] = useState('')

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(state => state.auth.loading);
  const msg = useSelector(state => state.auth.msg);
  const error = useSelector(state => state.auth.error);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const mailSent = useSelector(state => state.auth.mailSent);
  const mailSending = useSelector(state => state.auth.mailSending);

  console.log(isLoading, isAuthenticated);

  const Login = () => {
    dispatch(login(userName, password))
  }

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (!mailSending && mailSent) {
      alert('Mail has been sent, Please check your email address')
    }
    if (!isLoading && isAuthenticated && token) {
      alert('Login successfull')
      navigate('/')
    }
    if (error) {
      alert(error)
    }
  }, [mailSending, isLoading])

  const sendMail = () => {
    if (email == '') {
      alert('Please fill your email address')
    } else {
      dispatch(sendingMailForResetPassword({ email }))
    }
  }

  return (
    <div className='grid gap-8 grid-cols-2' >
      <div>
        <img src={loginBg} alt="" className='w-full h-[99.9vh]' />
      </div>
      <div className='flex justify-center items-center' >
        <div className='w-[60%]' >
          <div className=' flex justify-center items-center flex-col ' >
            <div className='border h-16 w-16 bg-[#00AAC3] rounded-full' ></div>
            <h2 className='font-bold text-lg' >ShopeZ</h2>
            <p>Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.</p>
          </div>
          <div>
            <input
              className='outline-none border-b-2 w-full border-[#00AAC3] mt-6'
              type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className='flex my-2 mt-6 border-b-2 border-[#00AAC3] ' >
            <input
              className='outline-none w-[91%]'
              type={showPassword ? 'text' : 'password'} placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <button
              className='text-[#00AAC3]'
              onClick={() => setShowPassword(!showPassword)} >{showPassword ? <HiEye /> : <HiEyeOff />}</button>
          </div>

          <button
            className='bg-[#00AAC3] text-white w-full rounded-lg py-1 mt-6 flex justify-center items-center h-10'
            onClick={Login} >
            {isLoading ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Login</span>}
          </button>
          <p className='mt-4' >Don't have an account? <Link to="/signup" className='text-[#00AAC3] font-semibold' >Sign up</Link></p>
          <p className='font-semibold text-[#00AAC3] mt-2 cursor-pointer' onClick={() => setShowForgetPass(!showForgetPass)} >Forget Password</p>
          {
            showForgetPass &&
            <div
              className='flex gap-2 mt-4'
            >
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className='outline-none border-b-2 w-full border-[#00AAC3] '
                placeholder='Enter email' />
              <button
                className='text-white px-3 py-1 rounded bg-[#00AAC3] flex justify-center items-center h-10' onClick={sendMail} >
                {mailSending ? <span className='animate-spin' ><ImSpinner2 /></span> : <span>Send</span>}
              </button>
            </div>
          }
        </div>
      </div>
    </div>
  )
}
