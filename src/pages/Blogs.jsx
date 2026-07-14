import BlogCard from "../components/BlogCard"
import Error from "../components/Error"
import Loader from "../components/Loader"
import useFetch from "../hooks/useFetch"
import SearchBar from "../components/SearchBar"
import { useState, useMemo } from "react"
import EmptyState from "../components/EmptyState"
import CategoryFilter from "../components/CategoryFilter"

const Blogs = () => {
  const [searchItem, setSearchItem] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { data, loading, error } = useFetch("https://dummyjson.com/posts");

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <Error message={error} />
  }

  const categories = useMemo(() => {
    const allTags = data.posts.flatMap((blog) => blog.tags);
    return [...new Set(allTags)].sort();
  }, [data.posts]);

  const filteredBlogs = data.posts.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchItem.toLowerCase());
    const matchesCategory = selectedCategory === "All" || blog.tags.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

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