const MainColumnWorkspace = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
      {children}
    </div>
  );
};

export default MainColumnWorkspace;
