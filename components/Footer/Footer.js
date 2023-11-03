import React from 'react';


export default function Footer() {
  return (
      <footer className="text-sm phone:mb-4 tablet:mb-0 mt-4 ">
          <div className="text-center">
              <h1 className=" text-gray-600 dark:text-white">Swans Track &copy; 2023</h1>
              <div className="flex gap-x-3 justify-center items-center">
                  <a className="text-blue-400" href="/terms-conditions">
                      Terms of use
                  </a>
                  <p className="dark:text-white">|</p>
                  <a className="text-blue-400" href="/swans-privacy-policy">
                      privacy Policy
                  </a>
              </div>
          </div>
      </footer>
  );
};