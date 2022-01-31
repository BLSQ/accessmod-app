import { withUserRequired } from "libs/withUser"

const HomePage = () => {
  return (
    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
    </div>
  )
}

HomePage.getHeader = () => (
  <h1 className="text-3xl font-bold text-white">Dashboard</h1>
)

export const getServerSideProps = withUserRequired()

export default HomePage
