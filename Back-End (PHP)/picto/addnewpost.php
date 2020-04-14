<?php

include("dbconnect.php");

function full_decode($str){
    return str_replace(" ","+",$str);
}
date_default_timezone_set('Asia/Kolkata'); 

if(isset($_POST['response'])){
    $data = json_decode($_POST['data'],true);
    $user_id = $data['user_id'];
    $post_title = $data['title'];
    $post_caption = $data['caption'];
    $img_src = full_decode(urldecode($data['src']));
    $post_date = date("Y-m-d G:i:s");

    $stmt = $conn->prepare("INSERT into post_list (title, user_id, post_date, pic_src, caption) values (?, ?, ?, ?, ?)");
    $stmt->bind_param("sisss",$post_title, $user_id, $post_date, $img_src, $post_caption);
    $stmt->execute();

    echo "done";


}




?>