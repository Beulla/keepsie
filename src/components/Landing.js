import {Link} from "react-router-dom"
export default function Landing(){
    return(
        <div>
            <nav class="flex items-center justify-between flex-wrap bg-blue-700 p-6">
            <div class="flex items-center flex-shrink-0 text-white mr-6">
                <svg class="fill-current h-8 w-8 mr-2" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 312.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"/></svg>
                <span class="font-semibold text-xl tracking-tight">Keepsie</span>
            </div>
            <div>
                <Link to="/login" className="font-semibold text-xl tracking-tight mr-10 text-white">Login</Link>
            </div>
            </nav>

            <div class="flex items-center justify-center mt-5">
            <div class="w-3/12 ml-6 block rounded-lg bg-white p-5 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                <h5 class="mb-2 text-xl font-medium leading-tight text-blue-700">Keepsie</h5>
                <p class="mb-4 text-base text-black">
                Unleash your creativity and boost productivity with our intuitive Keepsie! Capture your thoughts on the go, jot down ideas, and stay organized effortlessly. Our user-friendly interface ensures a seamless note-taking experience, allowing you to focus on what matters most.
                </p>
            </div>
            </div>

        </div>
    )
}