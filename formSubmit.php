<?php
    $userMail;
    $userFeedback;
    if(isset($_POST['userFeedback']) and isset($_POST['mail'])){
        $userFeedback = $_POST['userFeedback'];
        $userMail = $_POST['mail'];
    }
    else
        exit('Input fields not set');

    $conn = mysqli_connect('localhost','root', '', 'testdb') or die('Unable to connect');
    $sql = "insert into iwp_project values ('. $userMail .','. $userFeedback.')";
    $query = mysqli_query($conn, $sql);
    echo '1';
    mysqli_close($conn);
?>