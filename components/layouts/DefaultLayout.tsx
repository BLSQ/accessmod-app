import type { ReactElement } from "react"

type DefaultLayoutProps = {
  children: ReactElement
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  return <div>{props.children}</div>
}

export default DefaultLayout
