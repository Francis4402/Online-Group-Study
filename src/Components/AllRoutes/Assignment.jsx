import {useContext, useEffect, useState} from 'react';
import ACards from "./ACards.jsx";
import { motion } from 'framer-motion';
import { AuthContext } from '../AuthProvider/AuthProvider.jsx';
import useAxiosPublic from "../Hooks/useAxiosPublic.jsx";
import {Helmet} from "react-helmet";



const Assignment = () => {

    const {loading} = useContext(AuthContext)
    const axiosPublic = useAxiosPublic();
    const [data, setData] = useState([])
    const [selectedLevel, setSelectedLevel] = useState('all');
    const [sortedData, setSortedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerpage] = useState(10);
    const [count, setCount] = useState([]);
    const NumberOfPages = Math.ceil(count.count /itemsPerPage);

    const pages = []
    for(let i = 0; i < NumberOfPages; i++){
        pages.push(i)
    }

    useEffect(() => {
        axiosPublic.get('/homeassignmentscount')
        .then(res => setCount(res.data.count))
        .catch(error => console.error(error))
    },[axiosPublic])
    

    
    useEffect(() => {
            axiosPublic.get(`/homeassignments?page=${currentPage}&size=${itemsPerPage}`)
                .then(res => setData(res.data))
                .catch(error => console.error(error))
    }, [currentPage, itemsPerPage, axiosPublic])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const sortDataByLevel = (level) => {
        if (level === 'all') {
          return data;
        } else {
          return data.filter((assignment) => assignment.level === level);
        }
      };

    const handleLevelFilter = (e) => {
        setSelectedLevel(e.target.value);
    }

    useEffect(() => {
        const sorted = sortDataByLevel(selectedLevel);
        setSortedData(sorted);
      }, [selectedLevel, sortDataByLevel]);

    const handlepage = (e) => {
        const value = parseInt(e.target.value);
        setItemsPerpage(value);
        setCurrentPage(0);
    }

    const handlePrevPage = () => {
        if(currentPage > 0){
            setCurrentPage(currentPage - 1);
        }
    }

    const handleNextPage = () => {
        if(currentPage < pages.length){
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div className="justify-center flex">
            <div className="container py-10">
                <div className="grid gap-20">
                    <h1 className="text-center font-bold text-4xl text-base-content">Assignments</h1>

                    <div className="grid justify-start items-center gap-3 md:px-0 px-5">
                        <label className="label">
                            <span className="label-text text-xl">Level</span>
                        </label>
                        <select value={selectedLevel} onChange={handleLevelFilter} className="p-2 rounded-md bg-base-300">
                            <option value='all'>All</option>
                            <option value='easy'>Easy</option>
                            <option value='medium'>Medium</option>
                            <option value='hard'>Hard</option>
                        </select>
                    </div>

                    <div className="grid justify-center">
                        {                   
                            sortedData.length === 0 ? (
                                loading ? <div className="flex justify-center items-center">
                                    <progress className="progress w-56"></progress>
                            </div> :
                                    <p className="text-3xl font-bold p-10">There is no Assignments Added</p>
                                ) : (
                                    
                                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10 justify-center md:px-0 px-5">
                                        {
                                            sortedData.map(cards => <ACards key={cards._id} cards={cards} />)
                                        }
                                    </div>                     
                            )
                        }

                                <div className='grid justify-center gap-4 py-20'>
                                    <p className='flex justify-center font-semibold'>Current Page: {currentPage}</p>
                                    <div className='flex justify-center gap-4 '>
                                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                               onClick={handlePrevPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                >
                                                    Prev
                                            </motion.button>
                                            {
                                                pages.map(page => <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                                className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                key={page} onClick={() => setCurrentPage(page)}>
                                                    
                                                    {page}
                                                
                                                </motion.button>)
                                            }
                                            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} transition={{type: "spring", stiffness: 400, damping: 15}} 
                                                onClick={handleNextPage} className={'bg-[#6C5F5B] px-3 py-2 rounded-lg text-white font-semibold hover:bg-[#4F4A45]'} 
                                                >
                                                    Next
                                            </motion.button>
                                            <select value={itemsPerPage} onChange={handlepage} name="" id=''>
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="20">20</option>
                                                <option value="50">50</option>
                                            </select>
                                    </div>
                                        
                                </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assignment;