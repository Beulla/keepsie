import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import { useNavigate } from "react-router-dom"
export default function LoginComponent() {
  const [passwordType, setPasswordType] = useState("password");
  const [showPassword, setShowPassword] = useState(false);
  const [formData,setFormData]=useState({
    email:'',
    password:''
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit=async(e)=>{
    e.preventDefault()
    await axios.post("http://localhost:8080/api/auth/login",formData).then((data)=>{
      console.log(data.status)
      if(data.status==200){
        let token=data.data.token
        localStorage.setItem('token',token)
        localStorage.setItem('userId',data.data.id)
        navigate("/notes");
      }
      else{
        window.alert("Wrong email or password")
      }
      
      
    }).catch(err=>{window.alert(err)})
  }
  const togglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    setPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  return (
    <div>
      <div className="flex"> 
      <svg class="fill-current w-8 mr-1 ml-7 pt-1 fill-blue-700" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 312.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      <span class="font-semibold text-xl tracking-tight pt-3 ml-2 text-blue-700">Keepsie</span>
      </div>
      <div>
            <form className="max-w-sm mx-auto mt-5 border border-gray-300 loginForm p-5 rounded shadow-2xl" onSubmit={handleSubmit}>
                <div>
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-black">Login</h1>
                </div>
                
                <div className="mb-4">
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required name="email" value={formData.email} onChange={handleChange}/>
                </div>
                <div className="mb-4 relative">
                    <input type={passwordType} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-2.5 pl-10 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required name="password" value={formData.password} onChange={handleChange}/>
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer`}
        onClick={togglePassword}></i>
                </div>
                
                <div className="flex items-start mb-4">
                    <div class="flex items-center h-5">
                    <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"/>
                    </div>
                    <label for="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                    <Link to="/forgot" className="text-blue-500 hover:text-blue-700 m-3 mt-0 pl-4">Forgot password</Link>
                </div>
                <div className="flex items-start">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                  <Link to="/createAccount" className="text-blue-500 hover:text-blue-700 m-3 mt-5">Create Account</Link>
                </div>
            </form>
      </div>
    </div>
  );
}
