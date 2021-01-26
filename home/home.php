<?php
    session_start();

    if(isset($_COOKIE["user"])){
        $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
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

    $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore1 " . mysqli_connect_error());
    mysqli_set_charset($connection, 'utf8');

    $username = mysqli_real_escape_string($connection, $_SESSION["username"]);

    $query = ("select * from playlist where username = '$username'");

    $result = mysqli_query($connection, $query);

    if(mysqli_num_rows($result) == 0){
        $query = "insert into playlist (nome, preview_pic, username)
                    values('Nuova playlist', '/~aurelio/Homework1/src/blank_playlist.png', '$username')";
        mysqli_query($connection, $query) or die ("Errore2 " . mysqli_connect_error());
        header("Location: /~aurelio/Homework1/home/home.php");
    } 
?>


<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="home_script.js" defer></script>
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Poppins" rel="stylesheet">
    <link rel="icon" href="/src/favicon.png">
    <link rel="stylesheet" href="home_style.css">
    <title>Homepage</title>
</head>

<body>

    <header><img src="/~aurelio/Homework1/src/spotify2.png"></header>

    <nav>
        <ul>
            <li id = "user"><span><?php echo ( $_SESSION["username"]);?></span></li>
            <li><a class ="active" href="http://localhost/home/home.php">Home</a></li>
            <li><a href="/~aurelio/Homework1/search/search.php">Ricerca</a></li>
            <li><a href="/~aurelio/Homework1/logout/logout.php">Logout</a></li>
        </ul>
    </nav>

    <article>
        <section id = "playlists">
            <span id = "lemieplaylist">Le mie playlists</span>
        </section>

        <section id = "add_playlist">+</section>
    </article>

    <div id = "overlay" class = "hidden">
        <div id ="add" class = "overlay_div hidden">
            <p id = "p_add">Aggiungi una playlist: </p>
            <label>Nome playlist: <input type="text" id = "new_text" tabindex = "-1"></label>
            <label><button id = "add_but">Crea Playlist</button></label>
            <p id = "errAdd" class = "hidden">Per favore, inserire il nome della playlist</p>
        </div>
        <div id = "remove" class = "overlay_div hidden">
            <p>Vuoi davvero cancellare la playlist?</p>
            <label><button id = "si" value = "sì">Sì</button><button id = "no" value = "No">No</button></label>
        </div>
        <div id = "rename" class = "overlay_div hidden">
            <p>Rinomina playlist: </p>
            <label>Nuovo nome playlist: <input type="text" id = "rename_text"></label>
            <label><button id = "rename_but">Rinomina</button></label>
            <p id = "errRename" class = "hidden">Per vavore, inserire il nuovo nome della playlist</p>
        </div>
    </div>
</body>
</html>