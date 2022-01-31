import { ReactElement, useEffect } from "react"
import { logout } from "libs/auth"

const Logout = () => {
  useEffect(() => {
    logout()
  }, [])

  return null
}

Logout.getLayout = (page: ReactElement) => page

export default Logout
