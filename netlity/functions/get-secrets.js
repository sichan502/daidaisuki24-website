if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

exports.handler = async function () {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: "Function works!",
      secret: process.env.SECRET_API_KEY || "missing"
    })
  };
};
