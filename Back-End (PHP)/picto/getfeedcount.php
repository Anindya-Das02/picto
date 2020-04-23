<?php

include("dbconnect.php");
if(isset($_GET['response'])){
    $stmt = $conn->prepare("SELECT count(*) as c_result from post_list");
    $stmt->execute();
    $count_result = $stmt->get_result();

    $datarow = $count_result->fetch_assoc();
    echo $datarow['c_result'];

}

?>