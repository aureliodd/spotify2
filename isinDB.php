<?php
        if(isset($_POST["username"]) && !empty($_POST["username"])){
        
            $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
            mysqli_set_charset($connection, 'utf8');

            $username = mysqli_real_escape_string($connection, $_POST["username"]);
            $query = "select * from utente where username = '$username'";

            $result = mysqli_query($connection, $query) or die ("Errore " . mysqli_connection_error());

            if(mysqli_num_rows($result) > 0)
                echo("1");
            else
                echo("0");
            }
            
            mysqli_free_result($result);
            mysqli_close($connection);
            exit;
    
?>