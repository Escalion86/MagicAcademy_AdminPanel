<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Headers: content-type');
  header("Content-Type: text/html; charset=utf-8");

  require 'rb.php';

  $_POST = json_decode(file_get_contents('php://input'), true);

  if (isset($_POST["password"]) && isset($_POST["phone"]) && $_POST["password"] != '' && $_POST["phone"] != '')
  {
    $DB_Adress = "127.0.0.1";
    $DB_BaseName = "magicacademy";
    $DB_Login = "root";
    $DB_Password = "";

    

    // $mysqli = new mysqli ($DB_Adress, $DB_Login, $DB_Password, $DB_BaseName);

    // session_start();
    // $phone = mysqli_real_escape_string($mysqli, strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
    // $password = mysqli_real_escape_string($mysqli, $_POST["password"]); // htmlspecialchars($_POST["password"]);
    
    $phone = htmlspecialchars(strtolower(trim($_POST["phone"])));
    $password = htmlspecialchars($_POST["password"]);

    $error = ((empty($password)) || (empty($phone)));

    if (!$error){
      R::setup( 'mysql:host=127.0.0.1;dbname=magicacademy', $DB_Login, $DB_Password );
      $user = R::findOne('users', '`phone` = ?', array($phone));
        if (!password_verify($password, $user['password'])) {
          echo json_encode (array('success' => FALSE, 'error' => 'Неверный телефон или пароль'));
        } else {
          echo json_encode(array('success' => TRUE, 'error' => NULL, 'user' => $user));
        }

      // $mysqli->query("SET NAMES 'utf8'");
      // //Проверяем нет ли такой почты

      // // $result = $mysqli->query("SELECT * FROM `users` WHERE `password` LIKE '".md5($password)."' AND `email` LIKE '$email'");
      // $result = $mysqli->query("SELECT * FROM `users` WHERE `password` LIKE '$password' AND `phone` LIKE '$phone'");
      // $mysqli-> close();
      // if ($result->num_rows == 0) {
      //   echo json_encode (array('success' => FALSE, 'error' => 'Неверный телефон или пароль'));
      // }
      // else
      // {
      //   // echo json_encode (array('user' => array('name' => '')));
      //   $user = mysqli_fetch_assoc($result);
      //   echo json_encode(array('success' => TRUE, 'error' => NULL, 'user' => $user));
      // }
    }
    else {
      echo json_encode (array('success' => FALSE, 'error' => 'Неверный телефон или пароль'));
    }
  } 
  else
  {
    echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести телефон и пароль'));
  }
?>
