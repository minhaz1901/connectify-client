import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
    const users = useLoaderData();

    const handleBanAccount = (userID) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
            }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/profile/ban/${userID}`,{
                    method: 'PUT'
                })
                    .then((res) => res.json())
                    .then((data) => {
                        console.log(data);
                    if (data.acknowledged) {
                        window.location.reload();
                        Swal.fire(
                            'Removed!',
                            'User has been banned.',
                            'success'
                        )
                    }
                });  
            }
            })
        }

    return (
        <div className="np my-12">
            <h3 className="text-3xl font-semibold my-4">Total Users: {users?.length}</h3>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Account</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users?.map((user, index) => (
                                <tr key={user._id}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.profilePhoto} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                            <div>
                                            <a href={`profile/${user?.email}`} className="hover:underline"><span className="font-bold">{user.name}</span></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                        { user.Ban?
                                        <button className="btn btn-error">Banned</button>
                                        :
                                        <button onClick={() => handleBanAccount(user._id)} className="btn btn-error btn-outline">Ban</button>
                                        }
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
