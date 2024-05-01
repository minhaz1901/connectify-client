import { useContext, 
    // useEffect, 
    useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

import Swal from "sweetalert2";

const Login = () => {


    const [showPassword, setShowPassword] = useState(false);
    const { signIn,
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
                     localStorage.setItem('Profile', JSON.stringify(data)); 
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
        <div className=" hero bg-base-200 py-24">
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
    );
};

export default Login;
