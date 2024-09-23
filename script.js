document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const clearHistoryButton = document.getElementById('clear-history-button');
    const historyList = document.getElementById('history-list');

    const loadSearchHistory = () => {
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        historyList.innerHTML = '';
        history.forEach(item => {
            const li = document.createElement('li');
            const time = new Date(item.time).toLocaleString();
            li.innerHTML = `${item.query} <span class="search-time">${time}</span>`;
            historyList.appendChild(li);
        });
    };

    
    const saveSearchHistory = (query) => {
        const newEntry = { query, time: new Date() };
        const history = JSON.parse(localStorage.getItem('searchHistory')) || [];
        history.push(newEntry);
        localStorage.setItem('searchHistory', JSON.stringify(history));
        loadSearchHistory(); 
    };

    
    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            saveSearchHistory(query);
            searchInput.value = ''; 
        }
    });

   
    clearHistoryButton.addEventListener('click', () => {
        localStorage.removeItem('searchHistory'); 
        loadSearchHistory(); 
    });

   
    loadSearchHistory();
});
