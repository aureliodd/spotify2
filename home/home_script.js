function onResponseJson(promise){
    return promise.json();
}

function onResponseText(response){
    return response.text();
}

function hideOverlay(){
    document.removeEventListener("keypress",clickRename);
    document.removeEventListener("keypress",clickAdd);
    renameText.value = "";
    newText.value = "";
    errRename.classList.replace("show_block","hidden");
    errAdd.classList.replace("show_block","hidden");
    add.classList.replace("show_block","hidden");
    document.querySelector("#remove").classList.replace("show_block","hidden");
    rename.classList.replace("show_block","hidden");
    document.body.classList.remove("no-scroll");
    event.currentTarget.classList.replace("show_flex", "hidden");
    event.currentTarget.querySelector(".overlay_div").classList.replace("show_flex","hidden");
    event.stopPropagation();
}

function showInfoSong(event){
    document.body.classList.add("no-scroll");
    let div = event.currentTarget.querySelector(".overlay_info");
    let info = event.currentTarget.querySelector(".overlay_div");
    div.classList.replace("hidden","show_flex");
    info.classList.replace("hidden","show_flex");
}

function hideSongs(event){
    let div = event.target.parentNode.parentNode.parentNode;
    let separator = div.querySelector(".separator");
    let divSongs = div.querySelector(".div_songs");
    separator.classList.replace("show_block","hidden");
    divSongs.classList.replace("show_flex","hidden");

    let name = div.querySelector(".nome_playlist");
    let image = div.querySelector(".preview_pic");
    name.removeEventListener('click', hideSongs);
    image.removeEventListener('click', hideSongs);
    name.addEventListener('click', showSongs);
    image.addEventListener('click', showSongs);
}

function addPlaylist(){
    if(newText.value !== ""){
        let add = document.querySelector("input");
        let form = new FormData();;
        form.append("playlist",add.value);
        fetch("/~aurelio/Homework1/home/addPlaylist.php",{method: 'post', body:form})
        .then(onResponseText)
        .then(function(text){
            document.location.reload(true);
        });
    } else {
        errAdd.classList.replace("hidden","show_block");
        event.preventDefault();
    }
}

function playlistRename(){
    if(renameText.value !== ""){
        let form = new FormData();
        form.append("playlist",event.target.value);
        form.append("new_name",rename.querySelector("#rename_text").value);

        fetch("/~aurelio/Homework1/home/renamePlaylist.php",{method:'post', body:form})
        .then(onResponseText)
        .then(function(text){
            if(text === "1")   
                document.location.reload(true);
        });
    } else {
        errRename.classList.replace("hidden", "show_block");
        event.preventDefault();
    }
}

function deleteSong(event){
    let form = new FormData();
    form.append("song_id",event.target.dataset.songId);
    form.append("playlist", event.target.dataset.playlistId);
    fetch("/~aurelio/Homework1/home/removeSong.php", {method: 'post', body:form})
    .then(onResponseText)
    .then(function(text){
        if(text == "1") 
            document.location.reload(true);
        else{
            let toHide = document.querySelector(".div_song[data-song-id='" + event.target.dataset.songId + "']");
            toHide.classList.add("hidden");
        }
    });
}

function clickAdd(e){
    if(e.keyCode === 13)
        buttonAdd.click();
}

function clickRename(e){
    if(e.keyCode === 13)
        buttonRename.click();
}

function clickDelete(e){
    if(e.keyCode === 13)
        yesBtn.click();
}

function overlay_add(){
    document.body.classList.add("no-scroll");
    add.addEventListener('click', event => event.stopPropagation());
    overlay.addEventListener('click', hideOverlay);

    overlay.classList.replace('hidden', 'show_flex');
    add.classList.replace('hidden', 'show_block');

    buttonAdd.addEventListener('click', addPlaylist);
    document.addEventListener("keypress", clickAdd);
}

function overlay_rename(){
    overlay.classList.replace("hidden","show_flex");
    rename.classList.replace("hidden","show_block");

    renameText.value = event.target.dataset.nome;

    buttonRename.value = event.target.dataset.playlist;
    buttonRename.addEventListener("click", playlistRename);

    rename.addEventListener("click", event => event.stopPropagation());
    overlay.addEventListener('click', hideOverlay);

    document.addEventListener("keypress", clickRename);

    event.stopPropagation();
}

function overlay_delete(event){
    document.body.classList.add("no-scroll");

    overlay.addEventListener('click', hideOverlay);
    rename.addEventListener('click', event => event.stopPropagation());
    
    const remove = document.querySelector("#remove");
    remove.addEventListener('click', event => event.stopPropagation());
    overlay.classList.replace('hidden', 'show_flex');
    remove.classList.replace('hidden', 'show_block');
    event.stopPropagation();

    yesBtn.addEventListener('click', function(){
        let form = new FormData();
        form.append("playlist_id", event.target.dataset.playlistId);
        fetch("/~aurelio/Homework1/home/deletePlaylist.php", {method: 'post', body:form})
        .then(onResponseText)
        .then(function(text){
            if(text > 0)
                document.location.reload(true);
        });
    });
    noBtn.addEventListener('click', function hide(){
        document.body.classList.remove("no-scroll");
        remove.classList.replace("show_block","hidden");
        overlay.classList.replace("show_flex","hidden");
    });
    document.addEventListener("keypress", clickDelete);
}

function showSongs(event){
    let form = new FormData();
    form.append("playlist", event.target.dataset.playlistId);
    fetch("/~aurelio/Homework1/home/showPlaylist.php", {method: 'post', body:form})
    .then(onResponseJson)
    .then(function(json){
        let divPlaylistSongs = document.querySelector(".div_playlist_songs[data-n='"+ event.target.dataset.n +"']");
        
        let divSongs = divPlaylistSongs.querySelector(".div_songs");
        divSongs.classList.replace('hidden','show_flex');

        while(divSongs.firstChild)
            divSongs.removeChild(divSongs.firstChild);

        let songName = divPlaylistSongs.querySelector(".nome_playlist");
        let songImage = divPlaylistSongs.querySelector(".preview_pic");
        songName.removeEventListener('click', showSongs);
        songImage.removeEventListener('click', showSongs);
        songName.addEventListener('click', hideSongs);
        songImage.addEventListener('click', hideSongs);

        divPlaylistSongs.querySelector(".separator").classList.replace("hidden","show_block");
    
        if(json.length !== 0)
            for(item of json){
    
                let divSong = document.createElement("div");
                divSong.classList.add("div_song")
                divSong.dataset.songId = item.id;
                divSong.dataset.playlistId = event.target.dataset.playlistId;
                
                let infoCanzoni = {
                    titolo : item.titolo,
                    songImage : item.immagine,
                    album : item.album,
                    artists : item.artisti,
                    duration : item.durata,
                    link : item.link,
                    id : item.id,
                    preview : item.preview
                }

                playlists[event.target.dataset.n].songs[json.indexOf(item)] = infoCanzoni;
    
                let songImage = document.createElement("img");
                songImage.src =  infoCanzoni.songImage;
                let songName = document.createElement("div");
                songName.innerHTML = infoCanzoni.titolo;
                songName.classList.add("song_name");
    
                divSong.appendChild(songImage);
                divSong.appendChild(songName);
    
                let songImageOverlay = document.createElement("img");
                let songNameOverlay = document.createElement("p");
                songNameOverlay.classList.add("songOverlay");
                let songArtistsOverlay = document.createElement("p");
                let songAlbumOverlay = document.createElement("p");
                let songIdOverlay = document.createElement("p");
                let linkSpotifyOverlay = document.createElement("a");
                let songDurationOverlay = document.createElement("p");
                let songPreviewOverlay = document.createElement("div");
                let songDeleteOverlay = document.createElement("p");
    
                songIdOverlay.classList.add("idOverlay");
    
                songImageOverlay.src = infoCanzoni.songImage;
                songNameOverlay.innerHTML = infoCanzoni.titolo;
                songArtistsOverlay.innerHTML = "<b>Artisti</b>: " + infoCanzoni.artists;
                songAlbumOverlay.innerHTML = "<b>Album</b>: " + infoCanzoni.album;
                songIdOverlay.innerHTML = "<b>ID: </b>"+ infoCanzoni.id;
                linkSpotifyOverlay.innerHTML = "Ascolta su spotify";
                linkSpotifyOverlay.href = infoCanzoni.link;
                linkSpotifyOverlay.target ="_blank";
                songDurationOverlay.innerHTML = "<b>durata: </b>" +  infoCanzoni.duration;
                songDeleteOverlay.innerHTML = "Elimina dalla playlist";
                songDeleteOverlay.classList.add("songDelete");
                songDeleteOverlay.dataset.songId = item.id;
                songDeleteOverlay.dataset.playlistId = event.target.dataset.playlistId;
                songDeleteOverlay.addEventListener("click", deleteSong);
                if(infoCanzoni.preview !== "null"){
                        let player = document.createElement("audio");
                        player.src = infoCanzoni.preview;
                        player.controls = true;
                        player.classList.add("song_preview");
                        songPreviewOverlay.appendChild(player);
                } else {
                    songPreviewOverlay.innerHTML = "Non disponibile";
                    songPreviewOverlay.classList.add("not_avaliable");
                }
    
                let divOvelray = document.createElement("div");
                divOvelray.addEventListener('click',hideOverlay)
                divOvelray.classList.add("hidden");
                divOvelray.classList.add("overlay_info");
    
                let divShow = document.createElement("div");
                divShow.classList.add("hidden","overlay_div");
    
    
                let divInfo = document.createElement("div");
                divInfo.classList.add("info_delete_song");
    
                let divPicture = document.createElement("div");
                divPicture.appendChild(songImageOverlay);
                divShow.appendChild(divPicture);
    
                divInfo.appendChild(songNameOverlay);
                divInfo.appendChild(songArtistsOverlay);
                divInfo.appendChild(songAlbumOverlay);
                divInfo.appendChild(songIdOverlay);
                divInfo.appendChild(songIdOverlay);
                divInfo.appendChild(songDurationOverlay);
                divInfo.appendChild(songPreviewOverlay);
                divInfo.appendChild(linkSpotifyOverlay);
                divInfo.appendChild(songDeleteOverlay);
                
                divShow.appendChild(divInfo);
                divShow.addEventListener("click", event => event.stopPropagation());
    
                divOvelray.appendChild(divShow);
                
                divSong.appendChild(divOvelray);
    
                divSongs.appendChild(divSong);
    
                divSong.addEventListener("click", showInfoSong);
            } else {
                let p = document.createElement("p");
                p.classList.add("nessuna_canzone");
                p.innerHTML = "Nessuna canzone...";
                p.style.marginLeft = "10px";
                divSongs.appendChild(p);
            }
    });
}

function loadPlaylists(){
    fetch("/~aurelio/Homework1/home/getPlaylists.php",{method: 'post'})
    .then(onResponseJson)
    .then(function(json){
        for(element of json){
            let playlist = {
                id : element.id,
                nome : element.nome,
                preview_pic : element.preview_pic,
                songs : []
            }

            playlists[json.indexOf(element)] = playlist;
            
            let divPlaylistSongs = document.createElement("div");
            divPlaylistSongs.classList.add("div_playlist_songs");
            divPlaylistSongs.dataset.n = json.indexOf(element);
            divPlaylistSongs.dataset.playlistId = playlist.id;

            let divPlaylist = document.createElement("div");
            divPlaylist.classList.add("div_playlist");

            //preview pic
            let divPreviewPic = document.createElement("div");
            divPreviewPic.classList.add("preview_pic");
            divPreviewPic.addEventListener("click", showSongs);
            let previewPic = document.createElement("img");
            previewPic.src = playlist.preview_pic;
            previewPic.dataset.playlistId = playlist.id;
            previewPic.dataset.n = json.indexOf(element);
            divPreviewPic.appendChild(previewPic);
            //

            //info and delete
            let infoDelete = document.createElement("div");
            infoDelete.classList.add("info_delete");
            let pNomePlaylist = document.createElement("p");
            pNomePlaylist.classList.add("nome_playlist");
            pNomePlaylist.innerHTML = playlist.nome + " ";
            pNomePlaylist.dataset.playlistId = playlist.id;
            pNomePlaylist.addEventListener("click",showSongs);
            pNomePlaylist.dataset.playlistId = playlist.id;
            pNomePlaylist.dataset.n = json.indexOf(element);
            let imgModifica = document.createElement("img");
            imgModifica.classList.add("modify");
            imgModifica.src = "/~aurelio/Homework1/src/modify.png";
            imgModifica.dataset.playlist = playlist.id;
            imgModifica.dataset.nome = playlist.nome;
            imgModifica.addEventListener("click", overlay_rename);
            let divRecycleBin = document.createElement("div");
            divRecycleBin.classList.add("recycle-bin_div")
            const imgRecycleBin = document.createElement("img");
            imgRecycleBin.classList.add("recycle-bin");
            imgRecycleBin.src = "/~aurelio/Homework1//src/bin.png";
            imgRecycleBin.addEventListener('click', overlay_delete);
            imgRecycleBin.dataset.playlistId = playlist.id;
            divRecycleBin.appendChild(imgRecycleBin);
            pNomePlaylist.appendChild(imgModifica);
            infoDelete.appendChild(pNomePlaylist);
            infoDelete.appendChild(divRecycleBin);
            //
            
            divPlaylist.appendChild(divPreviewPic);
            divPlaylist.appendChild(infoDelete);

            //separator
            let separator = document.createElement("div");
            separator.classList.add("separator","hidden");
            //
            
            //songs
            let divSongs = document.createElement("div");
            divSongs.classList.add("div_songs","hidden");
            //

            divPlaylistSongs.appendChild(divPlaylist);
            divPlaylistSongs.appendChild(separator);
            divPlaylistSongs.appendChild(divSongs);

            leMiePlaylist.appendChild(divPlaylistSongs);
        }
    });
}

const leMiePlaylist = document.querySelector("#playlists");
const playlists = [];


//overlay
const overlay = document.querySelector("#overlay");

const add_playlist = document.querySelector("#add_playlist");
const add = document.querySelector("#add");
const buttonAdd = document.querySelector("#add_but");
add_playlist.addEventListener('click', overlay_add);


const rename = document.querySelector("#rename");
const buttonRename = document.querySelector("#rename_but");
const errRename = document.querySelector("#errRename");
const renameText = document.querySelector("#rename_text");

const errAdd = document.querySelector("#errAdd");
const newText = document.querySelector("#new_text");

const yesBtn = document.querySelector("#si");
const noBtn = document.querySelector("#no");

loadPlaylists();