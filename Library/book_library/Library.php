<?php
session_start();
ini_set("display_errors", 1);
require_once("Rest.inc.php");

Class Library extends REST {
	const DB_SERVER = "127.0.0.1";
  const DB_USER = "root";
  const DB_PASSWORD = "aspire@123";
  const DB = "library";
 
  private $db = NULL;
  private $mysqli = NULL;
  
  public function __construct(){  
	 parent::__construct();	
   $this->dbConnect(); // Initiate Database connection
  }
  
  /*
   *  Connect to Database
   */
  private function dbConnect(){
 		$this->mysqli = new mysqli(self::DB_SERVER, self::DB_USER, self::DB_PASSWORD, self::DB);
  }
 
	function get_books() {
	   $query = "SELECT b.book_name, b.book_code, b.price, b.rack_no, b.lend, b.author, b.published_date, b.published, b.id, b.description FROM books b order by b.id desc";
		 $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		 
		 if($r->num_rows > 0) {
			 $result = array();
			 while($row = $r->fetch_assoc()){
				 $result[] = $row;
		 	 }
		 	 $this->response($this->json($result), 200); // send user details
		 }
		 $this->response('',204); // If no records "No Content" status
	}
	
	function createUser($user) { 
		$created = date("Y-m-d");
		$expiry_date = date('Y-m-d', strtotime("+1 year"));
		
		$query = "INSERT INTO users(fname, email, mobile, password, role_id, created_at, expiry_date) VALUES('".$user['name']."', '". $user['email'] ."', '". $user['mobile']. "', '" . md5($user['password']) . "', 2, '".$created."', '".$expiry_date."')";
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		$success = array('status' => "Success", "msg" => "Member Created Successfully.", "data" => $user);
		$this->response($this->json($success),200);
	}
	
	function authenticateUser($user) {
		 $query = "SELECT u.fname, u.email, u.mobile, u.role_id, u.id, u.expiry_date, u.address FROM users u WHERE 
		 					( u.email = '" . $user['user_name'] . "' OR u.mobile = '". $user['user_name'] . "') AND u.password = '" . md5($user['password']) . "'";
		 $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		 
		 if($r->num_rows > 0) {
			 $result = $r->fetch_assoc();
		 	 $expiry_date = $result['expiry_date'];
			 
			 if( strtotime($expiry_date) < strtotime(date("Y-m-d") ) ) {
				 $error = array('status' => "error", "messages" => "Your Membership got expired, please renewal or contact administrator.");
				 $this->response($this->json($error),401); 
			 }
			 
			 $_SESSION['user_name'] = $result['fname'];
			 $_SESSION['user_email'] = $result['email'];
			 $_SESSION['user_mobile'] = $result['mobile'];
			 $_SESSION['user_id'] = $result['id'];
			 $result['sid'] = session_id();
			 
		 	 $this->response($this->json($result), 200); // send user details
		 }
		 $error = array('status' => "error", "messages" => "Invalid Login.");
		 $this->response($this->json($error),401); // If no records "No Content" status
	}
	
	function lendBook($book) {
		$query = "SELECT lb.id FROM lend_book lb WHERE 
		 					 lb.book_id = " . $book['id'] . "  AND lb.user_id = " . $book['userid'] . " AND lb.approved = 0 AND lb.created_at >= DATE_SUB( CURDATE( ) , INTERVAL 7 DAY )  ";
		 $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		
		if($r->num_rows > 0) {
			$success = array('status' => "Success", "messages" => "You Already requested to lend this book, it is in progress.");
			$this->response($this->json($success),200);
		}
		else {
			$query = "SELECT lb.id FROM lend_book lb WHERE 
		 					  lb.user_id = " . $book['userid'] . " AND lb.approved = 1 AND lb.return_date >= CURDATE()";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			if($r->num_rows == 2) {
				$success = array('status' => "Success", "messages" => "You Already lended 2 books currently so your not allowed to to lend any book till you return book(s)");
				$this->response($this->json($success),200);
			}
			else {
				$created = date("Y-m-d");
				$query = "INSERT INTO lend_book(book_id, user_id, created_at) VALUES('".$book['id']."', '". $book['userid'] ."', '".$created."')";
				$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
				$success = array('status' => "Success", "messages" => "Your request sent successfully.");
				$this->response($this->json($success),200);
			}
		}
	}
	
	function lendrequests() {
		$query = "SELECT lb.id, lb.book_id, lb.user_id, lb.approved, b.book_code, b.book_name, b.author, u.fname FROM lend_book lb 
							INNER JOIN books b on b.id = lb.book_id
							INNER JOIN users u on u.id = lb.user_id 
							WHERE lb.created_at >= DATE_SUB( CURDATE( ) , INTERVAL 7 DAY )
							order by lb.id desc";
		 $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		 
		 if($r->num_rows > 0) {
			 $result = array();
			 while($row = $r->fetch_assoc()){
				 $result[] = $row;
		 	 }
		 	 $this->response($this->json($result), 200); // send user details
		 }
		 $this->response('',204); // If no records "No Content" status
	}
	
	function approvelend($lend) {
		$issue_date = date('Y-m-d', strtotime("+1 day"));
		$return_date = date('Y-m-d', strtotime("+15 days"));
		
		$query = "UPDATE lend_book lb SET lb.approved = 1, lb.issue_date =  '" . $issue_date . "', lb.return_date = '" . $return_date . "' WHERE 
									lb.id = ". $lend['id'];
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
			
	  $query = "UPDATE books SET lend =  1 WHERE id	= " . $lend['book_id'];
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);		
			
		$query = "UPDATE lend_book lb SET lb.approved = -1 WHERE lb.id != " . $lend['id'] . " AND lb.book_id = " . $lend['book_id'] . " AND lb.created_at >= DATE_SUB( CURDATE( ) , INTERVAL 7 DAY )";
			$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		
		$success = array('status' => "Success", "messages" => "Your request sent successfully.");
		$this->response($this->json($success),200);	
	}
	
	function savebook($book) {
		$query = "SELECT b.id FROM books b WHERE 
		 					 b.book_code = '" . $book['book_code'] . "'";
		 $r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		
		if($r->num_rows > 0) {
			$success = array('status' => "error", "messages" => "Book Code already exists please choose another one");
			$this->response($this->json($success), 300);
		}
		else {
			$created = date("Y-m-d");
			$query = "INSERT INTO books(book_code, book_name, author, description, published_date, published, price, rack_no, created_at) 
								VALUES('".$book['book_code']."', '". $book['book_name'] ."', '". $book['author'] ."', '". $book['description'] ."', 
								'". $book['published_date'] ."', '". $book['published'] ."', '". $book['price'] ."', '". $book['rack_no'] ."',
								'".$created."')";
					$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
					$success = array('status' => "Success", "messages" => "Book Created successfully.");
					$this->response($this->json($success),200);
		}
	}
	
	function updatebook($book) {
		$query = "UPDATE books b SET b.book_name = '". $book['book_name'] ."', b.author =  '" . $book['author'] . "', b.description = '" . $book['description'] . "', 
							b.published_date = '" . $book['published_date'] . "', b.published = '". $book['published'] ."', b.price = '". $book['price'] ."',
							b.rack_no = '". $book['rack_no'] ."'
							WHERE b.id = ". $book['id'];
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		$success = array('status' => "Success", "messages" => "Book updated successfully.");
		$this->response($this->json($success),200);	
	}
	
	function updateUser($user) {
		$query = "UPDATE users u SET u.fname = '". $user['name'] ."', u.address =  '" . $user['address'] . "'
							WHERE u.id = ". $user['id'];
		$r = $this->mysqli->query($query) or die($this->mysqli->error.__LINE__);
		$success = array('status' => "Success", "messages" => "User updated successfully.");
		$this->response($this->json($success),200);	
	}
	
	
}
