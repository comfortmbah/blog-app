export const getBlogList = async (req, res) => {
  const response = await fetch("https://dummyjson.com/posts");
  const data = await response.json();
  
  res.json(data);
}

export const getBlogDetails = async (req, res) => {
  const { id } = req.params;
  const response = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await response.json();

  res.json(data);
}