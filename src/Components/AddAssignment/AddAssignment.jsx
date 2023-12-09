import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {useContext} from "react";
import {AuthContext} from "../AuthProvider/AuthProvider.jsx";
import {motion} from "framer-motion";

const AddAssignment = () => {

    const {user} = useContext(AuthContext)


    const handleuserAssignment = e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const thumbnail = form.thumbnail.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const email = user?.email;
        const userMarks = form.userMarks.value;
        const date = form.date.value;
        const level = form.level.value;

        const AddAssignment = {title, email, userMarks, thumbnail, description, marks, date, level}

        fetch('http://localhost:3000/assignments', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(AddAssignment)
        })
            .then(res => res.json())
            .then(data => {
                if(data.insertedId){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }
            })
            .catch(error => console.error(error))


        fetch('http://localhost:3000/homeassignments', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(AddAssignment)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
            .catch(error => console.error(error));
    }

    return (
        <div className="hero">
            <div className="hero-content flex-col min-h-screen">
                <motion.div initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 400, damping:10, duration: 0.5}} className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Add Product</h1>
                </motion.div>

                <motion.div initial={{opacity: 0, x: -50}} whileHover={{scale: 1.1, x: 20}} whileTap={{scale: 0.9, x: -20}} animate={{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 400, damping:15, duration: 0.5}} className="justify-start flex w-full">
                    <Link to="/"><button className="px-5 py-3 bg-[#6C5F5B] rounded-xl text-white hover:bg-[#6C5F5B]/60 duration-200 font-semibold">Back</button></Link>
                </motion.div>


                <motion.div initial={{opacity: 0, y: 100}} animate={{opacity: 1, y: 0}} transition={{type: "spring", stiffness: 400, damping:10, duration: 0.5}} className="space-y-6 justify-center grid p-10 lg:shadow-lg rounded-lg bg-white">


                    <form onSubmit={handleuserAssignment} className="space-y-8 w-full">
                        <div className="sm:flex grid gap-5">
                            <div className="grid gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Thumbnail</span>
                                    </label>
                                    <input name="thumbnail" type="url" placeholder="Thumbnail" className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input name="title" type="text" placeholder="Title" className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input name="description" type="text" placeholder="Description" className="input input-bordered w-full" required />
                                </div>


                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Total Marks</span>
                                        </label>
                                        <input name="marks" defaultValue={0} type="number" placeholder="Marks" className="input input-bordered w-full" required />
                                    </div>

                                    <div className="form-control hidden">
                                        <label className="label">
                                            <span className="label-text">Others Review Marks</span>
                                        </label>
                                        <input name="userMarks" defaultValue={0} type="number" placeholder="userMarks" className="input input-bordered w-full" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input name="date" type="date" placeholder="Marks" className="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Level</span>
                                    </label>
                                    <select name="level" className="p-3 rounded-md bg-base-300 w-full" required>
                                        <option value="">Select Category</option>
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>
                            </div>

                        </div>

                        <div>
                            <button type="submit" className="btn btn-block btn-neutral">Add Product</button>
                        </div>
                    </form>
                </motion.div>

            </div>
        </div>
    );
};

export default AddAssignment;