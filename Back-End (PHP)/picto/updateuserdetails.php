<?php

include("dbconnect.php");

function full_decode($str){
    return str_replace(" ","+",$str);
}

if(isset($_POST['response'])){
    $data = json_decode($_POST['data'],true);
    $user_id = $data['user_id'];
    $new_username = $data['username'];
    $new_email_id = $data['email_id'];
    $new_caption = $data['caption'];
    $new_pic_src = full_decode(urldecode($data['pic_src']));

    $stmt = $conn->prepare("UPDATE users SET username = ?, email_id = ?, profile_pic = ?, caption = ? where id = ?");
    $stmt->bind_param("sssss",$new_username, $new_email_id, $new_pic_src, $new_caption, $user_id);
    $stmt->execute();

    echo "done";

}


?>