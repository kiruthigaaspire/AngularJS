<?php
session_start();
// Initialize
$database = new medoo([
    'database_type' => 'mysql',
    'database_name' => 'library_system',
    'server' => 'localhost',
    'username' => 'root',
    'password' => '',
    'charset' => 'utf8'
]);

?>