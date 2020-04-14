<?php

include("dbconnect.php");

if(isset($_GET['status'])){
    $stmt = $conn->prepare("SELECT * from users where id = ?");
    $stmt->bind_param("i",$_GET['user_id']);
    $stmt->execute();

    $result = $stmt->get_result();
    $profile_data = array();

    if($result->num_rows != 0){
        $row = $result->fetch_assoc();
        array_push($profile_data,array(
            "id" => $row['id'],
            "username" => $row['username'],
            "profile_pic" => $row['profile_pic'],
            "caption" => $row['caption']
        ));

        $myposts = $conn->prepare("SELECT * from post_list where `user_id` = ? order by post_date desc");
        $myposts->bind_param("i",$_GET['user_id']);
        $myposts->execute();
        $myposts_result = $myposts->get_result();
        $post_list = array();
        if($myposts_result->num_rows != 0){
            while($prow = $myposts_result->fetch_assoc()){
                array_push($post_list,array(
                    "post_id" => $prow['post_id'],
                    "title" => $prow['title'],
                    "post_date" => explode(" ",$prow['post_date'])[0],
                    "pic_src" => $prow['pic_src'],
                    "caption" => $prow['caption'],
                    "likes" => $prow['likes']
                ));
            }
        }
        array_push($profile_data,$post_list);
    }
    
    echo json_encode($profile_data);
}

?>