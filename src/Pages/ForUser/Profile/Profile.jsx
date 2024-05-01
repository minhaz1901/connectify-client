import { useContext, useEffect, useState } from "react";
import PostCart from "../../../Components/PostCart";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
  const profile = JSON.parse(localStorage.getItem('Profile'));
  const {user} = useContext(AuthContext);
  
  const [myPosts, setMyPost] = useState([]);

  useEffect(() => {
    fetch( `http://localhost:5000/post/${user.email}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMyPost(data);
        });
}, [])

  return (
    <>
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <img src={profile?.coverPhoto} alt="Cover Photo" className="w-full h-80 object-cover rounded-lg mb-4" />
        <img src={profile?.profilePhoto} alt="Profile Photo" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md -mt-16 mx-auto" />
      </div>
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold">{profile?.name}</h2>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-1">
            {myPosts?.map(post => (
                <PostCart key={post._id} post={post}/>
            ))}
      </div>
    </>
  );
};

export default Profile;
