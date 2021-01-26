<?php
    session_start();
    
    if(isset($_SESSION["username"])){

        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore1 " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $username = mysqli_real_escape_string($connection, $_SESSION["username"]);

        $query = ("select * from playlist where username = '$username'");
        $result = mysqli_query($connection, $query) or die ("Errore: " . mysqli_error($connection));

        $vett = array();
        
        while($row = mysqli_fetch_assoc($result))
            $vett[] = $row;

        mysqli_free_result($result);
        mysqli_close($connection);

        echo json_encode($vett);
        exit;
    }
?>