

const Blogs = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900">
          All Blogs
        </h1>

        <p className="mt-2 text-gray-600">
          Read the latest articles on programming, web development, and technology.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"></div>
    </section>
  )
}

export default Blogs