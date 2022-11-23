import {useEffect, useRef, useState} from 'react'
import {AiFillFacebook} from 'react-icons/ai'
import Input from '../../components/input'
import {Navigate,useLocation, Link } from 'react-router-dom'
import {login} from '../../firebase.js'
import { Formik, Form } from 'formik'
import { LoginSchema } from '../../validation'
import Button from '../../components/Button'
import Separator from '../../components/Separator'
import { useSelector } from 'react-redux'

export default function Login() {
    const ref = useRef()
    const user = useSelector(state => state.auth.user)
    const location = useLocation()
  
    useEffect(() => {
      let images = ref.current.querySelectorAll('img'),
        total = images.length,
        current = 0
   
      const imageSlider = () => {
        images[(current > 0 ? current : total) - 1].classList.add('opacity-0')
        images[current].classList.remove('opacity-0')
        current = current === total - 1 ? 0 : current + 1
      }
      imageSlider()
      let interval = setInterval(imageSlider, 3000)
      return () => {
        clearInterval(interval)
      }
    }, [ref])

    const images = [
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot1-2x.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot2-2x.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot3-2x.png?__d=www',
      'https://www.instagram.com/images/instagram/xig/homepage/screenshots/screenshot4-2x.png?__d=www'
    ]

    const handleSubmit = async (values, action) => {
        const response = await login(values.username, values.password)
    }
    if(user) {
      return <Navigate  to={location.state?.return_url || '/'} replace={true} />
    }
  
  
    return (
      <>
        <div className="hidden md:block w-[380px] h-[580px] bg-logo-pattern relative bg-[length:468.32px_634.15px] bg-[top_left_-46px]">
          <div className="w-[250px] h-[538px] absolute top-[27px] right-[18px]" ref={ref}>
            {images.map((image, key) => (
              <img key={key} className="w-full h-full absolute top-0 left-0 opacity-0 transition-opacity duration-500 ease-linear" src={image} />
            ))}
            
          </div>
        </div>
        <div className='w-[350px] grid gap-y-3'>
          <div className=' bg-white border p-[40px] pb-6'>
            <a className='flex justify-center mb-8'>
              <img className='h-[51px]' src='https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png' />
            </a>

            <Formik
              validationSchema={LoginSchema}
              initialValues={{
                 username: '',
                 password: ''
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmiting, isValid, dirty }) => (
                <Form className='grid gap-y-1.5'>
                  <Input label="Phone number, username or email" name='username' />
                  <Input label="Password" type="password" name='password'/>
                  <Button type='submit' disabled={!isValid || !dirty || isSubmiting} children='Log In'/>
                  <Separator />
                  <a href='#' className='flex items-center justify-center mb-2.5 gap-x-2 text-sm font-semibold text-facebook'>
                    <AiFillFacebook size={20} />
                    Log in with Facebook
                  </a>
                  <a href='#' className='flex items-center justify-center text-xs text-link'>
                    Forgot Password?
                  </a>
                </Form>
              )}
            </Formik>
          </div>
          <div className='bg-white border flex items-center justify-center gap-x-1 p-4 text-sm'>
            Don't have an account?
            <Link to='/auth/register' className='text-brand font-semibold'>Sing up</Link>
          </div>
        </div>
      </>
    );
  }