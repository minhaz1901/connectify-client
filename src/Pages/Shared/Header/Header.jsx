import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

const Header = () => {

    const {user, logOut} = useContext(AuthContext)
    const profile = JSON.parse(localStorage.getItem('Profile'));
    console.log(profile);

    const handleLogout = async () => {
        try {
          await logOut();
          localStorage.removeItem('Profile');
        } catch (error) {
          console.error(error);
        }
      };
    
    return (
        <>
        {!user ? 
            <h1 className="text-3xl font-semibold text-center my-8">Welcome to &nbsp;
                <span className="text-red-500 font-extrabold">Connect</span>
                <span className="text-blue-500 font-extrabold">i</span>
                <span className="text-yellow-400 font-extrabold">fy</span>
            </h1>
            :
        <div className={ "navbar"} >
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                     </label>
                
                
                {profile?.role ?
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                    <li><Link to="/timeline">Posts</Link></li>
                    <li><Link to="/reported-posts">Reported Posts</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            :
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/timeline">Timeline</Link></li>
                <li><Link to="/my-profile">Profile</Link></li>
                <li><Link to="/">Friends</Link></li>
            </ul>}

                </div>
                <Link to="/" className="normal-case text-xl">
                    <span className="text-red-500 font-extrabold">Connect</span>
                    <span className="text-blue-500 font-extrabold">i</span>
                    <span className="text-yellow-400 font-extrabold">fy</span>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
            {profile?.role ?
                <ul className="menu menu-horizontal px-1">
                    <li><Link to="/timeline">Posts</Link></li>
                    <li><Link to="/reported-posts">Reported Posts</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            :
            <ul className="menu menu-horizontal px-1">
                <li><Link to="/timeline">Timeline</Link></li>
                <li><Link to="/my-profile">Profile</Link></li>
                <li><Link to="/">Friends</Link></li>
            </ul>
            }
            </div>
            <div className="navbar-end">
            
            { (user) && 
                <div className="tooltip tooltip-top" data-tip={user?.displayName}>
                    <img
                        style={{ width: '25px', height: '25px', borderRadius: '50%' }}
                        className="img-fluid d-block group-hover:opacity-80 transition-opacity me-3"
                        src={profile?.profilePhoto}
                        alt={user?.photoURL}
                        />
                </div>
            }

                {user ? (
                <button onClick={handleLogout} className="btn btn-outline btn-warning">Logout</button>
                ) : ( 
                <Link to="/login" className="btn btn-outline btn-warning px-md-2">
                    Login
                </Link>
 )}

            </div>
        </div> 
}
</>
);
};

export default Header;