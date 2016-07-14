<?php
$bookdetail = array(
		array(
			"name" => "Harry Potter 5",
			"author" => "J.K. Rowling",
            "quantity" => "2",
            "status" => "available",
            "book_id" => "2"
        ),
		array(
			"name" => "The Hunger Games 1",
	        "author" => "Suzanne Collins",
            "quantity" => "0",
            "status" => "unavailable",
            "book_id" => "6"
		),
		array(
			"name" => "Autobiography",
			"author" => "Jawaharlal Nehru",
            "quantity" => "2",
            "status" => "available",
            "book_id" => "9"
		),
		array(
			"name" => "A Passage to India",
			"author" => "E. M. Foster",
            "quantity" => "0",
            "status" => "unavailable",
            "book_id" => "12"
		),
		array(
			"name" => "A week with Gandhi",
			"author" => "L. Fischer",
            "quantity" => "2",
            "status" => "available",
            "book_id" => "22"
		)
	);
print_r(json_encode($bookdetail));
?>
