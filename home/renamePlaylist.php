<?php
session_start();
    if(isset($_SESSION["username"]) && isset($_POST["playlist"]) && isset($_POST["new_name"])){
        
        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');
    
        $playlist = mysqli_real_escape_string($connection, $_POST["playlist"]);
        $newName = mysqli_real_escape_string($connection, $_POST["new_name"]);

        $query = "update playlist
                  set nome = '$newName'
                  where id = '$playlist'";
        
        mysqli_query($connection,$query) or die ("Errore: " . mysqli_error($connection));
    
        mysqli_close($connection);

        echo(1);
        exit;
    }
?>