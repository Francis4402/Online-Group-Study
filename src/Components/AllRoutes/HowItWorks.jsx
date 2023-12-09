import { motion } from "framer-motion"


const HowItWorks = () => {
  return (
    <div className="justify-center flex">
      <motion.div initial={{opacity: 0, x: -200}} animate={{opacity: 1, x: 0}} transition={{type:"spring", stiffness: 100, damping: 10, duration: 1}} className="container h-[795px] md:px-0 px-5">
          <h1 className={"text-center font-semibold text-5xl py-10"}>How It Work</h1>
          <p className="font-semibold">This website is about online assignment share & review others assignment with your friends.
          By Add Your Assignment it will automatically published and your friends they can see your Assignment.
            You can also update your Assignment and delete after finishing the Assignment. Only you can delete or update your
              published Assignment.
          </p>
      </motion.div>
    </div>
  )
}

export default HowItWorks