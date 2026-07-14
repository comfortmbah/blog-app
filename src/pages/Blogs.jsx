import BlogCard from "../components/BlogCard"
import Error from "../components/Error"
import Loader from "../components/Loader"
import useFetch from "../hooks/useFetch"
import SearchBar from "../components/SearchBar"
import { useState } from "react"
import EmptyState from "../components/EmptyState"

const Blogs = () => {
  const [searchItem, setSearchItem] = useState("");
  const { data, loading, error } = useFetch("https://dummyjson.com/posts");

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error} />
  }

  const filteredBlogs = data.posts.filter((blog) => {
    return blog.title.toLowerCase().includes(searchItem.toLowerCase());
  })

  if (filteredBlogs.length === 0) {
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

        <SearchBar 
          searchItem={searchItem}
          onSearch={setSearchItem}
        />

        <EmptyState 
          title={'No blogs found'}
          message={'Try searching with a different keyword.'}
        />
      </section>
    )
  }


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

      <SearchBar 
        searchItem={searchItem}
        onSearch={setSearchItem}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.map((blog) => (
          <BlogCard 
            key={blog.id}
            blog={blog}
          />
        ))}
      </div>
    </section>
  )
}

export default Blogs