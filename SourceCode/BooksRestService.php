<?php
    require "dbinfo.php";
    require "RestService.php";
    require "Claims.php";

// Before running this demo, you need to create a database in MySQL called
// wsbooks and populate it using the script wsbooks_mysql.sql.  You also need
// to edit the fields in dbinfo.php to refer to the database you are using.
//
// There is limited error handling in this code in order to keep the code as simple as
// possible.
 
class BooksRestService extends RestService 
{
	private $books;
    
	public function __construct() 
	{
		// Passing in the string 'books' to the base constructor ensures that
		// all calls are matched to be sure they are in the form http://server/books/x/y/z 
		parent::__construct("claims");
	}

	public function performGet($url, $parameters, $requestBody, $accept) 
	{
		switch (count($parameters))
		{
			case 1:
				// Note that we need to specify that we are sending JSON back or
				// the default will be used (which is text/html).
				header('Content-Type: application/json; charset=utf-8');
				// This header is needed to stop IE cacheing the results of the GET	
				header('no-cache,no-store');
				$this->getAllBooks();
				echo json_encode($this->books);
				break;

			case 2:
				$id = $parameters[1];
				$book = $this->getBookById($id);
				if ($book != null)
				{
					header('Content-Type: application/json; charset=utf-8');
					header('no-cache,no-store');
					echo json_encode($book);
				}
				else
				{
					$this->notFoundResponse();
				}
				break;

			case 4:
				$year = $parameters[1];
				$month = $parameters[2];
				$day = $parameters[3];
				header('Content-Type: application/json; charset=utf-8');
				header('no-cache,no-store');
				$this->getBooksByDate($year, $month, $day);
				echo json_encode($this->books);
				break;
				
			default:	
				$this->methodNotAllowedResponse();
		}
	}

	public function performPost($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newClaim = $this->extractBookFromJSON($requestBody);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$sql = "INSERT INTO car_insurance_claim (`COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`, `COL 18`, `COL 19`, `COL 20`, `COL 21`, `COL 22`, `COL 23`, `COL 24`, `COL 25`, `COL 26`, `COL 27`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			// We pull the fields of the book into local variables since 
			// the parameters to bind_param are passed by reference.
			$statement = $connection->prepare($sql);

			$ID = $newClaim->getID();
			$KIDSDRIV = $newClaim->getKIDSDRIV();
			$BIRTH = $newClaim->getBIRTH();
			$AGE = $newClaim->getAGE();
			$HOMEKIDS = $newClaim->getHOMEKIDS();
			$YOJ = $newClaim->getYOJ();
			$INCOME = $newClaim->getINCOME();
			$PARENT1 = $newClaim->getPARENT1();
			$HOME_VAL = $newClaim->getHOME_VAL();
			$MSTATUS = $newClaim->getMSTATUS();
			$GENDER = $newClaim->getGENDER();
			$EDUCATION = $newClaim->getEDUCATION();
			$OCCUPATION = $newClaim->getOCCUPATION();
			$TRAVTIME = $newClaim->getTRAVTIME();
			$CAR_USE = $newClaim->getCAR_USE();
			$BLUEBOOK = $newClaim->getBLUEBOOK();
			$TIF = $newClaim->getTIF();
			$CAR_TYPE = $newClaim->getCAR_TYPE();
			$RED_CAR = $newClaim->getRED_CAR();
			$OLDCLAIM = $newClaim->getOLDCLAIM();
			$CLM_FREQ = $newClaim->getCLM_FREQ();
			$REVOKED = $newClaim->getREVOKED();
			$MVR_PTS = $newClaim->getMVR_PTS();
			$CLM_AMT = $newClaim->getCLM_AMT();
			$CAR_AGE = $newClaim->getCAR_AGE();
			$CLAIM_FLAG = $newClaim->getCLAIM_FLAG();
			$URBANICITY = $newClaim->getURBANICITY();

			$statement->bind_param("sssssssssssssssssssssssssss", $ID, $KIDSDRIV,$BIRTH,$AGE,$HOMEKIDS,$YOJ,$INCOME,$PARENT1,$HOME_VAL,$MSTATUS,$GENDER,$EDUCATION,$OCCUPATION,
			$TRAVTIME,$CAR_USE,$BLUEBOOK,$TIF,$CAR_TYPE,$RED_CAR,$OLDCLAIM,$CLM_FREQ,$REVOKED,$MVR_PTS,$CLM_AMT,$CAR_AGE,$CLAIM_FLAG,$URBANICITY);
			$result = $statement->execute();
			if ($result == FALSE)
			{
				$errorMessage = $statement->error;
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				$this->errorResponse($errorMessage);
			}
		}
	}

	public function performPut($url, $parameters, $requestBody, $accept) 
	{
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;

		$newClaim = $this->extractBookFromJSON($requestBody);
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$sql = "UPDATE car_insurance_claim SET `COL 2` = ?, `COL 3` = ?, `COL 4` = ?, `COL 5` = ?, `COL 6` = ?, `COL 7` = ?, `COL 8` = ?, `COL 9` = ?, `COL 10` = ?, `COL 11` = ?, `COL 12` = ?, `COL 13` = ?, `COL 14` = ?, `COL 15` = ?, `COL 16` = ?, `COL 17` = ?, `COL 18` = ?, `COL 19` = ?, `COL 20` = ?, `COL 21` = ?, `COL 22` = ?, `COL 23` = ?, `COL 24` = ?, `COL 25` = ?, `COL 26` = ?, `COL 27` = ? WHERE `COL 1` = ?";
			// We pull the fields of the claim into local variables since 
			// the parameters to bind_param are passed by reference.
			$statement = $connection->prepare($sql);
			$ID = $newClaim->getID();
			$KIDSDRIV = $newClaim->getKIDSDRIV();
			$BIRTH = $newClaim->getBIRTH();
			$AGE = $newClaim->getAGE();
			$HOMEKIDS = $newClaim->getHOMEKIDS();
			$YOJ = $newClaim->getYOJ();
			$INCOME = $newClaim->getINCOME();
			$PARENT1 = $newClaim->getPARENT1();
			$HOME_VAL = $newClaim->getHOME_VAL();
			$MSTATUS = $newClaim->getMSTATUS();
			$GENDER = $newClaim->getGENDER();
			$EDUCATION = $newClaim->getEDUCATION();
			$OCCUPATION = $newClaim->getOCCUPATION();
			$TRAVTIME = $newClaim->getTRAVTIME();
			$CAR_USE = $newClaim->getCAR_USE();
			$BLUEBOOK = $newClaim->getBLUEBOOK();
			$TIF = $newClaim->getTIF();
			$CAR_TYPE = $newClaim->getCAR_TYPE();
			$RED_CAR = $newClaim->getRED_CAR();
			$OLDCLAIM = $newClaim->getOLDCLAIM();
			$CLM_FREQ = $newClaim->getCLM_FREQ();
			$REVOKED = $newClaim->getREVOKED();
			$MVR_PTS = $newClaim->getMVR_PTS();
			$CLM_AMT = $newClaim->getCLM_AMT();
			$CAR_AGE = $newClaim->getCAR_AGE();
			$CLAIM_FLAG = $newClaim->getCLAIM_FLAG();
			$URBANICITY = $newClaim->getURBANICITY();
			$statement->bind_param("sssssssssssssssssssssssssss", $KIDSDRIV,$BIRTH,$AGE,$HOMEKIDS,$YOJ,$INCOME,$PARENT1,$HOME_VAL,$MSTATUS,$GENDER,$EDUCATION,$OCCUPATION,
			$TRAVTIME,$CAR_USE,$BLUEBOOK,$TIF,$CAR_TYPE,$RED_CAR,$OLDCLAIM,$CLM_FREQ,$REVOKED,$MVR_PTS,$CLM_AMT,$CAR_AGE,$CLAIM_FLAG,$URBANICITY, $ID);

			$result = $statement->execute();
			if ($result == FALSE)
			{
				$errorMessage = $statement->error;
			}
			$statement->close();
			$connection->close();
			if ($result == TRUE)
			{
				// We need to return the status as 204 (no content) rather than 200 (OK) since
				// we are not returning any data
				$this->noContentResponse();
			}
			else
			{
				$this->errorResponse($errorMessage);
			}
		}
	}

    public function performDelete($url, $parameters, $requestBody, $accept) 
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		if (count($parameters) == 2)
		{
			$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
			if (!$connection->connect_error)
			{
				$id = $parameters[1];
				$sql = "delete from car_insurance_claim where `COL 1` = ?";
				$statement = $connection->prepare($sql);
				$statement->bind_param('i', $id);
				$result = $statement->execute();
				if ($result == FALSE)
				{
					$errorMessage = $statement->error;
				}
				$statement->close();
				$connection->close();
				if ($result == TRUE)
				{
					// We need to return the status as 204 (no content) rather than 200 (OK) since
					// we are not returning any data
					$this->noContentResponse();
				}
				else
				{
					$this->errorResponse($errorMessage);
				}
			}
		}
    }

    private function getAllBooks()
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
	
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$query = "SELECT `COL 1`, `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`, `COL 18`, `COL 19`, `COL 20`, `COL 21`, `COL 22`, `COL 23`, `COL 24`, `COL 25`, `COL 26`, `COL 27` FROM car_insurance_claim";

			if ($result = $connection->query($query))
			{
				while ($row = $result->fetch_assoc())
				{
					$this->books[] = new Claim(
						$row["COL 1"], $row["COL 2"], $row["COL 3"], $row["COL 4"], $row["COL 5"], $row["COL 6"], 
						$row["COL 7"], $row["COL 8"], $row["COL 9"], $row["COL 10"], $row["COL 11"], $row["COL 12"], 
						$row["COL 13"], $row["COL 14"], $row["COL 15"], $row["COL 16"], $row["COL 17"], $row["COL 18"], 
						$row["COL 19"], $row["COL 20"], $row["COL 21"], $row["COL 22"], $row["COL 23"], $row["COL 24"], 
						$row["COL 25"], $row["COL 26"], $row["COL 27"]
					);
				}
				$result->close();
			}
			$connection->close();
		}

	}	 

    private function getBookById($id)
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
		
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$query = "SELECT `COL 2`, `COL 3`, `COL 4`, `COL 5`, `COL 6`, `COL 7`, `COL 8`, `COL 9`, `COL 10`, `COL 11`, `COL 12`, `COL 13`, `COL 14`, `COL 15`, `COL 16`, `COL 17`, `COL 18`, `COL 19`, `COL 20`, `COL 21`, `COL 22`, `COL 23`, `COL 24`, `COL 25`, `COL 26`, `COL 27` FROM car_insurance_claim WHERE `COL 1` = ?";
			$statement = $connection->prepare($query);
			$statement->bind_param('i', $id);
			$statement->execute();
			$statement->store_result();
			$statement->bind_result($KIDSDRIV,$BIRTH,$AGE,$HOMEKIDS,$YOJ,$INCOME,$PARENT1,$HOME_VAL,$MSTATUS,$GENDER,$EDUCATION,$OCCUPATION,
			$TRAVTIME,$CAR_USE,$BLUEBOOK,$TIF,$CAR_TYPE,$RED_CAR,$OLDCLAIM,$CLM_FREQ,$REVOKED,$MVR_PTS,$CLM_AMT,$CAR_AGE,$CLAIM_FLAG,$URBANICITY);
			if ($statement->fetch())
			{
				return new Claim($id, $KIDSDRIV, $BIRTH, $AGE, $HOMEKIDS, $YOJ, $INCOME, $PARENT1, $HOME_VAL, $MSTATUS, $GENDER, $EDUCATION, $OCCUPATION,
                $TRAVTIME, $CAR_USE, $BLUEBOOK, $TIF, $CAR_TYPE, $RED_CAR, $OLDCLAIM, $CLM_FREQ, $REVOKED, $MVR_PTS, $CLM_AMT, $CAR_AGE, $CLAIM_FLAG, $URBANICITY);
			}
			else
			{
				return null;
			}
			$statement->close();
			$connection->close();
		}
	}	

	/*
    private function getBooksByDate($year, $month, $day)
    {
		global $dbserver, $dbusername, $dbpassword, $dbdatabase;
	
		$connection = new mysqli($dbserver, $dbusername, $dbpassword, $dbdatabase);
		if (!$connection->connect_error)
		{
			$date = $year."-".$month."-".$day;
			$query = "SELECT id, title, author, genre, publishdate, description, price FROM car_insurance_claim WHERE publishdate >= ?";
			$statement = $connection->prepare($query);
			$statement->bind_param('s', $date);
			$statement->execute();
			$statement->store_result();
			$statement->bind_result($id, $title, $author, $genre, $publishdate, $description, $price);
			while ($statement->fetch())
			{
				$this->books[] = new Book($id, $title, $author, $genre, $publishdate, $description, $price);
			}
			$statement->close();
			$connection->close();
		}
	}	 
	*/

    private function extractBookFromJSON($requestBody)
    {
		// This function is needed because of the perculiar way json_decode works. 
		// By default, it will decode an object into a object of type stdClass.  There is no
		// way in PHP of casting a stdClass object to another object type.  So we use the
		// approach of decoding the JSON into an associative array (that's what the second
		// parameter set to true means in the call to json_decode). Then we create a new
		// Book object using the elements of the associative array.  Note that we are not
		// doing any error checking here to ensure that all of the items needed to create a new
		// book object are provided in the JSON - we really should be.
		$bookArray = json_decode($requestBody, true);
		$claim = new Claim($bookArray['ID'],
						 $bookArray['KIDSDRIV'],
						 $bookArray['BIRTH'],
						 $bookArray['AGE'],
						 $bookArray['HOMEKIDS'],
						 $bookArray['YOJ'],
						 $bookArray['INCOME'],
						 $bookArray['PARENT1'],
						 $bookArray['HOME_VAL'],
						 $bookArray['MSTATUS'],
						 $bookArray['GENDER'],
						 $bookArray['EDUCATION'],
						 $bookArray['OCCUPATION'],
						 $bookArray['TRAVTIME'],
						 $bookArray['CAR_USE'],
						 $bookArray['BLUEBOOK'],	
						 $bookArray['TIF'],
						 $bookArray['CAR_TYPE'],
						 $bookArray['RED_CAR'],
						 $bookArray['OLDCLAIM'],
						 $bookArray['CLM_FREQ'],
						 $bookArray['REVOKED'],
						 $bookArray['MVR_PTS'],
						 $bookArray['CLM_AMT'],
						 $bookArray['CAR_AGE'],
						 $bookArray['CLAIM_FLAG'],
						 $bookArray['URBANICITY']);
		unset($bookArray);
		return $claim;
	}
}
?>