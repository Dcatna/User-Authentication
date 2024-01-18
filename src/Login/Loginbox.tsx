
import React, { useState } from 'react'
import "./Loginbox.css"
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {supabase} from '../lib/supabaseClient'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
interface IFormInput {
    email: string;
    password: string;
  }

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(3).max(15).required()
})

const Loginbox = () => {
    const [isJiggling, setIsJiggling] = useState(false);
    const handleButtonClick = () => {
        setIsJiggling(true);
        setTimeout(() => setIsJiggling(false), 500); // 500ms is the duration of the animation
      };
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const{register,handleSubmit,formState: { errors }} =useForm<IFormInput>({
        resolver:yupResolver(schema),
      });

async function submitForm (formData : IFormInput) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        
        if (error) {
          throw error;
        }
    
        if (data) {
          // Use the 'data.user' object as needed
        }
        navigate("/home")
      } catch (error) {
        if (error instanceof Error) {  // Type guard
            alert(error.message);
          } else {
            // Handle cases where error is not an instance of Error
            console.error("An unknown error occurred", error);
          }
      }
        }

  return (
    <div className='main'>
    <div className='main-container'>
        <div className='content-container'>
            <h1>Sign In!</h1>
            <p>Please enter you user and password</p>
            <form onSubmit={handleSubmit(submitForm)} className='inputs'>
                <input type="text" placeholder='Email' style={{
                    width:'70%',
                    height:'30px',
                }} {...register('email')}/>
                <p>{errors.email?.message}</p>
                <input type="text" placeholder='Password' style={{
                    width:'70%',
                    height:'30px',
                    marginTop:'6px'
                }} {...register('password')}/>
                <p>{errors.password?.message}</p>
                <button onClick = {errors.password || errors.email? handleButtonClick : () => {}} 
                className={isJiggling ? 'jiggle-animation' : ''} type = "submit" 
                    style={{
                        width:'70%',
                        height:'40px',
                        backgroundColor:'#8b5cf6',
                        border:'none',
                        borderRadius:'4px',
                }}>Login..</button>
            </form>
            <p>By logging in you agree to terms and conditions;)</p>
            
            <div className='create-account' style={{
                marginTop:'20px',
            }}>
                <p>Dont have an account yet??</p>
                <Link to="/signup">Create Account</Link>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Loginbox

