function songDuration(duration){
    let seconds = parseInt((duration/1000)%60);
    let minutes = parseInt((duration/(1000*60))%60);

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return  minutes + ":" + seconds
}

function onResponseJson(response){
    return response.json();
}

function onText(text){
    const overlay = document.querySelector("#overlay");
    const addOverlay = document.querySelector("#add_overlay");
    overlay.classList.replace("hidden","show_flex");
    
    switch (text){
        case "0":
            addOverlay.classList.replace("hidden","show_flex");
            addOverlay.innerHTML = "Canzone già esistente nella playlist.";
            setTimeout(function(){
                overlay.classList.replace("show_flex","hidden");
                addOverlay.classList.replace("show_flex","hidden");
            },1500);
            break;
        case "1":
            addOverlay.classList.replace("hidden","show_flex");
            addOverlay.innerHTML = "Canzone aggiunta alla playlist.";
            setTimeout(function(){
                overlay.classList.replace("show_flex","hidden");
                addOverlay.classList.replace("show_flex","hidden");
            },1500);
            break;
        case "2":
            addOverlay.classList.replace("hidden","show_flex");
            addOverlay.innerHTML = "Canzone aggiunta al database. Canzone aggiunta alla playlist.";
            setTimeout(function(){
                overlay.classList.replace("show_flex","hidden");
                addOverlay.classList.replace("show_flex","hidden");
            },1500);
            break;
            default:
            addOverlay.classList.replace("hidden","show_flex");
            addOverlay.innerHTML = "Errore di aggiunta: " + text;
            setTimeout(function(){
                overlay.classList.replace("show_flex","hidden");
                addOverlay.classList.replace("show_flex","hidden");
            },2000);
            break;
    }
}

function addToPlaylist(event){
    event.target.parentNode.classList.replace("visible","hidden");
    event.currentTarget.parentNode.parentNode.querySelector(".drop_button").removeEventListener("click",hidePlaylists);
    event.currentTarget.parentNode.parentNode.querySelector(".drop_button").addEventListener("click",showPlaylists);
    
    let i = event.target.dataset.song;
    let form = new FormData();
    form.append("playlist",event.target.value);
    form.append("img", results[i].songImg);
    form.append("id", results[i].id);
    form.append("titolo", results[i].songName);
    form.append("album", results[i].album);
    form.append("artisti", results[i].artists);
    form.append("durata", results[i].duration);
    form.append("link", results[i].link);
    form.append("preview", results[i].preview);


    fetch("/~aurelio/Homework1/search/add_to_playlist.php", {method: 'post', body:form})
    .then(function onResponseTxt(response){
        return response.text();
    })
    .then(onText);
}

function hidePlaylists(event){
    event.target.addEventListener('click',showPlaylists);
    event.target.removeEventListener('click',hidePlaylists);
    event.target.parentNode.querySelector(".dropped_div").classList.replace("visible","hidden");
}


function showPlaylists(event){
    event.target.removeEventListener('click',showPlaylists);
    event.target.addEventListener('click',hidePlaylists);

    fetch("/~aurelio/Homework1/search/my_playlists.php")
    .then(onResponseJson)
    .then(function onJsonPlaylists(json){
    
        let droppedDiv = document.createElement("div");
        droppedDiv.classList.add("dropped_div","visible");
        let divAdd = event.target.parentNode;
        let toRemove = divAdd.querySelectorAll(".dropped_div");
        divAdd.appendChild(droppedDiv);
    
        for(let remove of toRemove){
            divAdd.removeChild(remove);
        }
        
        for(let element of json){
            
            let droppedButton = document.createElement("button");
            droppedButton.classList.add("dropped_button");
    
            droppedButton.innerHTML = element.nome;
            droppedButton.value = element.id;
            droppedButton.dataset.song = event.target.dataset.song;
            droppedButton.addEventListener('click',addToPlaylist);
            droppedDiv.appendChild(droppedButton);
    
        }
     });
}


function onJsonResult(json){

    while(divResults.firstChild)
        divResults.removeChild(divResults.firstChild);

    if(json.tracks.items.length !== 0){

        divResults.classList.replace("hidden","show_flex");

        for(result of json.tracks.items){
        
            let divResult = document.createElement("div");
            divResult.classList.add("div_result");
            divResult.dataset.song = json.tracks.items.indexOf(result);

            let aux;

            for(let artist of result.artists){
                if(result.artists.indexOf(artist) === 0)
                    aux = artist.name;
                else
                    aux += ", " + artist.name; 
            }

            let infoCanzoni = {
                songImg : result.album.images[1].url, //[0] piccola; [1] media; [2] grande
                songName : result.name,
                album : result.album.name,
                artists : aux,
                duration : songDuration(result.duration_ms),
                link : result.external_urls.spotify,
                id : result.id,
                preview : result.preview_url
            }

            results[json.tracks.items.indexOf(result)] = infoCanzoni;                
            
            let img = document.createElement("img");
            let divSongName = document.createElement("div");

            let divArtists = document.createElement("div");
            divArtists.classList.add("infosong");
            divArtists.innerHTML = "<b>Artisti:</b>";
            let artists = document.createElement("span");

            let divAlbum = document.createElement("div");
            divAlbum.classList.add("infosong");
            divAlbum.innerHTML = "<b>album: </b>";
            let album = document.createElement("span");

            let divId = document.createElement("div");
            divId.classList.add("infosong");
            divId.innerHTML = "<b>Id: </b>";
            let id = document.createElement("span");

            let link = document.createElement("a");

            let divDurata = document.createElement("div");
            divDurata.classList.add("infosong");
            divDurata.innerHTML = "<b>Durata: </b>"
            let durata = document.createElement("span");

            let songPreview = document.createElement("div");

            img.classList.add("songImg");
            divSongName.classList.add("songName");
            artists.classList.add("artists");
            id.classList.add("songId");
            durata.classList.add("duration");
            album.classList.add("album");
            link.classList.add("linkSpotify");
            songPreview.classList.add("songPreview");

            
            img.src =  infoCanzoni.songImg;

            divSongName.innerHTML = infoCanzoni.songName;

            artists.innerHTML = aux;
            divArtists.appendChild(artists);

            id.innerHTML = infoCanzoni.id;
            divId.appendChild(id);

            link.innerHTML = "Ascolta su spotify";
            link.href = infoCanzoni.link;
            link.target ="_blank";

            durata.innerHTML = infoCanzoni.duration;
            divDurata.appendChild(durata);

            album.innerHTML = infoCanzoni.album;
            divAlbum.appendChild(album);

            if(infoCanzoni.preview !== null){
                    let player = document.createElement("audio");
                    player.src = infoCanzoni.preview;
                    player.controls = true;
                    player.classList.add("song_preview");
                    songPreview.appendChild(player);
                } else {
                    songPreview.innerHTML = "Non disponibile";
                    songPreview.classList.add("not_avaliable");
                }

                divResult.appendChild(img);
                divResult.appendChild(divSongName);
                divResult.appendChild(divArtists);
                divResult.appendChild(divAlbum);
                divResult.appendChild(divId);
                divResult.appendChild(divDurata);
                divResult.appendChild(songPreview);
                divResult.appendChild(link);
                divResults.appendChild(divResult);

                let divAdd = document.createElement("div");
                divAdd.classList.add("divadd");
                let dropDownButton = document.createElement("button");
                dropDownButton.dataset.song = json.tracks.items.indexOf(result);

                dropDownButton.classList.add("drop_button");
                dropDownButton.value = "Aggiungi";
                dropDownButton.innerHTML = "Aggiungi ad una playlist";
                dropDownButton.style.width = "100%";

                divAdd.appendChild(dropDownButton);
                divResult.appendChild(divAdd);

                dropDownButton.addEventListener('click', showPlaylists);
        } 
    } else {
        results = [];
        divResults.classList.replace("hidden","show_flex");
        divResults.innerHTML = "<span>Nessuna canzone trovata.</span>"
    }
}

function cercaContenuto(){
    if(textSearch.value !== ""){
        let form = new FormData();
        form.append("search",textSearch.value);
        fetch("/~aurelio/Homework1/search/do_search.php", {method: 'post', body:form}).then(onResponseJson).then(onJsonResult);
    } else {
        results = [];
        divResults.classList.replace("hidden","show_flex");
        divResults.innerHTML = "<span>Inserire un testo da cercare.</span>"
    }
}

let results = [];
const divResults = document.querySelector("#resultSection");

const textSearch = document.querySelector("input");
const ricerca = document.querySelector("button");
ricerca.addEventListener('click',cercaContenuto);
textSearch.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        ricerca.click();
    }
});
