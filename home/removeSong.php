<?php
    session_start();
    if(isset($_SESSION["username"])&& isset($_POST["playlist"]) && isset($_POST["song_id"])){

        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $playlist = mysqli_real_escape_string($connection,  $_POST["playlist"]);
        $songId = mysqli_real_escape_string($connection, $_POST["song_id"]);

       
        
        //elimino l'associazione
        $query = "delete playlistcanzone
                  from playlistcanzone
                  where playlistcanzone.id_canzone = '$songId' and playlistcanzone.id_playlist = '$playlist'";
                
        mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));
        
        //elimino la canzone se non ha associazioni
        $query = "delete from canzone
                    where id not in (select id_canzone  
                                      from playlistcanzone)";

        mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));
   
        //controllo se la playlist ha canzoni, se non ne ha resetto l'immagine di preview
        $query = "select *
                  from playlistcanzone
                  where id_playlist = '$playlist'";
                  
        $result = mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

        if(mysqli_num_rows($result) == 0){
            $query = "update playlist 
            set preview_pic = '/~aurelio/Homework1/src/blank_playlist.png'
            where id = '$playlist'";
            mysqli_query($connection, $query) or die ("Errore:" . mysqli_error($connection));
            echo(1);
        } else {
            //se ha ancora canzoni, controllo se preview_pic = immagine ed eventualmente sostituisco l'immagine di preview
            $query = "select * 
                  from canzone join playlistcanzone on canzone.id = id_canzone  join playlist on id_playlist = playlist.id 
                  where playlist.id = '$playlist' and playlist.preview_pic = canzone.immagine";
                      
            $result = mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

            if(mysqli_num_rows($result) == 0){
                $query = "update playlist
                          set preview_pic = (select * from(select canzone.immagine
                                                           from canzone join playlistcanzone on canzone.id = playlistcanzone.id_canzone 
                                                           join playlist on playlistcanzone.id_playlist = playlist.id
                                                           where playlist.id = '$playlist'
                                                           limit 1) 
                                             as d)
                            where playlist.id = '$playlist'";
                                                    
                $result = mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));
                echo(1);
            }
        }
        mysqli_close($connection);
        exit;
    }
?>