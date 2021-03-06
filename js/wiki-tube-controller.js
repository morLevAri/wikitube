'use strict'

let lastSearch = 'Eddie Vedder';

console.log('%ccontroller', 'background:black; color:white');

function onInit() {
    onRenderCards('eddie vedder')
    onRenderInfo('eddie vedder')
}

function onRenderCards(searchInput) {
    getYoutubeRes(searchInput)
        .then(renderCards)
}

async function onRenderInfo(searchInput) {
    try {
        await getdWikiInfo(searchInput)
            .then(renderInfo)
    } catch (err) {
        console.log('Error is:', err);
    }
}

function onSearch(ev) {
    ev.preventDefault();
    const elInput = document.querySelector('input[name=search-input]');
    var searchInput = elInput.value;
    elInput.value = ''
    if (!searchInput || searchInput === ' ') return

    lastSearch = searchInput;
    renderLastSearch()

    getdWikiInfo(searchInput)
        .then(renderInfo)

    getYoutubeRes(searchInput)
        .then(renderCards)
}

function renderCards(datas) {
    // console.log('datas:', datas);
    renderVideo(datas[0].id.videoId)
    const strHTML = datas.map((data) =>
        `<li class="topic" onclick="renderVideo('${data.id.videoId}')" value="${data}">                
        <img src="${data.snippet.thumbnails.default.url}" alt="">
        <p>${data.snippet.title}</p>
        </li>`)
    document.querySelector('.videos-list').innerHTML = strHTML.join('');
}

function renderVideo(videoId) {
    const strHTML =
        `<iframe class="video-player" width="560" height="315" src="https://www.youtube.com/embed/${videoId}"
        title="YouTube video player" frameborder="1"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>`
    document.querySelector('.video-container').innerHTML = strHTML;
}

function renderInfo(infos) {
    // console.log('infos:', infos);
    const strHTMLtitle = `<h1>${infos[0].title}</h1>`
    document.querySelector('.wikipedia-container').innerHTML = strHTMLtitle;

    const strHTML = infos.map((info) =>
        `<div class="wiki-info">
        <a class="wiki-link" href="https://wikipedia.org/wiki/${info.title}"> <h3 class="wiki-title">${info.title}</h3></a>
        <p class="wiki-descriptions">${info.snippet}</p>
        </div>
        `
    )
    document.querySelector('.wikipedia-container').innerHTML += strHTML.join('');
}

function renderLastSearch() {
    const strHTML =
        `, ${lastSearch}`
    document.querySelector('.last-search').innerHTML += strHTML;
}

function onChangeTheme() {
    document.querySelector('.modal').style.visibility = 'visible';
}

function onChangeColor(color) {
    document.body.style.backgroundColor = color;
    closeModal()
}

function closeModal() {
    document.querySelector('.modal').style.visibility = 'hidden';
}

function onClearHistory() {
    clearHistory()
}
