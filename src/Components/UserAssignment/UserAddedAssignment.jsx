import {motion} from "framer-motion";
import DisplayUserAssignment from "./DisplayUserAssignment.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import {useQuery} from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import Swal from "sweetalert2";


const UserAddedAssignment = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();

    const {data: userAssignment = [], refetch} = useQuery({
        queryKey: ['myUsers'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assignments?email=${user.email}`);
            return res.data;
        }
    })


    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to Delete",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        })
            .then(res => {
                if(res.isConfirmed){
                    axiosPublic.delete(`/assignments/${id}`)
                        .then(res => {
                            if(res.data.deletedCount > 0){
                                refetch();
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your file has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
                }
            })
    }

    const handleConfirm = id => {
        axiosPublic.patch(`/assignments/${id}`, {status: 'confirm'})
            .then(() => {
                refetch();
                Swal.fire({
                    title: 'Confirmed!',
                    text: 'Assignment status has been updated to confirm.',
                    icon: 'success',
                })
                    .catch((error) => {
                        console.error('Error confirming assignment:', error);
                    });
            })
    }


  return (
      <div className="justify-center flex">
          <div className="container min-h-screen">
              <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 400, damping:20, duration: 0.5}} className={"justify-center flex py-24"}>
                    <h1 className={"text-4xl font-bold"}>My-Assignment</h1>
              </motion.div>

              <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 400, damping:20, duration: 0.5}}>
                  <div className="overflow-x-auto bg-white rounded-xl">
                      <table className="table">
                          {/* head */}
                          <thead>
                          <tr>
                              <th>
                                  Delete
                              </th>
                              <th>Name</th>
                              <th>Level</th>
                              <th>Marks</th>
                              <th>Update</th>
                              <th>Confirm</th>
                              <th></th>
                          </tr>
                          </thead>
                          <tbody>
                            {
                                userAssignment.length === 0 ?

                                <div className="flex justify-center">
                                    <p className="text-xl font-bold p-10">There is no Assignments Added</p>
                                </div> :
                                userAssignment.map(A => <DisplayUserAssignment key={A?._id} data={A} handleConfirm={handleConfirm} handleDelete={() => handleDelete(A._id)} />)
                            }

                          </tbody>
                      </table>
                  </div>
              </motion.div>
          </div>
      </div>
  )
}

export default UserAddedAssignment