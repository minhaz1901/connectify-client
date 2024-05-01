
import { useContext, 
    // useEffect, 
    useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

import Swal from "sweetalert2";

const Home = () => {

    const [showPassword, setShowPassword] = useState(false);
    const { user, signIn,
        //  googleSignIn 
        } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState("");



    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
    
        const email = form.email.value;
        const password = form.password.value;
    
        signIn(email, password)
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
    
                fetch(`http://localhost:5000/profile/${loggedUser.email}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('Role', data.role); 
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login successful.",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate(from, { replace: true });
                    setError("");
                })
                .catch((error) => {
                    console.log(error);
                    setError("Invalid email or password");
                });
            })
            .catch((error) => {
                console.log(error);
                setError("Invalid email or password");
            });
    };
    

    // const handleGoogleSignIn = () => {
    //     googleSignIn()
    //         .then((result) => {
    //             const loggedUser = { name: result.user.displayName, email: result.user.email };
    //             fetch("https://fluent-link-server.vercel.app/users", {
    //                 method: "POST",
    //                 headers: {
    //                     "content-type": "application/json",
    //                 },
    //                 body: JSON.stringify(loggedUser),
    //             })
    //                 .then((res) => res.json())
    //                 .then((data) => {
    //                     if (data.insertedId) {
    //                         Swal.fire({
    //                             position: "top-end",
    //                             icon: "success",
    //                             title: "Login successful.",
    //                             showConfirmButton: false,
    //                             timer: 1500,
    //                         });
    //                         navigate(from, { replace: true });
    //                     }
    //                 });

    //             setError("");
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    return (
        <>
        {user? 
        <Navigate state={{from: location}} to="/my-profile" replace></Navigate>
        :
        
        <div  >
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">
                        <span className="text-red-500 font-extrabold">Connect</span>
                        <span className="text-blue-500 font-extrabold">i</span>
                        <span className="text-yellow-400 font-extrabold">fy</span>
                    </h1>
                    <h3 className="py-6">Connect with friends and share your moments!</h3>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <h1 className="text-4xl text-center pt-5 font-bold">User Login</h1>
                <form onSubmit={handleLogin} className="card-body">
                    {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered input-warning" />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="password"
                                className="input input-bordered input-warning"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>


                    <div className="form-control mt-6">
                        <button className="btn btn-warning">
                            Login
                        </button>
                    </div>
                    <div className="mt-5">
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link to="/register" className="link link-hover underline text-red-500">
                                Register
                            </Link>
                      </p>
                        {/* <span>or</span>
                        <br />
                        <div className="flex justify-between mt-3">
                            <button onClick={handleGoogleSignIn} className="btn p-3">
                                Login With Google
                            </button>
                        </div> */}
                    </div>
                </form>
            </div>
                </div>
            </div>
        </div>
}
        </>
    );
};

export default Home;