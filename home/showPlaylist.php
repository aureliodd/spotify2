<?php
    session_start();
    if(isset($_SESSION["username"]) && isset($_POST["playlist"])){

        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $playlist = mysqli_real_escape_string($connection, $_POST["playlist"]);

        $query = "select canzone.*
                  from canzone join playlistcanzone on canzone.id = playlistcanzone.id_canzone
                  where playlistcanzone.id_playlist = '$playlist'";
                  
        $songs = array();

        $result = mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

        while($row = mysqli_fetch_assoc($result))
            $songs[] = $row;
        
        mysqli_free_result($result);
        mysqli_close($connection);
    
        echo json_encode($songs);
        exit;
    }
?>