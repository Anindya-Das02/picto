<?php

include("dbconnect.php");

if(isset($_POST['inc_like'])){
    $data = $_POST['data'];
    echo $data;

    $data = json_decode($data,true);
    
    $stmt2 = $conn->prepare("UPDATE post_list SET likes = ? where post_id = ?");
    $stmt2->bind_param("ii",$data['newLikes'],$data['post_id']);
    $stmt2->execute();

    $stmt = $conn->prepare("INSERT into like_list values (?,?,?)");
    $stmt->bind_param("iii",$data['post_id'],$data['posted_by'],$data['liked_by']);
    $stmt->execute();

    echo "done++";
}

else if(isset($_POST['dec_like'])){
    $data = $_POST['data'];
    echo $data;

    $data = json_decode($data,true);

    $stmt2 = $conn->prepare("UPDATE post_list SET likes = ? where post_id = ?");
    $stmt2->bind_param("ii",$data['newLikes'],$data['post_id']);
    $stmt2->execute();

    $stmt1 = $conn->prepare("DELETE from like_list where post_id = ? and liked_by = ?");
    $stmt1->bind_param("ii",$data['post_id'],$data['liked_by']);
    $stmt1->execute();

}

?>