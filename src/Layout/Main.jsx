import { Outlet } from "react-router-dom";
import Header from "../Pages/Shared/Header/Header";
import Footer from "../Pages/Shared/Footer/Footer";
import Banned from "../Pages/Others/Banned/Banned";
const Main = () => {
    const profile = JSON.parse(localStorage.getItem('Profile'));
    return (
        <div>
            <Header></Header>
            {
                profile?.Ban ?
                <Banned></Banned>
             :
             <Outlet></Outlet>
            }
            
            <Footer></Footer>
        </div>
    );
};

export default Main;