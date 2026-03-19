import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'
import { useSelector } from 'react-redux'
import Autoplay from 'embla-carousel-autoplay'

const CategoryCarousel = () => {
  // const dispatch= useDispatch()
  // const navigate = useNavigate()
  //  const  searchJobHandler =(query)=>{
  //    dispatch(setSearchedQuery(query));
  //    navigate("/browse")
  //  }

  const {allJobs}= useSelector(store=>store.job)
             
  return (
    <div>
      <Carousel className='w-full max-w-xl mx-auto my-20'
                 plugins={[
          Autoplay({
            delay: 2000, // ⏱ 2 sec
            stopOnInteraction: false,
          }),
        ]}>
        <CarouselContent>
            {
                allJobs?.map((job,index)=>(
                    <CarouselItem key={index} className='md:basis-1/2 lg:basis-1/3'>
                        <Button   variant='outline' className='rounded-full'>{job?.title}</Button>
                    </CarouselItem>
                ))
            }
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
