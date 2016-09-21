<?php
// If you installed via composer, just use this code to requrie autoloader on the top of your projects.
require '../vendor/autoload.php';
require 'config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$datas = $database->count("users",[
	"email" => $request->email
]);
if ($datas == 0) {
    $last_user_id = $database->insert("users", [
        "name" => $request->name,
        "email" => $request->email,
        "password" => md5($request->password)
    ]);
    $arr = array ('message'=>"Data Saved Successfully.","message_type"=>"success");
} else {
    $arr = array ('message'=>"User already exist.","message_type"=>"danger");
}
header('Content-type: application/json');
echo json_encode($arr);
?>