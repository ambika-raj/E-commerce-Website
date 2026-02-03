const input = document.getElementById("searchInput");
const btn = document.getElementById("search");

function showHistory() {

    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

    let list = document.getElementById("historyList");
    list.innerHTML = "";

    history.forEach(item => {

        let li = document.createElement("li");
        li.innerText = item;

        list.appendChild(li);
    });
}

showHistory();
