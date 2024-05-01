import { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import CommentCart from './CommentCart';

const PostCart = ({ post }) => {
    const { reset  } = useForm();
    const profile = JSON.parse(localStorage.getItem('Profile'));

    const [isCommentOpen, setIsCommentOpen] = useState(false);
    const [isReportOpen, setIsReportOpen] = useState(false);
    const [liked, setLiked] = useState(false);
    const [reported, setReported] = useState(false);
    
    const toggleComment = () => {
        setIsCommentOpen(!isCommentOpen);
        if (isReportOpen){
            setIsReportOpen(!isReportOpen);
        }
    };

    const toggleReport = () => {
        setIsReportOpen(!isReportOpen);
        if (isCommentOpen){
            setIsCommentOpen(!isCommentOpen);
        }
    };

    useEffect(() => {
        if (post?.Liker && post?.Liker.some(l => l === profile.email)) {
            setLiked(true);
        }
    }, []);

    useEffect(() => {
        if (post?.report && post?.report.some(r => r.email === profile.email)) {
            setReported(true);
        }
    }, []);

  const handleAddComment = event =>{
    event.preventDefault();
    const form = event.target;

    const name = profile.name;
    const email = profile.email;
    const profilePhoto = profile.profilePhoto;

    const comment = form.comment.value;

    const NewComment = {name, email, profilePhoto, comment } 
    
    console.log(NewComment);
    fetch(`http://localhost:5000/post/comment/${post._id}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(NewComment)
    })
    .then(res => res.json())
    .then(data => {console.log(data);
        if (data.message){
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

  const handleAddReport = event =>{
    event.preventDefault();
    const form = event.target;

    const name = profile.name;
    const email = profile.email;
    const profilePhoto = profile.profilePhoto;

    const reason = form.reason.value;

    const NewReport = {name, email, profilePhoto, reason } 
    
    fetch(`http://localhost:5000/post/report/${post._id}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(NewReport)
    })
    .then(res => res.json())
    .then(data => {console.log(data);
        if (data.message){
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

  const handleAddLike = () =>{

    fetch(`http://localhost:5000/post/like/${post._id}`,{
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: profile.email })
    })
    .then(res => res.json())
    .then(data => {console.log(data);
        if (data.message){
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Like added successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            reset();
            window.location.reload();
        
        }
    })
}

const handleDelete = () => {
    Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
        }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:5000/post/${post._id}`,{
                method: 'DELETE'
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                if (data.acknowledged) {
                    window.location.reload();
                    Swal.fire(
                        'Removed!',
                        'Post has been removed.',
                        'success'
                    )
                }
            });  
        }
        })
    }


  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center mb-4">
          <img src={post?.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
          <a href={`profile/${post?.email}`} className="hover:underline"><span className="font-semibold">{post?.name}</span></a>
        </div>
        <p className="mb-4">{post?.post}</p>
        {post?.photoURL && <img src={post?.photoURL} alt="Post Image" className="mb-4 rounded-lg" />}
        
        {
            profile?.role?
            <div className="flex justify-between">
            <button>total like: {post?.Liker?.length ?? 0}</button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={toggleComment}>
            Comments
          </button>
          { post.report && post.report.length>0 && <button className="btn btn-error" onClick={toggleReport}>Reports</button>}
          { 
            <button onClick={() => handleDelete()} className="btn btn-error">Delete</button>
        }
        </div>
        
        :
        <div className="flex justify-between">
        {
            liked ? 
            <div>
                <button className="btn btn-success">Liked</button>
                <span>{post?.Liker?.length ?? 0}</span>
            </div>
            :
            <div>
                <button onClick={() => handleAddLike()} className="btn btn-outline btn-success">Like</button>
                <span>{post?.Liker?.length ?? 0}</span>
            </div>
            
        }
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={toggleComment}>
            Comments
          </button>
          {
            reported ? 
            <button className="btn btn-error">Reported</button>
            :
            <button onClick={()=>document.getElementById('my_modal_2').showModal()}  className="btn btn-outline btn-error">Report</button>
        }
        </div>}

        {isCommentOpen && (
        <div className="mt-8 p-4">
        { profile.role == "Admin" ||
          <form onSubmit={handleAddComment} className='flex flex-col lg:flex-row items-center w-[100%]'>
                <div className="mb-4 w-[85%]">
                    <textarea
                    type="text"
                    name="comment"
                    placeholder="write comment"
                    className="input input-bordered input-warning w-full" 
                    
                    />
                </div>
        
                <button
                    type="submit"
                    className=" me-4 btn btn-warning"
                    >
                    Comment
                 </button>
                
            </form>
        }
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-1"> 
            <p className=''>Comments ...</p>
            {post?.comment?.map(comment => (
                <CommentCart key={1} comment={comment}/>
            ))}
        </div>
        </div>
      )}

      { isReportOpen &&
        <div className="grid grid-cols-1 gap-8 mx-auto md:grid-cols-1"> 
            <p className=''>Reports ...</p>
            {post?.comment?.map(comment => (
                <CommentCart key={1} comment={comment}/>
            ))}
        </div>}
      </div>

      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">
        <form onSubmit={handleAddReport} className='p-3'>
                <div className="mb-4 w-[85%]">
                    <textarea
                    type="text"
                    name="reason"
                    placeholder="write a reason"
                    className="input input-bordered input-error w-full" 
                    
                    />
                </div>
        
                <div className='text-right'>
                    <button
                        type="submit"
                        className=" me-4 btn btn-error"
                        >
                        Report
                    </button>
                </div>
                
            </form>
        </div>
        <form method="dialog" className="modal-backdrop">
            {/* <button type="submit" className=" me-4 btn btn-warning" > Report </button> */}
        </form>
      </dialog>
    </>
  );
};

export default PostCart;
