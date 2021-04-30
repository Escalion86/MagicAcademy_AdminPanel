<?php
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: content-type');
header("Content-Type: text/html; charset=utf-8");
$data = 'apple';

echo 'TEST';


<?php
  header("Content-Type: text/html; charset=utf-8");
  if (isset($_POST["send"]))
  {
    $_POST["send"];
    $_POST["firstName"];
    $_POST["lastName"];
  }
?>
<?php
 header("Content-Type: text/html; charset=utf-8");
 $DB_Name = "EscalCRM";
 $DB_Adress = "127.0.0.1";
 $DB_BaseName = "magicacademy";

 session_start();
 if (isset($_POST["send"]))
 {
  $email = htmlspecialchars(strtolower(trim($_POST["email"])));
  $password = htmlspecialchars($_POST["password"]);
  $_SESSION["email"]=$email;
  $error=false;
  $error_email="";
  $error_password="";
  if($email==""||!preg_match("/@/",$email))
  {
   $error_email="Введите правильный EMail";
   $error = true;
  }
   if ($password=="")
  {
   $error_password="Введите пароль";
   $error = true;
  }
	 if (!$error){

		$mysqli = new mysqli ($DB_Adress, "root", "", $DB_BaseName);
		$mysqli->query("SET NAMES 'utf8'");
		//Проверяем нет ли такой почты

		// $result = $mysqli->query("SELECT * FROM `users` WHERE `password` LIKE '".md5($password)."' AND `email` LIKE '$email'");
        $result = $mysqli->query("SELECT * FROM `users` WHERE `password` LIKE '$password' AND `email` LIKE '$email'");
		$mysqli-> close();
		if ($result->num_rows == 0) {
			$error_email="Неверный EMail или пароль";
		}
		 else
		 {
			setcookie('email',$email, time()+3600, '/');
			//setcookie('id',$email, time()+3600, '/');
			header("Location: dist/index.html");
		 }
	 }
 }
?>