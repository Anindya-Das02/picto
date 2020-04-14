<?php

include("dbconnect.php");

if(isset($_GET['response'])){
    $user_id = $_GET['user_id'];
    $stmt = $conn->prepare("SELECT * from users where id = ?");
    $stmt->bind_param("i",$user_id);
    $stmt->execute();

    $user_details_array = array();

    $result = $stmt->get_result();
    if($result->num_rows != 0){
        $row = $result->fetch_assoc();
        $user_details_array =  array_merge($user_details_array,array(
            "username" => $row['username'],
            "pic_src" => $row['profile_pic'],
            "email_id" => $row['email_id'],
            "caption" => $row['caption']
        ));
        echo json_encode($user_details_array);
    }
     
}

?>