import React from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./ui/HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobs from "./LatestJobs";
import Footer from "./Footer";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useGetAllJobs();

  const handleNavigation = (path) => {
    if (!user) {
      navigate("/login"); // or "/signup"
    } else {
      navigate(path);
    }
  };

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
  },
});

  return (
    <>
      <motion.div className="dark:bg-gray-900 ">
         
        <Navbar />
        <HeroSection />
        <CategoryCarousel />
        <section className="py-20 bg-gray-100 dark:bg-gray-900">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Choose Job<span className="text-purple-600">X</span>?
          </motion.h2>

          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 px-6">
            {/* Card 1 */}
            <motion.div
            {...floatAnimation(0)}
              className="p-6 rounded-2xl 
                bg-white dark:bg-white/5 
                backdrop-blur-xl 
                border border-white/20 dark:border-white/10 
                shadow-lg 
                hover:scale-105 transition duration-300
                hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <div
                className="inline-block px-5 py-2 rounded-xl 
                bg-blue-500/10 
                backdrop-blur-md 
                border border-blue-400/20
                shadow-[0_0_20px_rgba(59,130,246,0.3)]
                text-blue-400 font-medium cursor-pointer mb-1"
              >
                Diverse Opportunities
              </div>

              <p className="text-gray-60 text-sm mb-4">
                Access thousands of job listings across various industries and
                experience levels.
              </p>

              <ul className="space-y-2 text-sm text-gray-60">
                <li className="flex items-center gap-2">
                  ✅ 100,000+ active job listings
                </li>
                <li className="flex items-center gap-2">
                  ✅ 50+ job categories
                </li>
                <li className="flex items-center gap-2">
                  ✅ Remote and on-site options
                </li>
              </ul>

              <button className="mt-6 w-full bg-black backdrop-blur-md text-white py-2 rounded-md hover:bg-black transition  cursor-pointer">
                Explore Jobs
              </button>
            </motion.div>

            {/* Card 2 */}
            <motion.div
            {...floatAnimation(0.3)}
              className="p-6 rounded-2xl 
                bg-white dark:bg-white/5 
                backdrop-blur-xl 
                border border-white/20 dark:border-white/10 
                shadow-lg 
                hover:scale-105 transition duration-300
                hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            >
              <div
              
                className="inline-block px-5 py-2 rounded-xl 
                bg-purple-500/10 
                backdrop-blur-md 
                border border-purple-400/20
                shadow-[0_0_20px_rgba(168,85,247,0.3)]
                text-purple-400 font-medium cursor-pointer mb-1 "
              >
                Top Companies
              </div>

              <p className="text-gray-500 text-sm mb-4">
                Connect with leading companies, from innovative startups to
                Fortune 500 corporations.
              </p>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  ✅ 500+ verified employers
                </li>
                <li className="flex items-center gap-2">
                  ✅ Exclusive partnerships
                </li>
                <li className="flex items-center gap-2">
                  ✅ Direct application process
                </li>
              </ul>

              <button
                onClick={() => handleNavigation("/browse")}
                className="mt-6 w-full bg-black text-white py-2 rounded-md  cursor-pointer "
              >
                View Companies
              </button>
            </motion.div>

            {/* Card 3 */}
            {!user && (
              <motion.div
              {...floatAnimation(0.6)}
                className="p-6 rounded-2xl 
                bg-white dark:bg-white/5 
                backdrop-blur-xl 
                border border-white/20 dark:border-white/10 
                shadow-lg 
                hover:scale-105 transition duration-300
                hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
              >
                <div
                  className="inline-block px-5 py-2 rounded-xl 
                bg-amber-500/10 
                backdrop-blur-md 
                border border-amber-400/20
                shadow-[0_0_20px_rgba(245,158,11,0.3)]
                text-amber-400 font-medium cursor-pointer mb-1"
                >
                  Post Job
                </div>
                <p className="text-gray-500 text-sm mb-4">
                  Employers can access a diverse pool of qualified candidates
                  for their open positions.
                </p>

                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    ✅ 1M+ registered job seekers
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ Advanced search filters
                  </li>
                  <li className="flex items-center gap-2">
                    ✅ AI-powered matching
                  </li>
                </ul>

                <button
                  onClick={() => navigate("/login")}
                  className="mt-6 w-full bg-black text-white py-2 rounded-md   cursor-pointer"
                >
                  Post a Job
                </button>
              </motion.div>
            )}
          </div>
        </section>
        <LatestJobs  />
        <Footer />
      </motion.div>
    </>
  );
};

export default Home;
