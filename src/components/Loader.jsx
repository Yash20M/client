import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-zinc-400 bg-opacity-50 backdrop-blur-xs z-50">
      <div className="flex flex-row gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default Loader;
