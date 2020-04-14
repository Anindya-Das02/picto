<?php


?>
<!DOCTYPE html>
<html>
    <head>
        <title>php</title>
        <style>
        .box{
            height: 400px;
            width: 60%;
            background-color: orange;
            margin: 10px;
        }
        .modal{
            height: 300px;
            position: fixed;
            width: 50%;
            background-color: green;
            margin-top: 100px;
            z-index: 1;
        }
        </style>
        <script>
        setTimeout(function(){
            document.getElementById("modal").style.display = 'block';
        },3000);
        </script>
    </head>
    <body>
        <h1>hrllo</h1>
        <div class="modal" id="modal" style="display:none;"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>

    </body>
</html>