<?php

require_once "Library.php";

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"), true);

$obj = new Library();

switch($method) {
	case 'GET': 
			$id = explode("user/", $_SERVER['REQUEST_URI']);
		  if (isset($id[1])) {
				
		  }
      else {
	   	 
      }
      break;
  case 'POST':
  	  $id = explode("user/", $_SERVER['REQUEST_URI']);
  	  if (isset($id[1])) {
				if( $id[1] == 'login' ) { 
					echo $result = $obj->authenticateUser($data);
				}
				else if( $id[1] == 'lendbook' ) {
					echo $result = $obj->lendBook($data);
				}
				else if( $id[1] == 'update' ) {
					echo $result = $obj->updateUser($data);
				}
				else {
					
				}
			}
			else {
				echo $result = $obj->createUser($data);
			}
			break;
	default: 
					echo "rrr";
					break;
}
exit;
