<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Headers: content-type');
  header("Content-Type: text/html; charset=utf-8");

  require 'rb.php';

  function md5codegenerator() {
    $simv = array ("9", "8", "7", "6", "5", "4", "3", "2", "1", "0", "k", "l", "m", "n", "o", "p", "q", "r", "s", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "t", "u", "v", "w", "x", "y", "z");
    $code = "";
    for ($k = 0; $k < 8; $k++)
    {
      shuffle ($simv);
      $code = $code.$simv[1];
    }
    $code=md5($code);
        return $code;
  }

  $_POST = json_decode(file_get_contents('php://input'), true);

  if (isset($_POST["password"]) && isset($_POST["phone"]) && $_POST["password"] != '' && $_POST["phone"] != '')
  {
    $DB_Adress = "127.0.0.1";
    $DB_BaseName = "magicacademy";
    $DB_Login = "root";
    $DB_Password = "";

    // R::setup();
    R::setup( 'mysql:host=127.0.0.1;dbname=magicacademy', $DB_Login, $DB_Password );

    // $mysqli = new mysqli ($DB_Adress, $DB_Login, $DB_Password, $DB_BaseName);

    session_start();
    // $phone = mysqli_real_escape_string($mysqli, strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
    // $password = mysqli_real_escape_string($mysqli, $_POST["password"]); // htmlspecialchars($_POST["password"]);
    $phone = htmlspecialchars(strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
    $password = htmlspecialchars($_POST["password"]); // htmlspecialchars($_POST["password"]);

    $error = ((empty($password)) || (empty($phone)));

    if (!$error){
      $posts = R::findOne('users', ' phone LIKE ?', [ $phone ] );
      if (!$posts) {
        $codecheckmail = md5codegenerator();
        $password = password_hash($password,PASSWORD_DEFAULT);
        $post = R::dispense( 'users' );
        $post->phone = $phone;
        $post->password = $password;
        $post->email_confirm_code = $codecheckmail;
        $id = R::store( $post );
        echo json_encode (array('success' => TRUE, 'error' => NULL));
      } else {
        echo json_encode (array('success' => FALSE, 'error' => 'Такой телефон уже зарегистрирован'));
      }
      
      // $mysqli->query("SET NAMES 'utf8'");
      //Проверяем нет ли такой почты

      // $result = $mysqli->query("SELECT * FROM `users` WHERE `password` LIKE '".md5($password)."' AND `email` LIKE '$email'");
      // Сначала проверяем не существует ли уже такого пользователя
      // $result = $mysqli->query("SELECT * FROM `users` WHERE `phone` LIKE '$phone'");
      // $mysqli-> close();
      

      // if ($result->num_rows > 0) {
      //   echo json_encode (array('error' => 'Такой телефон уже зарегистрирован'));
      // }
      // else
      // {
      //   // echo json_encode (array('error' => 'Регистрация возможна'));
      // //   if ($mysqli->query("SELECT * FROM `users` WHERE `phone` LIKE '$phone'") === TRUE) {
      // //     echo "New record created successfully";
      // // } else {
      // //     // echo "Error: " . $mysqli->error;
      // //     // var_dump($res->fetch_all())
      // // }
        
      //   // $codecheckmail = md5codegenerator();
      //   // $password = password_hash($password,PASSWORD_DEFAULT);//md5(htmlspecialchars($_POST["password"]));
      //   // Создаем пользователя
      //   // $mysqli = new mysqli ($DB_Adress, $DB_Login, $DB_Password, $DB_BaseName);
      //   $result = $mysqli->query("INSERT INTO `users` (phone, password, email, name) VALUES ('44444', '33333', 'test', Test')");
      //   // $user = mysqli_fetch_assoc($result);
      //   // echo $result;
      //   if ($result) {
      //     $results=$result->fetchAll(PDO::FETCH_COLUMN);
      //     var_dump($resultы->fetch_all());
      //   }
      //   else {
      //       // Handle errors
      //   }
        
      // }
    }
    else {
      echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести телефон и парольь'));
    }
  } 
  else
  {
    echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести телефон и пароль'));
  }
?>
