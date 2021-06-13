'use strict'

const STORAGE_KEY = 'videosInfo'

function getYoutubeRes(searchInput) {
    const videosInfo = loadFromStorage(searchInput)
    if (videosInfo) return Promise.resolve(videosInfo)
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${mykey}&q=${searchInput}`;
    return axios.get(url)
        .then(res => res.data.items)
        .then(data => saveToStorage(searchInput, data))
}

function getdWikiInfo(searchInput) {
    return axios.get(`https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchInput}&format=json`)
        .then(res => res.data.query.search.splice(0, 5))
}

function clearHistory() {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            lastSearch = ''
            document.querySelector('.last-search').innerHTML = lastSearch;
            onInit()
        }
    })
}

