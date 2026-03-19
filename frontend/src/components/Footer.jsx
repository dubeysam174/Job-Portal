import React from "react";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Section */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold  rounded-2xl px-2 py-1.5 animate-pulse">
              Job<span className="text-purple-700">X</span>
            </h2>
            <p className="text-sm text-gray-500">
              Designed & Developed with ❤️ by Samarth
            </p>
          </div>

          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://github.com/dubeysam174"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600 transition duration-200 transform hover:scale-110"
              aria-label="GitHub"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
      0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756
      -1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 
      3.492.998.108-.776.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 
      0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 
      3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 
      2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176 
      .765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.922 
      .42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 
      0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12 
      24 5.37 18.63 0 12 0z"
                />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/samarthdubey30"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-600"
              aria-label="LinkedIn"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.5 8h4v16h-4V8zm7.5 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.88 1.95-2.88 3.97V24h-4V8z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
