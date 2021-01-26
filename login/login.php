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

    if(isset($_POST["username"]) && isset($_POST["password"])){
        if(!empty($_POST["username"]) && !empty($_POST["password"])){

            $connection = mysqli_connect("127.0.0.1","root","qwertyuiop","homework1") or die("Errore " . mysqli_connect_error());
            mysqli_set_charset($connection, 'utf8');
    
            $username = mysqli_real_escape_string($connection, $_POST["username"]);
            $password = mysqli_real_escape_string($connection, $_POST["password"]);
    
            $query = "select * 
                    from utente 
                    where username = '$username' and password = '$password'";
                    
            $result = mysqli_query($connection,$query) or die ("Errore: " . mysqli_error($connection));


            if(mysqli_num_rows($result) > 0){
                $_SESSION["username"] = $username;
                if(isset($_POST["ricordami"])){
                    $ipAddress = $_SERVER["REMOTE_ADDR"]; //::1 è 127.0.0.1
                    $token = md5(uniqid($_POST["username"], true));
                    $query = "insert into cookie(username, token, indirizzo)
                              values('$username','$token', '$ipAddress')";
                    
                    mysqli_query($connection,$query) or die ("Errore: " . mysqli_error($connection));
                    setcookie('user', $token, time() + (86400 * 7), "/"); // "/" perché voglio che il cookie sia settato sututto il dominio (inoltre, la directory non ha sottocartelle) 
                }
                mysqli_close($connection);
                header("Location: /~aurelio/Homework1/home/home.php");
                exit;
            } else 
                $errore = "Nome utente o username errati";
        }
    }
?>

<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src='login_script.js' defer></script>
    <link href="https://fonts.googleapis.com/css?family=Montserrat|Rubik" rel="stylesheet">
    <link rel="stylesheet" href="login_style.css">
    <link rel="icon" href="/src/favicon.png">
    <title>Login</title>
</head>



<body>
    <header><img src="/~aurelio/Homework1/src/spotify2.png"></header>
    <main>
        <span id = "titolo">Login</span>
        <div id = "login">
            <form name="login-form" method="post">
                <input type="text" name="username" placeholder="username" class = "credentials initial">
                <input type="password" name="password" placeholder="password" class = "credentials initial">
                
                <input type="submit" id = "submit">
                
                <div id = "remember_me">
                <label ><input type="checkbox" name="ricordami" value="ricordami">Ricordami</label>
                </div>
                <div id = "problems"  class = "hidden problems">
                    <ul>
                    </ul>
                </div>
                <?php
                        if (isset($errore))
                            echo("<div id = 'wrongcredentials' class = 'problems'>$errore</div>");

                    ?>
            </form>
            
        </div>
        <div id = "signup">
            Non sei ancora registrato? <a href="/~aurelio/Homework1/signup.php">Registrati adesso</a>
        </div>
    </main>
    
</body>
</html>