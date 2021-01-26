<?php
    session_start();

    if(isset($_SESSION["username"]) && isset($_POST["playlist"])){

        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $username = mysqli_real_escape_string($connection, $_SESSION["username"]);
        $playlist = mysqli_real_escape_string($connection, $_POST["playlist"]);

        $query = ("insert into playlist (nome, preview_pic, username) values 
        ('$playlist','/~aurelio/Homework1/src/blank_playlist.png','$username')");

        mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

        mysqli_close($connection);
        exit;
    }
?>