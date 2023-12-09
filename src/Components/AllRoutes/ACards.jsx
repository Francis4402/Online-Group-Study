import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {motion} from "framer-motion";

const ACards = ({cards}) => {


    const { _id, title, marks, userMarks, level, thumbnail} = cards;

    return (
        <div className="card md:w-[400px] w-full glass">
            <figure><img src={thumbnail} alt="i" /></figure>
            <div className="card-body">
                <h2 className="card-title justify-center">{title}</h2>
                <div className="flex justify-between text-center">
                    <p>Total Marks : {marks}</p>
                    <p>Level : {level}</p>
                </div>
                <p className="font-semibold">Give-Marks : {userMarks}</p>

                    <motion.div whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: 'spring', stiffness: 400, damping:10}} className="card-actions justify-center">
                        <Link to={`/assignmentdetails/homeassignments/${_id}`}><button className="px-5 py-3 bg-[#6C5F5B] rounded-xl text-white hover:bg-[#6C5F5B]/60 duration-200 font-semibold">Details</button></Link>
                    </motion.div>
                
                    
            </div>
        </div>
    );
};

ACards.propTypes = {
    cards: PropTypes.object
}

export default ACards;