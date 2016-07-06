<?php
$data = json_decode(file_get_contents("php://input"));

$bookdetail = [
    'name' => $data->name,
    'author' => $data->author,
    'quantity' => $data->quantity,
    'status' => $data->status,
    'id' => $data->roll_no
];
print_r($bookdetail);
?>