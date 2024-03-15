const apikey = "31007f70b2124b33b3d09664856f5a8a";
const blogcon = document.getElementById("blog-con");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews() {
  try {
    const apiUrl =
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" +
      apikey;

    // Log before sending the request
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Response data:", data.articles); // Log the response data

    return data.articles;
  } catch (error) {
    console.error("Error fetching random news:", error);
    return [];
  }
}

searchButton.addEventListener("click", async () => {
  const query = searchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles); // Call displayBlogs to render fetched articles
    } catch (error) {
      console.error("Error fetching news by query", error);
    }
  }
});

async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.articles);
    return data.articles;
  } catch (error) {
    console.error("Error fetching Random news", error);
    return [];
  }
}

const displayBlogs = (articles) => {
  blogcon.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle =
      articles.length > 30
        ? article.title.slice(0, 30) + "....."
        : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p"); // Create a new paragraph element
    description.textContent = article.description; // Set the paragraph content
    const truncatedDes =
      article.length > 120
        ? article.description.slice(0, 120) + "....."
        : article.description;
    // Removed the line assigning truncatedDes to title.textContent (already set)
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogcon.appendChild(blogCard);
  });
};

(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();
