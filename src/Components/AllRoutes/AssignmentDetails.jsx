import { Link, useLoaderData} from "react-router-dom";
import { useState } from "react";

const AssignmentDetails = () => {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const AssignmentDetails = useLoaderData();
    const {_id, title, thumbnail, description, date, level, marks} = AssignmentDetails;


    const handleUpdateMarks = e => {

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