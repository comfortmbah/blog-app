

const Footer = () => {
  return (
    <footer className="mt-12 border-t bg-gray-100">
      <div className="mx-auto max-w-7xl flex items-center flex-col justify-between text-sm py-4 px-6 text-gray-600 md:flex-row">
        <p className="text-xl">&copy; {new Date().getFullYear()} BlogApp. All right reserved.</p>
        <p className="text-xl">Built with React & Tailwind CSS.</p>
      </div>
    </footer>
  )
}

export default Footer