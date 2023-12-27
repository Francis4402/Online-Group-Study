import { Link, useLoaderData} from "react-router-dom";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import useAuth from "../Hooks/useAuth.jsx";
import {useForm} from "react-hook-form";
import {Helmet} from "react-helmet";

const AssignmentDetails = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const AssignmentDetails = useLoaderData();
    const {_id, title, image, description, date, level, marks} = AssignmentDetails;
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
            const productsdata = {
                userMarks: data.userMarks,
                email: user?.email,
            }
            const addassignment = await axiosPublic.post(`/usermarks/${_id}`, productsdata)
            if(addassignment.data.insertedId){
                reset()
                setIsSubmitted(true);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Your Marks added`,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
    }



    return (
        <div className="justify-center flex">
            <Helmet>
                <title>OGS | AssignmentDetails</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            <div className="container md:px-0 px-5">
                <div className="py-24">
                <Link to="/"><button className="btn btn-neutral">Back</button></Link>
                    <div className={"justify-center flex"}>
                        <img className="rounded-xl" src={image} alt={"i"}/>
                    </div>

                    <div className={"md:flex grid items-center justify-between mt-10"}>
                        <h1 className={"text-4xl font-semibold"}>{title}</h1>
                        <h1 className={"text-lg font-semibold"}>Level : {level}</h1>
                        <h3 className={"text-lg font-semibold"}>Date : {date}</h3>
                    </div>
                    <div className={"text-left py-10 font-semibold justify-between flex"}>
                        <p>Description : {description}</p>
                    </div>


                    <form onSubmit={handleSubmit(onSubmit)} className="gap-5 flex items-center">
                        <input {...register('userMarks', { required: true, max: marks })} defaultValue={0} type="number" placeholder="Type here" className="input input-bordered w-24 max-w-xs" />

                        {!isSubmitted && (
                            <div className="justify-start flex">
                                <button type="submit" className="btn btn-neutral">
                                    Submit
                                </button>
                            </div>
                        )}
                        <p className={"py-10 font-semibold"}>Total Marks: {marks}</p>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;