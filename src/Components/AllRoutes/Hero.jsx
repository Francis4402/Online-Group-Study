import { motion } from "framer-motion"
import LottiePi from "../AnimationSVG/LottiePi.jsx"

const Hero = () => {
  return (
    <div className="justify-center flex">
        <div className="container lg:p-0 px-5">
            <div className="lg:justify-between grid text-center lg:text-left lg:flex items-center gap-10 py-20">
                <motion.h1 initial={{opacity: 0, x: -200}} animate={{opacity: 1, x: 0}} transition={{type:"spring", stiffness: 100, damping: 10, duration: 1}}
                           className="md:text-6xl text-2xl font-bold capitalize text-base-content lg:w-[700px] w-full">Online Study with your friends & Share Assignments</motion.h1>
                <LottiePi/>
            </div>
        </div>
    </div>
  )
}

export default Hero