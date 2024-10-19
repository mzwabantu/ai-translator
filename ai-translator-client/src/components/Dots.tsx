const Dots = () => {
  return (
    <div className="flex justify-center items-center space-x-2 mt-4">
      <div className="h-2 w-2 rounded-full bg-gray-500 dark:bg-white animate-bounce1"></div>
      <div className="h-2 w-2 rounded-full bg-gray-500 dark:bg-white animate-bounce2"></div>
      <div className="h-2 w-2 rounded-full bg-gray-500 dark:bg-white animate-bounce3"></div>
    </div>
  );
};

export default Dots;
