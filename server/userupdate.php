<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Headers: content-type');
  header("Content-Type: text/html; charset=utf-8");

  require 'plugins/rb.php';

  $_POST = json_decode(file_get_contents('php://input'), true);

  $phone = htmlspecialchars(strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
  $name = htmlspecialchars($_POST["name"]);
  $email = htmlspecialchars($_POST["email"]);
  $birthday = htmlspecialchars($_POST["birthday"]);
  $sex = htmlspecialchars($_POST["sex"]);
  $password = htmlspecialchars($_POST["password"]);

  if (!empty($phone) && !empty($name) && !empty($email) && isset($birthday) && isset($sex))
  {
    $DB_Adress = "127.0.0.1";
    $DB_BaseName = "magicacademy";
    $DB_Login = "root";
    $DB_Password = "";

    R::setup( 'mysql:host=127.0.0.1;dbname=magicacademy', $DB_Login, $DB_Password );


    session_start();
      $user = R::findOne('users', ' phone LIKE ?', [ $phone ] );
      // Если пользователь новый
      if ($user) {
        if (password_verify($password, $user['password'])) {
          $user -> phone = $phone;
          $user -> name = $name;
          $user -> email = $email;
          $user -> birthday = $birthday;
          $user -> sex = $sex;
          R::store( $user );
          echo json_encode(array('success' => TRUE, 'error' => NULL, 'user' => $user));
        } else {
          // Если пароль не совпадает
          echo json_encode (array('success' => FALSE, 'error' => 'Ошибка авторизации. Неверный пароль'));
        }
      } else {
        // Если такого пользователя нет, то возвращаем ошибку
        echo json_encode (array('success' => FALSE, 'error' => 'Ошибка авторизации, такого пользователя не существует'));
      }
  } 
  else
  {
    // Если не все параметры переданы
    echo json_encode (array('success' => FALSE, 'error' => 'Недостаточно параметров для обновления пользователя', 'params' => file_get_contents('php://input')));
  }
?>
