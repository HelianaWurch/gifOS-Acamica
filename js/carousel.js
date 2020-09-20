trendingLeftBtn.addEventListener("click", (e) => {
	trendingResults.scrollBy({
		top: 0,
		left: -372,
		behavior: "smooth",
	});
});

trendingRightBtn.addEventListener("click", (e) => {
	trendingResults.scrollBy({
		top: 0,
		left: 372,
		behavior: "smooth",
	});
});
