export const getBlogList = async (req, res) => {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  
  res.json(data);
}