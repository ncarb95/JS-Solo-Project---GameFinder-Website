const apiKey = "51d303da6c8c4dada05d886b859d161a";

async function fetchGames(query = null) {
  const url = query
    ? `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}&search_precise=true&ordering=-added&page_size=6`
    : `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page_size=6&dates=2022-01-01,2026-12-31`;

  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

async function renderGames(query = null) {
  const gameCardsList = document.querySelector("#game__cards__list");
  const gameNameInput = document.querySelector('.header__text__search__input');

  gameCardsList.innerHTML = `<i class="fa-solid fa-circle-notch loading__spinner"></i>`;
  gameNameInput.value = '';

  const games = await fetchGames(query);

  const gameCardsListHTML = games
    .map((game) => {
      return `<div class="game__card">
                            <div class="game__card__img__wrapper">
                                <a href="#" class="game__card__img__link">
                                    <img src="${game.background_image}" alt="${game.name}" class="game__card__img">
                                </a>
                            </div>
                            <div class="game__card__text">
                                <div class="game__card__main">
                                    <a href="#" class="game__card__title">
                                        ${game.name}
                                    </a>
                                </div>
                                <div class="game__card__sub">
                                    <span class="game__card__rating">${game.rating > 0 ? game.rating + " / 5" : "N/A"}</span>
                                </div>
                            </div>
                        </div>`;
    })
    .join("");

  gameCardsList.innerHTML = gameCardsListHTML;
}

function searchGames() {
  const headerInput = document.querySelector('#header__game__name');
  const navInput = document.querySelector('#nav__game__name');
  const query = (headerInput.value || navInput.value).trim();

  if (!query) return;

  headerInput.value = '';
  navInput.value = '';
  renderGames(query);
}

function keyDownEvent(event) {
  if (event.key === "Enter") {
    searchGames();
  }
}

renderGames();
