<?php
    session_start();
    if(isset($_SESSION["username"]) && isset($_POST["playlist_id"])){

        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $playlist = mysqli_real_escape_string($connection, $_POST["playlist_id"]);

        $query = "delete
                  from playlist
                  where playlist.id = '$playlist'";
                  
        mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

        $query = "delete from canzone
                  where id not in (select id_canzone  
                                   from playlistcanzone)";

        mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));
        echo(1);
        mysqli_close($connection);
        exit;
    }
?>