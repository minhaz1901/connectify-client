import { Link } from 'react-router-dom';
import i404 from "../../../assets/images/404.jpeg";


const NotFound = () => {

  return (
    <div className="bg-base-200 h-screen flex flex-col justify-center items-center">
      <img
        src={i404}
        alt="404 Page Not Found"
        className="max-w-full h-auto"
      />
      <h3 className="text-2xl md:text-4xl font-semibold mt-4">The page you are looking for does not exist.</h3>
      <Link to="/" className="btn btn-warning mt-4">Find FluentLink</Link>
    </div>
  );
};

export default NotFound;
