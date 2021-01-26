<?php

    $client_id = ""; //da riempire
    $client_secret = ""; //da riempire

    if(isset($_POST["search"])){
    //richiedo il token
        $curl = curl_init();

        curl_setopt($curl, CURLOPT_URL,"https://accounts.spotify.com/api/token"); //setto url
        curl_setopt($curl, CURLOPT_POST, 1); //specifico post
        curl_setopt($curl, CURLOPT_POSTFIELDS, "grant_type=client_credentials"); //dati. se si scrive staccato dall'uguale non lo da valido.
        $headers = array("Authorization: Basic " . base64_encode($client_id . ":" . $client_secret)); //header aggiuntivo con codifica base64 della stringa "client_id_client_secret
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        curl_close($curl);

        //dati ricevuti
        $token = json_decode($result)->access_token;
        $data = http_build_query(array("q" => $_POST["search"], "type" => "track")); // q => nome da cercare
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, "https://api.spotify.com/v1/search?".$data);
        $headers = array("Authorization: Bearer ".$token);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        echo $result;
        curl_close($curl);
    }
?>