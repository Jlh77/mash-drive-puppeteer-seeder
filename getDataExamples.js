const axios = require("axios");
const fs = require("fs/promises");

const sortedData = [];

axios
  .get("https://www.reddit.com/r/shittyfoodporn/top.json")
  .then(({ data }) => {
    return data.data.children;
  })
  .then((data) => {
    data.forEach((post) => {
      sortedData.push({
        title: post.data.title,
        image_url: post.data.url,
        description: post.data.selftext,
      });
    });
    return;
  })
  .then(() => {
    fs.writeFile("postData.json", JSON.stringify(sortedData)).then();
  })
  .catch((err) => {
    console.log("err >>>>>> ", err);
  });
