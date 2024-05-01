
const CommentCart = ({comment}) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center mb-4">
          <img src={comment?.profilePhoto} alt="Profile" className="w-10 h-10 rounded-full mr-2" />
          <span className="font-semibold">{comment?.name}</span>
        </div>
        <p className="mb-4">{comment?.comment}</p>
        </div>
    );
};

export default CommentCart;