import { Link, useLoaderData} from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const AssignmentDetails = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const AssignmentDetails = useLoaderData();
    const {_id, title, thumbnail, description, date, level, marks} = AssignmentDetails;


    const handleUpdateMarks = e => {
        
        e.preventDefault();


        const form = e.target;
        const userMarks = form.userMarks.value;

        

        if (userMarks > marks){
            Swal.fire({
                title: 'Error!',
                text: 'New marks cannot exceed the existing marks.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const updatemarks = {userMarks}

        const baseUrl = `https://online-group-study-serverside-francisms-projects.vercel.app/homeassignments`;
        const url = `${baseUrl}${_id ? '/' + _id : ''}`;

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(updatemarks)
        })
            .then(res => res.json())
            .then(data => {
                if(data.modifiedCount > 0){
                    setIsSubmitted(true);
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
        <div className="justify-center flex">
            <div className="container md:px-0 px-5">
                <div className="py-24">
                <Link to="/"><button className="btn btn-neutral">Back</button></Link>
                    <div className={"justify-center flex"}>
                        <img className="rounded-xl" src={thumbnail} alt={"i"}/>
                    </div>

                    <div className={"md:flex grid items-center justify-between mt-10"}>
                        <h1 className={"text-4xl font-semibold"}>{title}</h1>
                        <h1 className={"text-lg font-semibold"}>Level : {level}</h1>
                        <h3 className={"text-lg font-semibold"}>Date : {date}</h3>
                    </div>
                    <p className={"text-left py-10 font-semibold"}>Description : {description}</p>

                    <form onSubmit={handleUpdateMarks} className="gap-5 flex">
                        <input name="userMarks" defaultValue={0} type="number" placeholder="Type here" className="input input-bordered w-24 max-w-xs" />
                        <div className="justify-start flex">
                            <button type="submit" disabled={isSubmitted} className="btn btn-neutral">Submit</button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

export default AssignmentDetails;