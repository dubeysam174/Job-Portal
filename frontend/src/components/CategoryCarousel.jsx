import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useSelector } from 'react-redux'
import Autoplay from 'embla-carousel-autoplay'

const CategoryCarousel = () => {
  const { allJobs } = useSelector(store => store.job)

  return (
    <div className="w-full py-10 px-10">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
        Browse by Category
      </h2>

      <Carousel
        className="w-full max-w-2xl mx-auto"
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: false,
          }),
        ]}
      >
        <CarouselContent>
          {allJobs?.map((job, index) => (
            <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-3">
              <Button
                variant="outline"
                className="rounded-full w-full text-sm
                  border-purple-300 text-purple-700 hover:bg-purple-50
                  dark:border-purple-600 dark:text-purple-300 dark:hover:bg-purple-900/30
                  transition duration-200"
              >
                {job?.title}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="dark:border-gray-600 dark:text-white" />
        <CarouselNext className="dark:border-gray-600 dark:text-white" />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel