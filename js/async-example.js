async function handleSearchFunctionality(searchValue) {
  $searchResultTitle.innerText = Resultados de búsqueda: ${ searchValue };
  $searchBar.value = "";
  $searchBar.focus();
  $searchButton.disabled = true;
  $searchResulsContainer.innerHTML = "";
  await fetchSearchResultGifs(searchValue);
  events.emit("searchStarted");
  $searchSuggestions.innerHTML = "";
  await showElements($searchResultsSection, $searchTags);
}
async function handleSearchSuggestionSearch(limit, keywords) {
  controller = new AbortController();
  const signal = controller.signal;
  const processedKeywords = processSearchValues(keywords);
  const url = `https://api.giphy.com/v1/gifs/search?q=${processedKeywords}&api_key=${APIkey}&limit=${limit}`;

  const searchResults = await fetchURL(url, { signal });
  if (searchResults.data) {
    $searchSuggestions.innerHTML = "";
    showElements($searchSuggestions);
    searchResults.data.length
      ? searchResults.data.forEach((searchTitle) => {
        searchTitle.title && searchTitle.title !== " "
          ? $searchSuggestions.append(newElement("searchTitle", searchTitle))
          : null;
      })
      : hideElements($searchSuggestions);

    const $searchSuggestionsButtons = document.querySelectorAll(".btn--search-suggestion");
    $searchSuggestionsButtons.forEach((element) => {
      element.onclick = () => {
        handleSearchFunctionality(element.innerText);
      };
    });
  }
}
async function fetchSearchResultGifs(keywords) {
  lastUsedKeywords = keywords;
  const separator = newElement("separator");
  $searchResultsSection.append(separator);

  // Turn off event subscription until all fetching returns so it doesn't multi-trigger
  events.off("loadMoreItems-search", fetchSearchResultGifs);

  const processedKeywords = processSearchValues(keywords);
  const searchResults = await fetchURL(
    `https://api.giphy.com/v1/gifs/search?q=${processedKeywords}&api_key=${APIkey}&limit=${amountOfTrendingGifs}&offset=${
    amountOfTrendingGifs * offset
    }`
  );
  offset++;

  await searchResults.data.forEach((gif) => {
    let aspectRatio = "";
    gif.images["480w_still"].width / gif.images["480w_still"].height >= 1.5
      ? (aspectRatio = "item-double")
      : null;
    $searchResulsContainer.append(newElement("trend", gif, aspectRatio));
  });

  await events.on("loadMoreItems-search", fetchSearchResultGifs);
  await $searchResultsSection.removeChild(separator);
  events.emit("imagesToLazyLoad");
  fitDoubleSpanGifsGrid($searchResulsContainer.attributes.id.value);

  $searchTags.innerHTML = "";
  searchResults.data.map((element) => {
    element.title && element.title !== " " && element.title !== "&emsp;"
      ? $searchTags.appendChild(newElement("tag", element))
      : null;
  });