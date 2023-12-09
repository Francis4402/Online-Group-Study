import { Player } from '@lottiefiles/react-lottie-player';
import animationdata from "/Animation - 1699135765783.json?url"
import { motion } from 'framer-motion';

const LottiePi = () => {
  return (
    <motion.div initial={{opacity: 0, x: 200}} animate={{opacity: 1, x: 0}} transition={{type: "spring", stiffness: 100, damping: 10, duration: 1}}>
        <Player
            autoplay
            loop
            src={animationdata}
            className={"w-full h-full"}
        >
        </Player>
    </motion.div>
  )
}

export default LottiePi