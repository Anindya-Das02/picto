<?php

include("dbconnect.php");

if(isset($_POST['response'])){
    //echo urldecode($_POST['username'])."--". urldecode($_POST['password']);
    $hashed_pass = hash('sha256',urldecode($_POST['password']));
    $username = urldecode($_POST['username']);

    //echo $username. "---". $hashed_pass;
    if($_POST['type'] === 'email'){
        $stmt = $conn->prepare("SELECT * from users where email_id = ? and userpassword = ?");
    }
    else{
        $stmt = $conn->prepare("SELECT * from users where username = ? and userpassword = ?");
    }
    $stmt->bind_param("ss",$username,$hashed_pass);
    $stmt->execute();
    $result = $stmt->get_result();
    //print_r($result);
    if($result->num_rows > 0){
        $status = "user verified";
        while($row = $result->fetch_assoc()){
            $user_id = $row['id'];
            $username = $row['username'];
            break;
        }
        $data = array(
            "status" => $status,
            "user_id" => $user_id,
            "username" => $username
        );
        echo json_encode($data);
    }else{
        echo "unauthorized user";
    }

}


?>