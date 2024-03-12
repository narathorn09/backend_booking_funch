const ResponseError = (error,res,) => {
  console.error(error);
  res.status(500).json({
    status: 500,
    message: "Unknown Internal Server Error.",
  });
};

export default ResponseError;
