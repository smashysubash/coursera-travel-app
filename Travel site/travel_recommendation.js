const search = document.getElementById('search');
const searchBtn = document.getElementById('searchbtn');
const searchResult = document.getElementById('searchresult');
const clearBtn = document.getElementById('clearbtn');
console.log('search', search);
console.log('searchBtn', searchBtn);
console.log('searchResult', searchResult);

searchBtn.addEventListener('click', () => {
    console.log('searchBtn clicked');
    searchResult.innerHTML = '';
    const searchValue = search.value.toLowerCase();
    if (searchValue) {
        const searchResultData = fetchTravelData(searchValue);
        console.log('searchResultData', searchResultData);
        searchResultData.then((data) => {
            console.log('data', data);
            data.forEach((item) => {
                const div = document.createElement('div');
                div.innerHTML = `
                <div class="card">
                    <img src="${item.imageUrl}" alt="${item.name}" width="300px" height="200px" />
                    <h2>${item.name}</h2>
                    <p>${item.description}</p>
                    <button class="searchbtn">Visit</button>
                </div>
                `;
                searchResult.appendChild(div);
            });
        });
    }
})

clearBtn.addEventListener('click', () => {
    search.value = '';
    searchResult.innerHTML = '';
})

async function fetchTravelData(value) {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const travelData = await response.json();
        const res = travelData?.[value] ?? [];
        console.log("travelData", travelData, res);
        return res;
    } catch (error) {
        console.error('Error fetching travel data:', error);
    }
}