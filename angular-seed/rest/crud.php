<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$_REQUEST = json_decode(file_get_contents('php://input'), true);


define('BASE_PATH', 'http://localhost:8000/');
define('DB_HOST', 'localhost');
define('DB_NAME', 'library');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'aspire');


$mysqli = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);


if (mysqli_connect_errno()) {
  echo("Failed to connect, the error message is : " . mysqli_connect_error());
  exit();
}

if (isset($_REQUEST['action']) && !empty(isset($_REQUEST['action']))) {
  $action = $_REQUEST['action'];

  switch ($action) {
    case "saveBook":
      saveBook($mysqli);
      break;
    case "deleteBook":
      deleteBook($mysqli, $_REQUEST['id']);
      break;
    case "getBooks":
      getBooks($mysqli,$_REQUEST['id']);
      break;
    default:
      invalidRequest();
  }
} else {
  invalidRequest();
}


/**
 * This function will handle user deletion
 * @param string $id
 * @throws Exception
 */
function deleteBook($mysqli, $id = ''){
	try{
		if(empty($id)) throw new Exception( "Invalid Book." );
		$query = "DELETE FROM `books` WHERE `id` = $id";
		if($mysqli->query( $query )){
			$data['success'] = true;
			$data['message'] = 'Book deleted successfully.';
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}
	
/**
 * This function gets list of users from database
 */
function getBooks($mysqli, $id=0){
	try{
        if($id>0){
           $query = "SELECT * FROM `books` where id=$id ";
        }else {
          $query = "SELECT * FROM `books` order by id desc ";
        }
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$row['id'] = (int) $row['id'];
            if($id>0){
              $data['data'] = $row;
            }else {
              $data['data'][] = $row;
            }
            
			
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

function invalidRequest()
{
	$data = array();
	$data['success'] = false;
	$data['message'] = "Invalid request.";
	echo json_encode($data);
	exit;
}


function saveBook($mysqli)
{
  try {
    $data = array();
    $title = $mysqli->real_escape_string(isset($_REQUEST['books']['title']) ? $_REQUEST['books']['title'] : '');
    $author = $mysqli->real_escape_string(isset($_REQUEST['books']['author']) ? $_REQUEST['books']['author'] : '');
    $rollNumber = $mysqli->real_escape_string(isset($_REQUEST['books']['rollNumber']) ? $_REQUEST['books']['rollNumber'] : '');
    $quantity = $mysqli->real_escape_string(isset($_REQUEST['books']['quantity']) ? $_REQUEST['books']['quantity'] : '');
    $status = $mysqli->real_escape_string(isset($_REQUEST['books']['status']) ? $_REQUEST['books']['status'] : '');
    $id = $mysqli->real_escape_string(isset($_REQUEST['books']['id']) ? $_REQUEST['books']['id'] : '');

    if ($title == '' || $author == '' || $rollNumber == '' || $quantity == '' || $status == '') {
      throw new Exception("Required fields missing, Please enter and submit");
    }


    if (empty($id)) {
      $query = "INSERT INTO books (`title`, `author`, `rollNumber`, `quantity`, `status`) VALUES ('$title', '$author', '$rollNumber', '$quantity', '$status')";
    } else {
      $query = "UPDATE books SET `title` = '$title', `author` = '$author',   `rollNumber` = '$rollNumber', `quantity` = '$quantity', `status` = '$status' WHERE `books`.`id` = $id";
    }
    
    if ($mysqli->query($query)) {
      $data['success'] = true;
      if (!empty($id))
        $data['message'] = 'Book updated successfully.';
      else
        $data['message'] = 'Book added successfully.';
      if (empty($id))
        $data['id'] = (int) $mysqli->insert_id;
      else
        $data['id'] = (int) $id;
    }else {
      throw new Exception($mysqli->sqlstate . ' - ' . $mysqli->error);
    }
    $mysqli->close();
    echo json_encode($data);
    exit;
  } catch (Exception $e) {
    $data = array();
    $data['success'] = false;
    $data['message'] = $e->getMessage();
    echo json_encode($data);
    exit;
  }
}

?>