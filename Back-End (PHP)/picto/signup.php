<?php

include("dbconnect.php");

if(isset($_POST['response'])){
    $username = urldecode($_POST['username']);
    $email_id = urldecode($_POST['email_id']);
    $pass = $_POST['password'];
    $hashed_passord = hash('sha256',$pass);
    $pic = "https://cdn.discordapp.com/attachments/693725640683421707/697165895583400076/default_img.png";
    $doj = date("Y-m-d");

    $stmt = $conn->prepare("INSERT into users (username, userpassword, email_id, doj, profile_pic) values (?,?,?,?,?)");
    $stmt->bind_param("sssss",$username, $hashed_passord, $email_id, $doj, $pic);
    $stmt->execute();

    $get_id_stmt = $conn->prepare("SELECT * from users where username = ? and userpassword = ? and email_id = ?");
    $get_id_stmt->bind_param("sss",$username, $hashed_passord, $email_id);
    $get_id_stmt->execute();
    
    $result = $get_id_stmt->get_result();
    if($result->num_rows != 0){
        $row = $result->fetch_assoc();
        $user_id = $row['id'];
    }

    $response_data = array(
        "status" => "done",
        "user_id" => $user_id,
        "username" => $username
    );

    echo json_encode($response_data);
    
}

?>