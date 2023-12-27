import {Link} from "react-router-dom";
import Swal from "sweetalert2";
import {motion} from "framer-motion";
import useAuth from "../Hooks/useAuth.jsx";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import {useForm} from "react-hook-form";

const image_hosting_key = import.meta.env.VITE_Image_Upload_token;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddAssignment = () => {

    const {user} = useAuth();
    const axiosPublic = useAxiosPublic();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        const imageFile = {image: data.image[0]}
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type' : 'multipart/form-data'
            }
        })
        if(res.data.success){
            const productsdata = {
                title: data.title,
                image: res.data.data.display_url,
                description: data.description,
                marks: res.data.marks,
                email: user?.email,
                userMarks: res.data.userMarks,
                date: res.data.date,
                level: data.level,
            }
            const addassignment = await axiosPublic.post('/assignments', productsdata)
            if(addassignment.data.insertedId){
                reset()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Assignemnt added`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
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


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
                        <div className="sm:flex grid gap-5">
                            <div className="grid gap-3">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Thumbnail</span>
                                    </label>
                                    <input type="file" {...register('image', {required: true})} className="file-input file-input-bordered w-full max-w-xs" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Title</span>
                                    </label>
                                    <input type="text" {...register('title', {required:true})} placeholder="Title" className="input input-bordered w-full" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea type="text" {...register('description', {required: true})} placeholder="Description" className="textarea textarea-bordered w-full" required />
                                </div>


                                <div className="grid md:grid-cols-2 gap-2">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Total Marks</span>
                                        </label>
                                        <input defaultValue={0} type="number" {...register('marks', {required: true})} placeholder="Marks" className="input input-bordered w-full" required />
                                    </div>

                                    <div className="form-control hidden">
                                        <label className="label">
                                            <span className="label-text">Others Review Marks</span>
                                        </label>
                                        <input defaultValue={0} type="number" {...register('userMarks', {required: true})} placeholder="userMarks" className="input input-bordered w-full" />
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input type="date" {...register('date', {required: true})} className="input input-bordered w-full" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Level</span>
                                    </label>
                                    <select {...register('level', {required: true})} className="p-3 rounded-md bg-base-300 w-full" required>
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