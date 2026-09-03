

const About = () => {
  return (
    <section className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-4xl font-bold text-gray-900">
        About BlogApp
      </h1>

      <div className="space-y-4 text-gray-700 leading-8">
        <p>
          BlogApp is a modern blogging platform built with React. It is designed to provide readers with insightful articles on
          web development, programming, and technology.
        </p>

        <p>
          This project demonstrates modern React development practices, including reusable components, React Router, custom hooks,
          API integration, and responsive design.
        </p>

        <p>
          As the project evolves, new features such as authentication, comments, likes, bookmarks, and a Node.js backend will be added 
          to create a complete full-stack blogging platform.
        </p>
      </div>
    </section>
  )
}

export default About