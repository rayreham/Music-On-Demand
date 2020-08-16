 let searchedItems = document.querySelector('.searchItems')
 let searchBttn = document.querySelector('.searchButton')

 searchBttn.addEventListener('click', searchNow)

 function searchNow() {
   event.preventDefault();
   let searchBara = document.querySelector('.searchBar')
   let keyWords = searchBara.value


   let appleSearchURL = 'https://itunes.apple.com/search?term=' + keyWords;
   let audio = document.querySelector('.audio')
   let results = document.querySelector('.results')
   let eachSearchItem = ''

   fetch(appleSearchURL)
     .then(
       function(response) {
         if (response.status !== 200) {
           console.log("Error Retrieving information", response.status);
           return
         }

         response.json().then(function(data) {
             for (var i = 0; i < data.results.length; i++) {
               let div = document.createElement('div');
               div.classList.add(`result${i}`)
               eachSearchItem +=
                 `<div class="resultBox" id=${i}>
             <img src="${data.results[i].artworkUrl100}" title="${data.results[i].previewUrl}">
             <p>${data.results[i].trackName}</p>
             <p>${data.results[i].artistName}<p/>
             </div>`
               results.innerHTML = eachSearchItem
             }
})

           .then(function(data) {
             results.addEventListener('keypress', function(e) {
               let audioPlayer = document.querySelector('audio')
               audioPlayer.src = e.target.title
           })

               results.addEventListener('click', function(e) {
                 let audioPlayer = document.querySelector('audio')
                 audioPlayer.src = e.target.title
             })
           })
       })
     .catch(function(err) {
       console.log('Fetch Error :-S', err);
     })

 }

