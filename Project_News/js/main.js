const apikey = "79ffeab3f98646eaac84a2ba2e150b9d";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("Canada"));
async function fetchNews(query) {
    await fetch(`${url}${query}&apiKey=${apikey}`)
    .then(res => res.json())
    .then((data) => {
        bindData(data.articles);
    });

}
function bindData(articles){
    const collect = document.querySelector("#collect");
    const template = document.querySelector("#template-news");
    collect.innerHTML = '';
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const clone = template.content.cloneNode(true);
        fillDataCollect(clone, article);
        collect.appendChild(clone);
    });
}

function fillDataCollect(clone , article) {
    const img = clone.querySelector("#news-img");
    const title = clone.querySelector("#h3");
    const source = clone.querySelector("#h6");
    const description = clone.querySelector("#p1");
    img.src = article.urlToImage;
    title.innerHTML = article.title;
    description.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {timeZone: "America/Toronto"});
    source.innerHTML = `${article.source.name} . ${date}`;
    clone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}
let selectedItem = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    selectedItem?.classList.remove('active');
    selectedItem = navItem;
    selectedItem.classList.add('active');
    const b = document.querySelector("main");
    b.classList.add("clor");
    const c = document.querySelector("nav");
    c.classList.add("first");
}

const input = document.querySelector(".news-input");
const b1 = document.querySelector("#button1");

b1.addEventListener('click', () => {
    const query = input.value;
    if(!query) return;
    fetchNews(query);
    selectedItem?.classList.remove('active');
    selectedItem = null;
    const b = document.querySelector("main");
    b.classList.add("clor");
    const c = document.querySelector("nav");
    c.classList.add("first");
});
function reload() {
    window.location.reload();
}