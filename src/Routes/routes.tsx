import { createBrowserRouter } from "react-router-dom";
import Loginbox from "../Login/Loginbox";
import App from "../App";
import Signup from "../SignUp/SignupPage";
import HomePage from "../Home/HomePage";


export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {path:"", element:<Loginbox/>},
            {path:"/signup", element:<Signup/>},
            {path:"/home", element:<HomePage/>}
            
        ]
    }
])