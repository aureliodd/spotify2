<?php
    session_start();
    
    $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
    mysqli_set_charset($connection, 'utf8');

    $username = mysqli_real_escape_string($connection, $_SESSION["username"]);
    $query = "select * from playlist where username = '$username'";
    
    $playlists = array();

    $result = mysqli_query($connection, $query) or die ("Errore " . mysqli_error($connection));

    while($row = mysqli_fetch_assoc($result))
        $playlists[] = $row;

    mysqli_free_result($result);
    mysqli_close($connection);

    echo json_encode($playlists);
    exit;
?>