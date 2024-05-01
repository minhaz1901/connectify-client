import { useLoaderData } from "react-router-dom";
import PostCart from "../../../Components/PostCart";

const OthersProfile = () => {
    const {profile, posts }= useLoaderData();
    console.log(profile);
    console.log(posts);
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
            {posts?.map(post => (
                <PostCart key={post._id} post={post}/>
            ))}
      </div>
    </>
    );
};

export default OthersProfile;
