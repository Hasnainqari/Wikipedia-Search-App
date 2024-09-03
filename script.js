document.addEventListener("DOMContentLoaded", () => {
  const searchButton = document.getElementById("search-button");
  const randomButton = document.getElementById("random-button");
  const searchBox = document.getElementById("search-box");
  const resultsDiv = document.getElementById("results");

  const apiUrl = "https://en.wikipedia.org/w/api.php";

  function searchWikipedia(query) {
    fetch(
      `${apiUrl}?action=query&format=json&prop=extracts&exintro&titles=${query}&origin=*`
    )
      .then((response) => response.json())
      .then((data) => {
        const pages = data.query.pages;
        resultsDiv.innerHTML = "";
        for (const pageId in pages) {
          const page = pages[pageId];
          resultsDiv.innerHTML += `
              <div class="result-item">
                <a href="https://en.wikipedia.org/?curid=${pageId}" target="_blank">${page.title}</a>
                <p>${page.extract}</p>
              </div>
            `;
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  function getRandomArticle() {
    fetch(`${apiUrl}?action=query&format=json&list=random&rnlimit=1&origin=*`)
      .then((response) => response.json())
      .then((data) => {
        const randomPageId = data.query.random[0].id;
        searchWikipedia(randomPageId);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }

  searchButton.addEventListener("click", () => {
    const query = searchBox.value.trim();
    if (query) {
      searchWikipedia(query);
    }
  });

  randomButton.addEventListener("click", getRandomArticle);
});
