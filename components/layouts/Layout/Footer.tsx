import Link from "next/link"

const Footer = () => {
  return (
    <footer>
      <div className="bg-who-blue-main text-white">
        <div className="border-t border-gray-200 py-4 text-sm text-center sm:text-left max-w-8xl mx-auto sm:px-6 lg:px-8">
          <span className="block sm:inline mr-2">&copy; 2022 WHO</span>{" "}
          <Link href="/">
            <a className="block sm:inline">Contact Support</a>
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
