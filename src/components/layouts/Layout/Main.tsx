type MainProps = {
  children: React.ReactNode;
};

const Main = (props: MainProps) => {
  const { children } = props;
  return (
    <main className="-mt-48 pb-8 flex-1 flex flex-col">
      <div className="max-w-8xl w-full pb-12 px-4 sm:px-6 lg:px-8 flex-1 flex flex-col">
        {children}
      </div>
    </main>
  );
};

export default Main;
