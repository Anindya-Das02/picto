<?php

include("dbconnect.php");


if($_GET['login_status']){
    $stmt = $conn->prepare("SELECT *, (CASE WHEN post_id in (SELECT like_list.post_id from like_list where like_list.liked_by = ?) THEN 1 else 0 end) as like_status from post_list ORDER BY post_date Desc");
    $stmt->bind_param("i",$_GET['uid']);
    $stmt->execute();
}
else{
    $stmt = $conn->prepare("SELECT *, (CASE WHEN post_id in (SELECT like_list.post_id from like_list where like_list.liked_by = -1) THEN 1 else 0 end) as like_status from post_list ORDER BY post_date Desc");
    $stmt->execute();
}


$result = $stmt->get_result();
$feed_array = array();

if($result->num_rows != 0){
    while($row = $result->fetch_assoc()){
        array_push($feed_array,
        array(
            "post_id" => $row['post_id'],
            "posted_by" => $row['user_id'],
            "title" => $row['title'],
            "date" => $row['post_date'],
            "pic_src" => $row['pic_src'],
            "caption" => $row['caption'],
            "likes" => $row['likes'],
            "like_status" => $row['like_status']
        ));
    }
}

echo json_encode($feed_array);

// $fp = fopen("feed.json",'w');
// fwrite($fp,json_encode($feed_array));
// fclose($fp);

?>