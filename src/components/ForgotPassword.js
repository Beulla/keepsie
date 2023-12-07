import { useState } from "react"
import axios from "axios"
export default function ForgotPassword(){
    const [email,setEmail]=useState('')
    
    async function handleSubmit(e){
        e.preventDefault()
        await axios.post("http://localhost:8080/api/auth/forgot",{email:email}).then(data=>{window.alert("Check you email to continue")}).catch(err=>{console.log(err)})
    }
    return(
        <div>
            <div className="flex"> 
      <svg class="fill-current w-8 mr-1 ml-7 pt-1 fill-blue-700" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 312.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
      <span class="font-semibold text-xl tracking-tight pt-3 ml-2 text-blue-700">Keepsie</span>
      </div>
      <div>
            <form className="max-w-sm mx-auto mt-5 border border-gray-300 loginForm p-5 rounded shadow-2xl" onSubmit={handleSubmit}>
                <div>
                <h1 className="mb-4 text-4xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-xl dark:text-black">Forgot Password</h1>
                </div>
                
                <div className="mb-4">
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 d dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" required name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex items-start">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </div>
            </form>
      </div>
    </div>
    )
}