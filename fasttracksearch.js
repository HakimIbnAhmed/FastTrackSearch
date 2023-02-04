const input = document.querySelector("input");
const form = document.querySelector("form");
const loader = document.querySelector(".loader");
const results = document.querySelector(".results");
const errorMessage = document.querySelector(".error_message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  loader.style.display = "block";
  results.innerHTML = "";
  errorMessage.innerHTML = "";

  try {
    const searchInput = input.value;
    const response = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    const data = await response.json();
    if (data.query.search.length === 0) {
      errorMessage.innerHTML = "Aucun résultat trouvé";
    } else {
      data.query.search.forEach((result) => {
        results.innerHTML += `
          <div>
            <h2>${result.title}</h2>
            <p>${result.snippet}</p>
            <a href="https://en.wikipedia.org/?curid=${result.pageid}" target="_blank">https://en.wikipedia.org/?curid=${result.pageid}</a>
          </div>
        `;
      });
    }
  } catch (error) {
    errorMessage.innerHTML = "Une erreur s'est produite";
  } finally {
    loader.style.display = "none";
  }
});
