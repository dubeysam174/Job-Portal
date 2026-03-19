import React, { useRef, useEffect } from "react";
import Typed from "typed.js";
import { Mail, MessageSquare, Zap } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: [
        "Find Your Dream Job",
        "Explore Top Companies",
        "Build Your Career",
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 1500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => typed.destroy();
  }, []);

  const floatAnimation = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    whileInView: {
      opacity: 1,
      y: [30, 0, -5, 0],
    },
    transition: {
      delay,
      duration: 0.8,
      ease: "easeOut",
    },
    viewport: {
      once: true,
      amount: 0.3,
    },
  });

  return (
    <div className="relative overflow-hidden py-16 px-4 md:px-20">
    
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-100 via-white to-purple-100 blur-2xl opacity-50"></div>

      <div className="flex flex-col items-center justify-center text-center">
    
        <div className="flex justify-center mb-4">
          <span className="bg-gray-200 text-red-600 px-3 py-1 rounded-full text-sm border border-red-500 animate-pulse">
            Trusted by 10,000+ companies worldwide
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Search Apply & <br />
          <span className="text-purple-600" ref={typedRef}></span>
        </h1>

        {/* Subheading */}
        <p className="text-lg mt-4 text-gray-600 dark:text-gray-400">
          Get Connected, Be Recruited
        </p>

        {/* Description */}
        <p className="mt-2 text-gray-700 dark:text-gray-400 max-w-xl">
          Not your regular job platform —{" "}
          <span className="text-purple-700 font-semibold">
            Connecting talent with opportunity.
          </span>
        </p>

   
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-10 w-full max-w-5xl">
          {[
            {
              icon: <Mail size={28} />,
              title: "Email Notifications",
              desc: "Get instant updates when your application is accepted or rejected.",
            },
            {
              icon: <MessageSquare size={28} />,
              title: "Direct Messaging",
              desc: "Chat directly with recruiters and discuss opportunities in real-time.",
            },
            {
              icon: <Zap size={28} />,
              title: "Application Tracking",
              desc: "Track your application status and stay updated throughout the hiring process.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              {...floatAnimation(index * 0.2)}
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 15px 40px rgba(168,85,247,0.4)",
              }}
              whileTap={{ scale: 0.97 }}
              className="flex-1 backdrop-blur-xl bg-white/70 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 text-center shadow-lg cursor-pointer"
            >
              
              <div className="flex justify-center mb-3 text-purple-600">
                {feature.icon}
              </div>

             
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {feature.title}
              </h3>

             
              <p className="text-gray-500 dark:text-gray-300 text-sm mt-2">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
