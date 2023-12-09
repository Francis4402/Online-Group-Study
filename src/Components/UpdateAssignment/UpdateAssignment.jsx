import {Link, useLoaderData} from "react-router-dom";
import Swal from "sweetalert2";
import {useContext} from "react";
import {AuthContext} from "../AuthProvider/AuthProvider.jsx";
import {motion} from "framer-motion";

const UpdateAssignment = () => {

    const {user} = useContext(AuthContext)

    const AssignmentData = useLoaderData();
    const {_id, title, thumbnail, description, marks, date} = AssignmentData;
    const handleUpdateAssignment = e => {
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

        const newupdateAssignment = {title, email, userMarks, thumbnail, description, marks, date, level}
        const baseUrl = `online-group-study-serverside-francisms-projects.vercel.app/assignments`;
        const url = `${baseUrl}${_id ? '/' + _id : ''}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(newupdateAssignment)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'ok'
                    })
                }
            })
            .catch(error => console.error(error))
    }

    return (
        <div className="hero">
            <div className="hero-content flex-col min-h-screen">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold">Update Assignment</h1>
                </div>

                <motion.div initial={{opacity: 0, x: -50}} whileHover={{scale: 1.1, x: 20}} whileTap={{scale: 0.9, x: -20}} animate={{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 400, damping:15, duration: 0.5}} className="justify-start flex w-full">
                    <Link to="/"><button className="px-5 py-3 bg-[#6C5F5B] rounded-xl text-white hover:bg-[#6C5F5B]/60 duration-200 font-semibold">Back</button></Link>
                </motion.div>


                <div className="space-y-6 justify-center grid p-10 lg:shadow-lg rounded-lg bg-white">


                    <form onSubmit={handleUpdateAssignment} className="space-y-8 w-full">
                        <div className="sm:flex grid gap-5">
                            <div className="grid gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Thumbnail</span>
                                    </label>
                                    <input name="thumbnail" defaultValue={thumbnail} type="url" placeholder="Thumbnail" className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input name="title" defaultValue={title} type="text" placeholder="Title" className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <input name="description" defaultValue={description} type="text" placeholder="Description" className="input input-bordered w-full" required />
                                </div>

                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Total Marks</span>
                                        </label>
                                        <input name="marks" defaultValue={marks} type="number" placeholder="Marks" className="input input-bordered w-full" required />
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
                                        <input name="date" type="date" defaultValue={date} placeholder="Marks" className="input input-bordered w-full" />
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
                            <button type="submit" className="btn btn-block btn-neutral">Update Assignment</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default UpdateAssignment;