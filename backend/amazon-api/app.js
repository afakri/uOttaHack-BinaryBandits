const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");

function getAsin(searchTerm) {
  // set up the request parameters
  const params = {
    api_key: "9466D2E71F5F4EC3B3117A472B206313",
    type: "search",
    amazon_domain: "amazon.ca",
    search_term: searchTerm,
    sort_by: "average_review",
  };

  let asins = [];

  return new Promise((resolve, reject) => {
    // make the http GET request to Rainforest API
    axios
      .get("https://api.rainforestapi.com/request", { params })
      .then((response) => {
        // parse the response as a JSON
        let product = JSON.parse(JSON.stringify(response.data));

        for (let i = 0; i < product.search_results.length; i++) {
         // console.log(product.search_results[i].asin);
          // add to an array
          asins.push(product.search_results[i].asin);
        }
        // resolve the Promise with the asins array
        resolve(asins);
      })
      .catch((error) => {
        // catch and print the error
        console.log(error);
        // reject the Promise with the error
        reject(error);
      });
  });
}

function getReviews(sin) {
  const params = {
    api_key: "4A2AE002C15F4517BB92F35A8B409ADC",
    amazon_domain: "amazon.ca",
    asin: sin,
    type: "product",
  };

  // make the http GET request to Rainforest API
  axios
    .get("https://api.rainforestapi.com/request", { params })
    .then((response) => {
      //parse the response as a JSON
      let res = JSON.parse(JSON.stringify(response.data, 0, 2));

      //prints the reviews for now
      for (let i = 0; i < res.product.top_reviews.length; i++) {
        console.log(res.product.top_reviews[i].body);
      }
    })
    .catch((error) => {
      // catch and print the error
      console.log(error);
    });
}

app.get("/", async (req, res) => {
  try {
    const asins = await getAsin("memory cards");
    asins.forEach((asin) => {
      getReviews(asin);
    });
    res.send("result processing");
  } catch (error) {
    console.log(error);
    res.send("error processing");
  }
});

app.listen(port, () => {
  console.log("App listening on port" + port);
});
