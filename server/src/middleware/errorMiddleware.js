export const errorHandler = (err, req, res, next) => {
  console.log("Unhadled error:", err);

  res.status(500).json({
    message: "Internal server error",
  });
};