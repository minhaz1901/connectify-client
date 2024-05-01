import { useContext } from 'react';
import { Link, 
    // useLocation, 
    useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Register = () => {
   

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    
    const {createUser, updateUser} = useContext(AuthContext);
    const navigate = useNavigate();
    // const location = useLocation();
    // const from = location.state?.from?.pathname || '/';
    
    

    const handleRegister = data =>{

        createUser(data.email, data.password)
            .then(() =>{
                
                updateUser(data.name, data.photo)
                    .then( () => {
                        const saveUser = { name: data.name, email: data.email, profilePhoto: data.profilePhoto, coverPhoto: data.coverPhoto }
                        fetch('http://localhost:5000/profile', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                        .then(res => res.json())
                        .then(data => {
                            if (data.insertedId) {
                                localStorage.setItem('Profile', JSON.stringify(saveUser));
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'User created successfully.',
                                    showConfirmButton: false,
                                    timer: 1500
                                });
                                navigate('/');
                            }
                        })
                    }).catch((error) => {
                    console.log(error);
                    });

               
            })
            .catch(error =>{
                console.log(error);
            })
            
    }

    return (
        <div className=" hero bg-base-200 py-24">
            <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                <h1 className="text-4xl text-center pt-5 font-bold">Register now</h1>                
                <form onSubmit={handleSubmit(handleRegister)} className="card-body">
                
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"  {...register("name", { required: true })} name="name" placeholder="name" className="input input-bordered input-warning" />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Profile Photo</span>
                        </label>
                        <input type="text" {...register("profilePhoto", { required: true })} name="profilePhoto" placeholder="Photo URL" className="input input-bordered input-warning" />
                        {errors.photo && <span className="text-red-600">Photo URL is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Cover Photo</span>
                        </label>
                        <input type="text" {...register("coverPhoto", { required: true })} name="coverPhoto" placeholder="Photo URL" className="input input-bordered input-warning" />
                        {errors.photo && <span className="text-red-600">Photo URL is required</span>}
                    </div>

                    <div  className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered input-warning"/>
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>

                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" {...register("password"
                        // , {
                        //         required: true,
                        //         minLength: 6,
                        //         maxLength: 20,
                        //         pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                        //     }
                    )}
                            name="password" placeholder="password" className="input input-bordered input-warning" />
                             {/* {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>} */}

                    </div>

                    <div className="form-control mt-6">
                    <button className="btn btn-warning">Register</button>
                    </div>
                    <div className="mt-5">
                        <p>Already have an account? <Link to="/login" className="link link-hover underline text-red-500">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;