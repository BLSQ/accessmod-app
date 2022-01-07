import type { NextPage } from "next"
import { withUserRequired } from "libs/withUser"
import { logout } from "libs/auth"

const Home: NextPage = () => {
  return (
    <div>
      Hey <button onClick={() => logout()}>log out</button>
    </div>
  )
}

export const getServerSideProps = withUserRequired()

export default Home
