<?php
// If you installed via composer, just use this code to requrie autoloader on the top of your projects.
require '../vendor/autoload.php';
require 'config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$validEmail = $database->select("users",[
	"email", "password", "is_admin", "name", "id"
],["email" => $request->email]);

if (count($validEmail) == 0) {
    $arr = array ('message'=>"Invalid Email Id.","message_type"=>"danger");
} else {
    if(md5($request->password) != $validEmail[0]['password']){
        $arr = array ('message'=>"Invalid Password.","message_type"=>"danger");    
    } else {
        $_SESSION['user'] = $request->email;
        $_SESSION['role'] = $validEmail[0]['is_admin'];
        $arr = array ("user" => array("name" => $validEmail[0]['name'], "email" => $request->email, "is_admin" => $validEmail[0]['is_admin'], "user_id" => $validEmail[0]['id']), 'message'=>"Success. You are redirecting to home page.","message_type"=>"success");
    }
}
header('Content-type: application/json');
echo json_encode($arr);
?>