<?php
    session_start();

    if(isset($_COOKIE["user"])){
        $connection = mysqli_connect("localhost","root","","homework1") or die("Errore " . mysqli_connect_error());
        mysqli_set_charset($connection, 'utf8');

        $cookie = $_COOKIE["user"];
        $ipAddress = $_SERVER["REMOTE_ADDR"];
        $query = "select username
                  from cookie
                  where token = '$cookie' and indirizzo = '$ipAddress'";

        $result = mysqli_query($connection,$query) or die ("Errore " . mysqli_error($connection));

        $nome = mysqli_fetch_assoc($result);

        if(mysqli_num_rows($result) > 0)
            $_SESSION["username"] = $nome["username"];

        mysqli_free_result($result);
        mysqli_close($connection);
    }

    if(!isset($_SESSION["username"])){
        header("Location: /~aurelio/Homework1/login/login.php");
        exit;
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins" rel="stylesheet">
    <link rel="stylesheet" href="search_style.css">
    <link rel="icon" href="/src/favicon.png">
    <script src="search_script.js" defer></script>
    <title>Ricerca</title>
</head>

<body>
    
    <header><img src="/~aurelio/Homework1/src/spotify2.png" id = "banner-img"></header>

    <nav>
        <ul>
            <li id = "user"><span><?php echo ( $_SESSION["username"]);?></span></li>
            <li><a href="/~aurelio/Homework1/home/home.php">Home</a></li>
            <li><a class ="active" href="/~aurelio/Homework1/search/search.php">Ricerca</a></li>
            <li><a href="/~aurelio/Homework1/logout/logout.php">Logout</a></li>
        </ul>
    </nav>

    <article>
        <span id = "lemieplaylist">Cerca</span>
        <section id = "search">
            <input type="text" name="" id="text_to_search" placeholder="Inserisci la traccia da cercare">
            <button id = "search-button">Cerca</button>
        </section>

        <section id = "resultSection" class = "hidden">

        </section>

    </article>
    <div id = "overlay" class = "hidden">
        <div id = "add_overlay" class = "overlay_div hidden">
                <p>Vuoi davvero cancellare la playlist?</p>
            </div>
    </div>
</body>
</html>