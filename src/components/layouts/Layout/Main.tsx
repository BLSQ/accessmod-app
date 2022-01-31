type MainProps = {
  children: React.ReactNode;
};

const Main = (props: MainProps) => {
  const { children } = props;
  return (
    <main className="-mt-32 pb-8 flex-1">
      <div className="max-w-8xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </main>
  );
};

export default Main;
