<?php
// If you installed via composer, just use this code to requrie autoloader on the top of your projects.
require '../vendor/autoload.php';
require 'config.php';

session_destroy();

$arr = array ('message'=>"You have been successfully logged out.","message_type"=>"success");
header('Content-type: application/json');
echo json_encode($arr);
?>