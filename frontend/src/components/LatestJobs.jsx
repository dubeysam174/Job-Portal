
import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion'; 
const randomJobs= [1,2,3,4,5,6,7,8,];
const LatestJobs = () => {
   const floatAnimation = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  whileInView: {
    opacity: 1,
   y: [30, 0, -5, 0], // just come up once
  },
  transition: {
    delay,
    duration: 0.8,
    ease: "easeOut",
  },
  viewport: {
    once: true, // 🔥 THIS IS THE KEY
    amount: 0.3,
  },});
  const {allJobs}= useSelector(store=>store.job)
  return (
    <div className="max-w-7xl mx-auto my-20" >
      <h1 className='text-4xl font-bold'><span className='text-purple-600'>Latest & Top</span> Job Openings</h1>
       <motion.div className='grid grid-cols-3 gap-4 my-5'
       {...floatAnimation(0.6)}>
        {
           allJobs.length<=0?<span>No Job available</span> :allJobs?.slice(0,6).map((job) => <LatestJobCard key={job._id} job={job}/>)
        }
       </motion.div>
    </div>
  )
}

export default LatestJobs
