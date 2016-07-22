<?php

require_once "Library.php";

$method = $_SERVER['REQUEST_METHOD'];

$data = json_decode(file_get_contents("php://input"), true);

$obj = new Library();

switch($method) {
	case 'GET': 
			$id = explode("book/", $_SERVER['REQUEST_URI']);
		  if (isset($id[1])) {
				if( $id[1] == 'lendrequests' ) {
					echo $result = $obj->lendrequests();
				}
				else {
	    	  $result = $obj->get_book_by_id($id[1]);
				}
		  }
      else {
	   	 echo $result = $obj->get_books();
      }
      break;
  case 'POST':
  	  $id = explode("book/", $_SERVER['REQUEST_URI']);
  	  if (isset($id[1])) {				
				if ( $id[1] == 'approvelend' ) {
					echo $result = $obj->approvelend($data);
				}
				if( $id[1] == 'rejectlend') {
					echo $result = $obj->rejectlend($data);
				}
				if( $id[1] == 'update' ) {
					echo $result = $obj->updatebook($data);
				}
				if( $id[1] == 'returnlend' ) {
					echo $result = $obj->returnlend($data);
				}
				if( $id[1] == 'memberlendrequests' ) {
					echo $result = $obj->memberlendrequests($data);
				}
			}
			else {
				echo $result = $obj->savebook($data);
			}
			break;
	default: 
					echo "rrr";
					break;
}
exit;
