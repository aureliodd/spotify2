<?php
    session_start();
    if(isset($_SESSION["username"])
       &&isset($_POST["playlist"])
       &&isset($_POST["img"])
       &&isset($_POST["id"])
       &&isset($_POST["titolo"])
       &&isset($_POST["album"])
       &&isset($_POST["artisti"])
       &&isset($_POST["durata"])
       &&isset($_POST["link"])
       &&isset($_POST["preview"])){
           
        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $username = mysqli_real_escape_string($connection, $_SESSION["username"]);
        $img = mysqli_real_escape_string($connection, $_POST["img"]);
        $playlist = mysqli_real_escape_string($connection, $_POST["playlist"]);
        $id = mysqli_real_escape_string($connection, $_POST["id"]);
        $titolo = mysqli_real_escape_string($connection, $_POST["titolo"]);
        $album = mysqli_real_escape_string($connection, $_POST["album"]);
        $artisti = mysqli_real_escape_string($connection,$_POST["artisti"]);
        $durata = mysqli_real_escape_string($connection, $_POST["durata"]);
        $link = mysqli_real_escape_string($connection, $_POST["link"]);
        $preview = mysqli_real_escape_string($connection, $_POST["preview"]);

        $query = "select * from canzone where id = '$id'";
        $result = mysqli_query($connection, $query) or die ("Errore " . mysqli_error($result));

        if(mysqli_num_rows($result) > 0){

            $query = "select * from playlistcanzone join playlist on playlistcanzone.id_playlist = playlist.id
                      where playlistcanzone.id_playlist = '$playlist' and playlistcanzone.id_canzone = '$id'";
                      
            $result = mysqli_query($connection, $query) or die ("Errore " . mysqli_error($result));
            
            if(mysqli_num_rows($result) > 0)
                echo(0);
            
            else{
                $query = "insert into playlistcanzone (id_playlist, id_canzone)
                          values ('$playlist','$id')";
                        
                $query2= "update playlist
                          set preview_pic = '$img' where id = '$playlist'";
                
                mysqli_query($connection, $query) or die ("Errore " . mysqli_error($result));
                mysqli_query($connection, $query2) or die ("Errore " . mysqli_error($result));
                echo(1);
            }

        } else {

            $query = "insert into canzone (id, album, immagine, titolo, artisti, durata, preview, link)
                    values ('$id','$album','$img','$titolo','$artisti','$durata','$preview','$link')";

            mysqli_query($connection, $query) or die ("Errore " . mysqli_error($connection));

            $query = "insert into playlistcanzone (id_playlist, id_canzone)
                      values ('$playlist','$id')";
                    
            $query2 = "update playlist
                      set preview_pic = '$img' where id = '$playlist'";

            mysqli_query($connection, $query) or die ("Errore " . mysqli_error($result));
            mysqli_query($connection, $query2) or die ("Errore " . mysqli_rror($result));

            echo(2);
        }

        mysqli_free_result($result);
        mysqli_close($connection);
        exit;
    }
?>