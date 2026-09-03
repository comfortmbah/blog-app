export const getBlogList = async (req, res, next) => {
  try {
    const response = await fetch("https://dummyjson.com/posts");

    if (!response.ok) {
      throw new Error("Failed to fetch blogs")
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
}

export const getBlogDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://dummyjson.com/posts/${id}`);

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    next(error);
  }
}