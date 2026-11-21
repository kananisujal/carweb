<?php

$connection = mysqli_connect(
    'localhost',
    'root',',','login car db'
);
if($conn){
    echo"successfull";
}else{
    echo"not connected";
}
?>