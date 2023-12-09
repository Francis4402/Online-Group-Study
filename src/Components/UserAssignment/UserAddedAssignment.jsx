import {motion} from "framer-motion";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthProvider/AuthProvider.jsx";
import DisplayUserAssignment from "./DisplayUserAssignment.jsx";
import Swal from "sweetalert2";
import userAxiosSecure from '../../Components/Hooks/AxiosSecure.jsx'

const UserAddedAssignment = () => {

    const {loading} = useContext(AuthContext)

    const {user} = useContext(AuthContext);
    const [userAssignment, setuserAssignment] = useState([])
    const [homeassignments, setHomeassignments] = useState([]);
    const [count, setCount] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerpage, setItemPerpage] = useState(10);
    const axiosSecure = userAxiosSecure();

    const NumberOfPages = Math.ceil(count.count / itemsPerpage);

    const url = `/assignments?email=${user?.email}&page=${currentPage}&size=${itemsPerpage}`;

    const pages = []
    for(let i = 0; i < NumberOfPages; i++){
        pages.push(i)
    }

    console.log(pages)


    useEffect(() => {
        fetch('https://online-group-study-serverside-francisms-projects.vercel.app/assignmentscount')
        .then(res => res.json())
        .then(count => setCount(count))
        .catch(error => console.log(error))
    }, [])
    


    useEffect(() => {
        axiosSecure.get(url)
            .then(res => setuserAssignment(res.data))
    },[axiosSecure, url])

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
                if (res.isConfirmed) {
                    fetch(`https://online-group-study-serverside-francisms-projects.vercel.app/assignments/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
    
                                const remaining = userAssignment.filter(A => A._id !== id)
                                setuserAssignment(remaining);
                            }
                    })


                    Swal.fire("Confirm!", "assignment has been Deleted.", "success");
                }
            })
    }


    const handleBookingConfirm = (id) => {
        fetch(`https://online-group-study-serverside-francisms-projects.vercel.app/assignments/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({status: 'confirm'})
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    const remaining = userAssignment.filter(A => A._id !== id);
                    const updated = userAssignment.find(A => A._id === id);
                    if (updated) {
                        updated.status = 'confirm';
                        const newBookings = [updated, ...remaining];
                        setuserAssignment(newBookings);
                    }
                }
            })
    }

    const handlepage = e => {
        const value = parseInt(e.target.value);
        setItemPerpage(value);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if(currentPage > 0) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextPage = () => {
        if(currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
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
                                </div> : loading ? <div className="flex justify-center items-center">
                                    <progress className="progress w-56"></progress>
                                </div>  :
                                
                                userAssignment.map(A => (<DisplayUserAssignment key={A?._id} Data={A} homeassignments={homeassignments} handleBookingConfirm={handleBookingConfirm} handleDelete={() => handleDelete(A._id)}  />))
                            }
                                                                  
                          </tbody>
                      </table>

                      <div className='grid justify-center gap-4 py-20'>
                                    <p className='flex justify-center font-semibold'>Current Page: {currentPage}</p>
                                    <div className='flex justify-center gap-4 '>
                                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                               onClick={handlePrevPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                >
                                                    Prev
                                            </motion.button>
                                            {
                                                pages.map(page => <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                                className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                key={page} onClick={() => setCurrentPage(page)}>
                                                    
                                                    {page}
                                                
                                                </motion.button>)
                                            }
                                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                                onClick={handleNextPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                >
                                                    Next
                                            </motion.button>
                                            <select className="bg-[#6C5F5B] rounded-lg text-white font-semibold hover:bg-[#4F4A45]" value={itemsPerpage} onChange={handlepage} name="" id=''>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                            </select>
                                    </div>
                                        
                                </div>
                  </div>
              </motion.div>
          </div>
      </div>
  )
}

export default UserAddedAssignment