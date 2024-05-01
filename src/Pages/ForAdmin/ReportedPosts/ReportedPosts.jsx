import PostCart from "../../../Components/PostCart";
import { useLoaderData } from "react-router-dom";

const ReportedPosts = () => {

    const posts = useLoaderData();

    const reportedPosts = posts.filter(post => post.report && post.report.length > 0);
    
    return (
        <>
            <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-1">
                {reportedPosts.map(post => (
                    <PostCart key={post._id} post={post}/>
                ))}
            </div>
        </>
    );
};

export default ReportedPosts;