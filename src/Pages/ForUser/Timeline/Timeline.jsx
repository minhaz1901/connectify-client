
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import PostCart from "../../../Components/PostCart";
import { useLoaderData } from "react-router-dom";

const Timeline = () => {
    const { reset,  } = useForm();
    const profile = JSON.parse(localStorage.getItem('Profile'));

    const posts = useLoaderData();

    const handleAddPost = event =>{
        event.preventDefault();
        const form = event.target;

        const name = profile.name;
        const email = profile.email;
        const profilePhoto = profile.profilePhoto;

        const post = form.post.value;
        const photoURL = form.photoURL.value;

        const NewPost = {name, email, profilePhoto, post, photoURL } 
        
        console.log(NewPost);
        fetch('http://localhost:5000/post',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(NewPost)
        })
        .then(res => res.json())
        .then(data => {console.log(data);
            if (data.acknowledged){
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Post added successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                reset();
                window.location.reload();
            
            }
        })
    
    }

    return (
    <>
        {profile?.role == "Admin" ||
            <div className="flex justify-center items-center my-12">
            <div className="p-8 rounded shadow-lg w-[50%]">
                <h1 className="text-3xl text-center font-semibold mb-4">Add A Post</h1>
                <form onSubmit={handleAddPost}>
                <div className="mb-4">
                    <textarea
                    type="text"
                    name="post"
                    placeholder="write what's on your mind?"
                    className="input input-bordered input-warning w-full" 
                    
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                    Photo URL
                    </label>
                    <input
                    type="text"
                    name="photoURL"
                    className="input input-bordered input-warning w-full" 
                    
                    />
                </div>
                
                <div className="mt-4 text-right">
                    <button
                    type="submit"
                    className="py-2 px-4 btn btn-warning"
                    >
                    Post
                    </button>
                </div>
                </form>
            </div>
        </div>}
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-1">
            {posts.map(post => (
                <PostCart key={post._id} post={post}/>
            ))}
        </div>
    </>
    );
};

export default Timeline;