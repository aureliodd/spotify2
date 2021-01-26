<?php
    session_start();

    if(isset($_COOKIE["user"])){
        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $token = $_COOKIE["user"];

        $query = "delete from cookie where token = '$token'; ";
                
        $result = mysqli_query($connection,$query) or die ("Errore " . mysqli_error($connection));
        
        setcookie("user","",0,"/");
    }
    session_destroy();
    header("Location: /~aurelio/Homework1/login/login.php");
    exit;
?>