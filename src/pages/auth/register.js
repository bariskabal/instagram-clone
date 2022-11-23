import {AiFillFacebook} from 'react-icons/ai'
import Input from '../../components/input'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import {register} from '../../firebase.js'
import { Formik, Form } from 'formik'
import { LoginSchema, RegisterSchema } from '../../validation'
import Button from '../../components/Button'
import Separator from '../../components/Separator'

export default function Register() {

    const navigate = useNavigate()
    const location = useLocation()

    const handleSubmit = async (values, action) => {
        const response = await register(values)
        if(response) {
          navigate(location.state?.return_url || '/', {
            replace: true
        })}
    }
  
  
    return (
      <>
        <div className='w-[350px] grid gap-y-3'>
          <div className=' bg-white border p-[40px] pb-6'>
            <a className='flex justify-center mb-4'>
              <img className='h-[51px]' src='https://www.instagram.com/static/images/web/logged_out_wordmark-2x.png/d2529dbef8ed.png' />
            </a>
            <p className='text-[17px] font-semibold text-[#8e8e8e] text-center mb-6'>Sign up to see photos and videos from your friends.</p>
            <Button>
                  <AiFillFacebook size={20} />
                  Log in with Facebook
            </Button>
            <Separator />

            <Formik
              validationSchema={RegisterSchema}
              initialValues={{
                 email: '',
                 full_name: '',
                 username: '',
                 password: ''
              }}
              onSubmit={handleSubmit}
            >
              {({ isSubmiting, isValid, dirty }) => (
                <Form className='grid gap-y-1.5'>
                  <Input label="Mobile Number or Email" name='email' />
                  <Input label="Full Name" name='full_name' />
                  <Input label="Username" name='username' />
                  <Input label="Password" type="password" name='password'/>
                  <p className='text-[12px] text-[#8e8e8e] py-2 w-full text-center font-semibold block'>
                  People who use our service may have uploaded your contact information to Instagram. <a className='font-semibold'>Learn More</a>
                  <br/><br/>
                  By signing up, you agree to our <a className='font-semibold'>Terms</a> , <a className='font-semibold'>Privacy Policy </a>and <a className='font-semibold'>Cookies Policy</a>.
                  </p>
                  <Button type='submit' disabled={!isValid || !dirty || isSubmiting} children='Sign up'/>
                </Form>
              )}
            </Formik>
          </div>
          <div className='bg-white border flex items-center justify-center gap-x-1 p-4 text-sm'>
            Have an account?
            <Link to='/auth/login' className='text-brand font-semibold'>Log in</Link>
          </div>
        </div>
      </>
    );
  }