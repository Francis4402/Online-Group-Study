import {Player} from "@lottiefiles/react-lottie-player";
import {motion} from "framer-motion";
import animationdata from "/Animation - 1699181225489.json?url"

const Lottieanim2 = () => {
    return (
        <motion.div initial={{opacity: 0, x: -100}} animate={{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 100, damping: 10, duration: 0.5}}>
            <Player
                autoplay
                loop
                src={animationdata}
                className={"lg:w-[600px] w-full h-full"}
            >
            </Player>
        </motion.div>
    );
};

export default Lottieanim2;