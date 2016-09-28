<?php
/*
 * File : api.php
 * Author : Arun Pitchai
 *
 */
require_once "rest.inc.php";

class API extends REST
{

    const dbServer = "localhost";

    const dbUser = "root";

    const dbPassword = "root";

    const dbName = "lms";

    private $db = NULL;

    private $mysqli = NULL;

    private $userFields = array(
        'name',
        'email_id',
        'username',
        'password',
        'address',
        'id_proof',
        'phone_no'
    );

    private $bookFields = array(
        'book_name',
        'author_name',
        'price',
        'book_code',
        'number_of_books',
        'book_arrival_date',
        'book_status',
        'rack_no',
        'available_status'
        
    );
    
    private $result = array('errorStatus' => true,'errorMessage' => 'fail');

    const SELECT_USER_PASS = "SELECT u.id, u.name, u.email_id, u.password, '0' as errorStatus, 'Ok' as errorMessage, ur.role_id as isAdmin 
                              FROM user as u
                              LEFT JOIN user_role as ur on ur.user_id = u.id 
                              LEFT JOIN role as r on r.id = ur.role_id
                              WHERE u.email_id = '%s' AND u.password = '%s' 
                              LIMIT 1";

    const SELECT_USER_ID_ONLY = "SELECT id 
                                 FROM user 
                                 where id=%d";

    const SELECT_USER_EMAIL_ONLY = "SELECT email_id
                                 FROM user
                                 where email_id='%s'";

    const DELETE_USER = "DELETE FROM user 
                         WHERE id = %d";

    const SELECT_USER_ALL_WITH_ID = "SELECT id, name, email_id, username, password, address, id_proof, phone_no, 
                             '0' as errorStatus, 'Ok' as errorMsg 
                              FROM user 
                              where id=%d";

    const SELECT_USER_LIST = "SELECT distinct id, name, email_id, username, password, address, id_proof, 
                              phone_no 
                              FROM user 
                              order by id desc";
    
    const SELECT_BOOK_LIST = "SELECT b.id, b.book_name, b.author_name, b.price, b.book_code, b.number_of_books, b.book_arrival_date, 
                              b.book_status, b.rack_no, b.available_status, ur.book_status,ur.user_id
                              FROM book as b
                              LEFT JOIN user_book as ur on b.id = ur.book_id";
    
    const SELECT_MY_BOOK_LIST = "SELECT b.id, b.book_name, b.author_name, b.price, b.book_code, b.number_of_books, b.book_arrival_date,
                              b.book_status, b.rack_no, b.available_status, ur.book_status
                              FROM book as b
                              LEFT JOIN user_book as ur on b.id = ur.book_id
                              where ur.user_id=%d";
    
    const SELECT_BOOK_ALL_WITH_ID = "SELECT id, book_name, author_name, price, book_code, number_of_books, book_arrival_date,
                                    book_status, rack_no, available_status
                                    FROM book
                                    where id=%d";
    
    const SELECT_BOOK_ID_ONLY = "SELECT id
                                 FROM book
                                 where id=%d";
    
    const SELECT_BOOK_NAME_ONLY = "SELECT count(*)
                                 FROM book
                                 where book_name='%s'";
    
    const DELETE_USER_BOOK = "DELETE FROM user_book
                         WHERE id = %d";

    public function __construct()
    {
        parent::__construct(); // Init parent contructor
        $this->dbConnect(); // Initiate Database connection
    }

    /*
     * Connect to Database
     */
    private function dbConnect()
    {
        $this->mysqli = new mysqli(self::dbServer, self::dbUser, self::dbPassword, self::dbName);
    }

    /*
     * Dynmically call the method based on the query string
     */
    public function processApi()
    {
        $func = strtolower(trim(str_replace("/", "", $_REQUEST['x'])));
        if ((int) method_exists($this, $func) > 0) {
            $this->$func();
        } else {
            $this->response('', 404); // If the method not exist with in this class "Page not found".
        }
    }

    /**
     * *
     * Method to user login
     */
    private function userLogin()
    {
        $result = array('errorStatus' => true, 'errorMessage' => 'Email Address or Password are invalid.');
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $emailId = $this->_request['email'];
        $password = $this->_request['password'];
        if (! empty($emailId) and ! empty($password)) {
                $userQuery = sprintf(API::SELECT_USER_PASS, $emailId, $password);
                $userResult = $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
                if ($userResult->num_rows > 0) {
                    $result['errorStatus'] = false;
                    $result['errorMessage'] = "Ok";
                    $result['user'] = $userResult->fetch_assoc();
                    $this->response($this->json($result), 200);
                }
                $this->response('', 204); // If no records "No Content" status
        }
        $this->response($this->json($result), 200);
    }

    /**
     * *
     * Method to user login off
     */
    private function userLogOff()
    {
        $result = $this->result;      
        $this->response($this->json($result), 200);
    }
    
    /**
     * *
     * Method to User details listing
     */
    private function userList()
    {
        if ($this->getRequestMethod() != "GET") {
            $this->response('', 406);
        }
        $userQuery = sprintf(API::SELECT_USER_LIST);
        $userResult = $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
        if ($userResult->num_rows > 0) {
            $result = array();
            while ($row = $userResult->fetch_assoc()) {
                $result[] = $row;
            }
            $this->response($this->json($result), 200); // send user details
        }
        $this->response('', 204); // If no records "No Content" status
    }

    /**
     * *
     * Method to get user particular details
     */
    private function userDetail()
    {
        if ($this->getRequestMethod() != "GET") {
            $this->response('', 406);
        }
        $userId = (int) $this->_request['id'];
        if ($userId > 0) {
            $userQuery = sprintf(API::SELECT_USER_ALL_WITH_ID, $userId);
            $userResult = $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
            if ($userResult->num_rows > 0) {
                $result['user'] = $userResult->fetch_assoc();
                $this->response($this->json($result), 200); // send user details
            }
        }
        $this->response('', 204); // If no records "No Content" status
    }

    /**
     * *
     * Method to add new user
     */
    private function userAdd()
    {
        try {
            
            if ($this->getRequestMethod() != "POST") {
                $this->response('', 406);
            }
            $userArray = $this->buildRequest();
            $userKeys = array_keys($userArray);
            $userColumns = '';
            $userValues = '';
            foreach ($this->userFields as $userKey) { // Check the customer received. If blank insert blank into the array.
                if (! in_array($userKey, $userKeys)) {
                    $$userKey = '';
                } else {
                    $$userKey = $userArray[$userKey];
                }
                $userColumns = $userColumns . $userKey . ',';
                $userValues = $userValues . "'" . $$userKey . "',";
            }
            $userQuery = "INSERT INTO user(" . trim($userColumns, ',') . ") VALUES(" . trim($userValues, ',') . ")";
            if (! empty($userArray) && $this->isUserEmailExists($_REQUEST['email_id']) == 0) {
                $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
                $result = array(
                    'errorStatus' => false,
                    'errorMessage' => "Ok",
                    'data' => $userArray
                );
                $this->response($this->json($result), 200);
            } else {
                $this->response('', 204); // "No Content" status
            }
        } catch (Exception $e) {}
        $this->response('', 204); // "No Content" status
    }

    /**
     * *
     * Method to update /edit user details
     */
    private function userUpdate()
    {
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $userId = (int) $_REQUEST['id'];
        $userArray = $this->buildRequest();
        $userKeys = array_keys($userArray);
        $userColumns = '';
        foreach ($this->userFields as $userKey) { // Check the customer received. If key does not exist, insert blank into the array.
            if (! in_array($userKey, $userKeys)) {
                $$userKey = '';
            } else {
                $$userKey = $userArray[$userKey];
            }
            $userColumns = $userColumns . $userKey . "='" . $$userKey . "',";
        }
        $userQuery = "UPDATE user SET " . trim($userColumns, ',') . " WHERE id=$userId";
        if (! empty($userArray) && $this->isUserExists($userId) > 0) {
            $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
            $result = array(
                'errorStatus' => false,
                'errorMessage' => "User " . $id . " Updated Successfully.",
                'data' => $userArray
            );
            $this->response($this->json($result), 200);
        } else {
            $this->response('', 204); // "No Content" status
        }
    }

    /**
     * *
     * Method to delete the user details
     */
    private function userDelete()
    {
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $userId = (int) $_REQUEST['id'];
        if ($userId > 0 && $this->isUserExists($userId) > 0) {
            $userQuery = sprintf(API::DELETE_USER, $userId);
            $this->mysqli->query($userQuery) or die($this->mysqli->error . __LINE__);
            $result = array(
                'errorStatus' => false,
                'errorMessage' => "Ok"
            );
            $this->response($this->json($result), 200);
        } else {
            $this->response('', 204); // If no records "No Content" status
        }
    }

    /**
     * *
     * Method to check the user exists using id
     *
     * @param int $userId            
     */
    public function isUserExists($userId)
    {
        return $this->executeMysqlQuery(API::SELECT_USER_ID_ONLY, $userId);
    }

    /**
     * *
     * Method to check the user exist using email
     * 
     * @param string $userEmail            
     */
    public function isUserEmailExists($userEmail)
    {
        return $this->executeMysqlQuery(API::SELECT_USER_EMAIL_ONLY, $userEmail);
    }

    /**
     * *
     * Method to Book details listing
     */
    private function bookList()
    {
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $bookQuery = sprintf(API::SELECT_BOOK_LIST);
        $bookResult = $this->mysqli->query($bookQuery) or die($this->mysqli->error . __LINE__);
        if ($bookResult->num_rows > 0) {
            $result = array();
            while ($row = $bookResult->fetch_assoc()) {
                $result['errorStatus'] = false;
                $result['errorMessage'] = "Ok";
                $result['book'][] = $row;
            }
            $this->response($this->json($result), 200); // send book details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    /**
     * *
     * Method to My Book details listing
     */
    private function mybookList()
    {
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $userId = $this->_request['user_id'];
        $bookQuery = sprintf(API::SELECT_MY_BOOK_LIST,$userId);
        
        $bookResult = $this->mysqli->query($bookQuery) or die($this->mysqli->error . __LINE__);
        if ($bookResult->num_rows > 0) {
            $result = array();
            while ($row = $bookResult->fetch_assoc()) {
                $result['errorStatus'] = false;
                $result['errorMessage'] = "Ok";
                $result['book'][] = $row;
            }
            $this->response($this->json($result), 200); // send book details
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    /*
     * Encode array into JSON
     */
    public function json($data)
    {
        if (is_array($data)) {
            return json_encode($data);
        }
    }

    /**
     * *
     * Method to get book particular details
     */
    private function bookView()
    {
    
        if ($this->getRequestMethod() != "POST") {
            $this->response('', 406);
        }
        $bookId = (int) $this->_request['id'];
        if ($bookId > 0) {
            $bookQuery = sprintf(API::SELECT_BOOK_ALL_WITH_ID, $bookId);
            $bookResult = $this->mysqli->query($bookQuery) or die($this->mysqli->error . __LINE__);
            if ($bookResult->num_rows > 0) {
                $result = $bookResult->fetch_assoc();
                $this->response($this->json($result), 200); // send user details
            }
        }
        $this->response('', 204); // If no records "No Content" status
    }
    
    /**
     * *
     * Method to add new book
     */
    private function bookAdd()
    {
        try {
    
            if ($this->getRequestMethod() != "POST") {
                $this->response('', 406);
            }
            $bookName = $this->_request['book_name'];
            $authorName = $this->_request['author_name'];
            $bookPrice = $this->_request['price'];
            $bookCode = $this->_request['book_code'];
            $noOfBooks = $this->_request['number_of_books'];
            $rackNo = $this->_request['rack_no'];
            $bookDate = date('Y-m-d');
            $bookKeys = array_keys($bookArray);
            $bookColumns = '';
            $bookValues = '';
            foreach ($this->bookFields as $bookKey) { 
                if (! in_array($bookKey, $bookKeys)) {
                    $$bookKey = '';
                } else {
                    $$userKey = $bookArray[$bookKey];
                }
                $bookColumns = $bookColumns . $bookKey . ',';
                $bookValues = $bookValues . "'" . $$bookKey . "',";
            }
            $bookQuery = "INSERT INTO book(" . trim($bookColumns, ',') . ") VALUES('$bookName','$authorName',$bookPrice,".$bookCode.",".$noOfBooks.",".$bookDate.",'Y',".$rackNo.",'Y')";
            if (! empty($bookName) && $this->isBookNameExists($bookName) > 0) {
                $this->mysqli->query($bookQuery) or die($this->mysqli->error . __LINE__);
                $result = array(
                    'errorStatus' => false,
                    'errorMessage' => "Ok",
                    'data' => $bookArray
                );
                $this->response($this->json($result), 200);
            } else {
                $this->response('', 204); // "No Content" status
            }
        } catch (Exception $e) {}
        $this->response('', 204); // "No Content" status
    }
    
    /**
     * *
     * Method to lend book
     */
    private function bookLend()
    {
        try {
    
            if ($this->getRequestMethod() != "POST") {
                $this->response('', 406);
            }
            $bookId = $this->_request['book_id'];
            $userId = $this->_request['user_id'];
            $bookApproveQuery = "INSERT INTO user_book(`user_id`,`book_id`,`book_status`) VALUES($userId,$bookId,1)";
            if (! empty($bookId)) {
                $this->mysqli->query($bookApproveQuery) or die($this->mysqli->error . __LINE__);
                $result = array(
                    'errorStatus' => false,
                    'errorMessage' => "Ok",
                    'data' => ''
                );
                $this->response($this->json($result), 200);
            } else {
                $this->response('', 204); // "No Content" status
            }
        } catch (Exception $e) {}
        $this->response('', 204); // "No Content" status
    }
    
    /**
     * *
     * Method to lend book
     */
    private function bookApprove()
    {
        try {
    
            if ($this->getRequestMethod() != "POST") {
                $this->response('', 406);
            }
            $bookId = $this->_request['book_id'];
            $userId = $this->_request['user_id'];
            $bookApproveQuery = "UPDATE user_book SET `book_status`=2 WHERE `user_id`=".$userId." AND `book_id`=".$bookId;            
            if (! empty($bookId)) {
                $this->mysqli->query($bookApproveQuery) or die($this->mysqli->error . __LINE__);
                $result = array(
                    'errorStatus' => false,
                    'errorMessage' => "Ok",
                    'data' => ''
                );
                $this->response($this->json($result), 200);
            } else {
                $this->response('', 204); // "No Content" status
            }
        } catch (Exception $e) {}
        $this->response('', 204); // "No Content" status
    }
    
    /**
     * *
     * Method to reject book
     */
    private function bookReject()
    {
        try {
    
            if ($this->getRequestMethod() != "POST") {
                $this->response('', 406);
            }
            $bookId = $this->_request['book_id'];
            $userId = $this->_request['user_id'];
            $bookApproveQuery = "DELETE FROM user_book WHERE `user_id`=".$userId." AND `book_id`=".$bookId;
            if (! empty($bookId)) {
                $this->mysqli->query($bookApproveQuery) or die($this->mysqli->error . __LINE__);
                $result = array(
                    'errorStatus' => false,
                    'errorMessage' => "Ok",
                    'data' => ''
                );
                $this->response($this->json($result), 200);
            } else {
                $this->response('', 204); // "No Content" status
            }
        } catch (Exception $e) {}
        $this->response('', 204); // "No Content" status
    }
    
    /**
     * *
     * Method to check the book exists using id
     *
     * @param int $bookId
     */
    public function isBookExists($bookId)
    {
        return $this->executeMysqlQuery(API::SELECT_BOOK_ID_ONLY, $bookId);
    }
    
    /**
     * *
     * Method to check the book exist using Name
     *
     * @param string $bookName
     */
    public function isBookNameExists($bookName)
    {
        return $this->executeMysqlQuery(API::SELECT_BOOK_NAME_ONLY, $bookName);
    }
    
    /****
     * Method to execute the mysql query and return the result
     * 
     */
    private function executeMysqlQuery($sqlQuery, $input)
    {
        $query = sprintf($sqlQuery, $input);
        $data = $this->mysqli->query($query) or die($this->mysqli->error . __LINE__);
        return $data->num_rows;
    }
    
    /**
     * *
     * Method to build the rest input request
     *
     * @param string $type            
     */
    public function buildRequest($type = 'user')
    {
        $inputColumns = $type == 'user' ? $this->userFields : $this->bookFields;
        if (is_array($inputColumns)) {
            foreach ($inputColumns as $columnval) {
                $requestObj[$columnval] = $_REQUEST[$columnval];
            }
        }
        return $requestObj;
    }
}

// Initiiate API Library
$api = new API();
$api->processApi();

?>