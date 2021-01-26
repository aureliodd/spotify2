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

    if(isset($_SESSION["username"])){
        header("Location: /~aurelio/Homework1/home/home.php");
        exit;
    }

    if(isset($_POST["username"]) && isset($_POST["nome"]) && isset($_POST["cognome"])
            && isset($_POST["email"]) && isset($_POST["telefono"]) && isset($_POST["genere"])
            && isset($_POST["password"]) &&isset($_POST["confermap"])){

        if(!empty($_POST["username"]) && !empty($_POST["nome"]) && !empty($_POST["cognome"]) 
            && !empty($_POST["email"]) && !empty($_POST["telefono"]) && !empty($_POST["genere"])
            && !empty($_POST["password"]) && !empty($_POST["confermap"])){

            if(strpos($_POST["email"],"@") !== false && strpos($_POST["email"],".") !== false
                && ctype_digit($_POST["telefono"])
                && ($_POST["password"] === $_POST["confermap"])){

                $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
                mysqli_set_charset($connection, 'utf8');

                $username = mysqli_real_escape_string($connection, $_POST["username"]);
                $nome = mysqli_real_escape_string($connection, $_POST["nome"]);
                $cognome = mysqli_real_escape_string($connection, $_POST["cognome"]);
                $email = mysqli_real_escape_string($connection, $_POST["email"]);
                $telefono = mysqli_real_escape_string($connection, $_POST["telefono"]);
                $genere = mysqli_real_escape_string($connection, $_POST["genere"]);
                $password = mysqli_real_escape_string($connection, $_POST["password"]);

                $query = "insert into utente (username,nome,cognome,email,telefono,genere,password) values 
                            ('$username','$nome','$cognome','$email','$telefono','$genere','$password')";
                
                mysqli_query($connection, $query) or die ("Errore " . mysqli_error($connection));

                mysqli_close($connection);

                $_SESSION["username"] = $_POST["username"];
                header("Location: /~aurelio/Homework1/home/home.php");
                exit;
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src='signup_script.js' defer></script>
    <link rel="icon" href="src/favicon.png">
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Rubik" rel="stylesheet">
    <link rel="stylesheet" href="signup_style.css">
    <title>Registrazione</title>
</head>

<body>
    
    <header><img src="src/spotify2.png"></header>
    <main>
        <span id = "titolo">Registrazione</span>
        <div id = "signup">
        <form name="signup-form" method="post">
            <label><span>Username: <img></span> <input type="text" name="username" id="username" class = "credenziali initial"></label>
            <label>Nome: <input type="text" name="nome" class = "credenziali initial"></label>
            <label>Cognome: <input type="text" name="cognome" class = "credenziali initial"></label>
            <label>E-mail: <input type="text" name="email" class = "credenziali initial"></label>
            <label>Telefono: <input type="text" name="telefono" class = "credenziali initial"></label>
            <label>Genere:
                <select name="genere" id ="select" class = "credenziali initial">
                    <option value="seleziona" disabled selected>Seleziona</option>
                    <option value="maschile">M</option>
                    <option value="femminile">F</option>
                    <option value="altro">altro</option>
                </select>
            </label> 
            <label>Password: <input type="password" name="password" class = "credenziali initial"></label>
            <label>Conferma password: <input type="password" name="confermap" class = "credenziali initial"></label>
            <label>&nbsp;<input type="submit" value="Registrati" id = "send"></label>
            <div id = "problems"  class = "hidden"><ul></ul></div>
        </form>
        </div>
        <div id = "login">
            Sei già registrato?<a href="/~aurelio/Homework1/login/login.php"> Login</a>
        </div>
    </main>
</div>
</body>
</html>