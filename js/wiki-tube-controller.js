'use strict'

console.log('%ccontroller', 'background:black; color:white');

function onInit() {
    onRenderCards('eddie vedder')
    onRenderInfo('eddie vedder')
}

function onRenderCards(searchInput) {
    getYoutubeRes(searchInput)
        .then(renderCards)
}

function onRenderInfo(searchInput) {
    getdWikiInfo(searchInput)
        .then(renderInfo)
}

function onSearch(ev) {
    ev.preventDefault();
    const elInput = document.querySelector('input[name=search-input]');
    var searchInput = elInput.value;
    elInput.value = ''
    if (!searchInput || searchInput === ' ') return

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

function onChangeColor(color) {
    document.body.style.backgroundColor = color;
}
