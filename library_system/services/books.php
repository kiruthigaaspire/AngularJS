<?php
// If you installed via composer, just use this code to requrie autoloader on the top of your projects.
require '../vendor/autoload.php';
require 'config.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
if(isset($_GET['do'])){
    if($_GET['do'] == "list"){
        
        $listOfBooks = $database->query("SELECT * FROM `books` as b left join (select book_id, count(*) as lended_book from lended_books where returned_date IS NULL group by book_id) lb on (b.id = lb.book_id)")->fetchAll();
        
        $lendedBooks = $database->select("lended_books", [
        "[>]users" => ["user_id" => "id"],
        "[>]books" => ["book_id" => "id"],
        ],["books.name(book_name)", "users.name", "issue_date", "expire_date", "returned_date","lended_books.status","lended_books.id","lended_books.book_id"],["user_id" => $request->user_id]);
        
        $arr = array ("list" => $listOfBooks, "lendedBooks" => $lendedBooks);
    } else if($_GET['do'] == "view"){
        
        $users = $database->select("users", "*", ["is_admin[!]" => 1]);
        
        $bookData = $database->get("books",[
            "id", "name", "author", "price", "code", "no_of_books", "status", "no_of_books", "description"
        ],["id" => $request->id]);
        
        $lendedBooks = $database->select("lended_books", [
        "[>]users" => ["user_id" => "id"],
        ],["users.name", "issue_date", "expire_date", "returned_date","lended_books.status","lended_books.id","lended_books.book_id"],["book_id" => $request->id]);
        
        $arr = array ("bookData" => $bookData, "lendedBooks" => $lendedBooks, "users" => $users);
    } else if($_GET['do'] == "approve"){
        
        $database->update("lended_books", 
            ["status" => 1, "issue_date" => date("Y-m-d"), "expire_date" => date("Y-m-d",strtotime("+7 day"))],
            ["id" => $request->id]
        );
        
        $lendedBooks = $database->select("lended_books", [
        "[>]users" => ["user_id" => "id"],
        ],["users.name", "issue_date", "expire_date", "returned_date","lended_books.status","lended_books.id","lended_books.book_id"],["book_id" => $request->book_id]);
        
        $arr = array ("lendedBooks" => $lendedBooks);
    } else if($_GET['do'] == "returned"){
        
        $database->update("lended_books", 
            ["status" => 2, "returned_date" => date("Y-m-d")],
            ["id" => $request->id]
        );
        
        $lendedBooks = $database->select("lended_books", [
        "[>]users" => ["user_id" => "id"],
        ],["users.name", "issue_date", "expire_date", "returned_date","lended_books.status","lended_books.id","lended_books.book_id"],["book_id" => $request->book_id]);
        
        $arr = array ("lendedBooks" => $lendedBooks);
    } else if($_GET['do'] == "lend"){
        
        $database->insert("lended_books", 
            ["status" => $request->added_by == 'admin' ? "1" : "0", "issue_date" => date("Y-m-d"), "expire_date" => $request->added_by == 'admin' ?date("Y-m-d",strtotime("+7 day")) : "", "user_id" => $request->user_id, "book_id" => $request->book_id]
        );
        
        $lendedBooks = $database->select("lended_books", [
        "[>]users" => ["user_id" => "id"],
        ],["users.name", "issue_date", "expire_date", "returned_date","lended_books.status","lended_books.id","lended_books.book_id"],["book_id" => $request->book_id]);
        
        $arr = array ("lendedBooks" => $lendedBooks);
    } else if($_GET['do'] == "add"){
        $database->insert("books", [
            'name' => $request->name,
            'author' => $request->author,
            'code' => $request->code,
            'no_of_books' => $request->no_of_books,
            'price' => $request->price,
            'description' => $request->description
        ]);
        $arr = array ('message'=>"Data Saved Successfully.","message_type"=>"success");
    }
} else {
    $arr = array ("message"=>"Unknown Request", "message_type"=>"danger");   
}
header('Content-type: application/json');
echo json_encode($arr);
?>