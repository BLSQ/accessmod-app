type MainProps = {
  children: React.ReactNode;
};

const Main = (props: MainProps) => {
  const { children } = props;
  return (
    <main className="-mt-32 pb-8 flex-1 flex flex-col">
      <div className="max-w-7xl w-full px-4 sm:px-4 lg:px-8 flex-1 flex flex-col mx-auto">
        {children}
      </div>
    </main>
  );
};

export default Main;
