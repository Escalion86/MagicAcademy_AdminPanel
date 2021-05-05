<?php
  header("Access-Control-Allow-Origin: *");
  header('Access-Control-Allow-Methods: *');
  header('Access-Control-Allow-Headers: content-type');
  header("Content-Type: text/html; charset=utf-8");

  require 'plugins/rb.php';
  require_once 'plugins/sms.ru.php';

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

  $phase = htmlspecialchars($_POST["phase"]);
  $phone = htmlspecialchars(strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
  $password = htmlspecialchars($_POST["password"]); // htmlspecialchars($_POST["password"]);
  $smscode = htmlspecialchars($_POST["smscode"]);
  $name = htmlspecialchars($_POST["name"]);

  if (!empty($phase) && !empty($phone) && (!($phase == "1" && empty($smscode))) || (!($phase == "2" && (empty($password) || empty($smscode)|| empty($name)))))
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
     // 0 - только начал и нужно отправить смс код
     // 1 - получаем от пользователя смс код
     // 2 - получаем пароль
    // $phase = htmlspecialchars($_POST["phase"]);
    // $phone = htmlspecialchars(strtolower(trim($_POST["phone"]))); //htmlspecialchars(strtolower(trim($_POST["phone"])));
    // $password = htmlspecialchars($_POST["password"]); // htmlspecialchars($_POST["password"]);
    // $smscode = htmlspecialchars($_POST["smscode"]);

    // $error = (empty($phase) || empty($phone) || ($phase == "1" && empty($smscode)) || ($phase == "2" && (empty($password) || empty($smscode))));

    // $error = (((empty($password)) && (empty($smscode))) || (empty($phone)));

    // if (!$error){
      $user = R::findOne('users', ' phone LIKE ?', [ $phone ] );
      // Если пользователь новый
      if (!$user) {
        // Проверяем что начальная фаза
        // echo $phase;
        if ($phase == '0') {
          $smscodenew = mt_rand ( 10000, 99999 );
          $user = R::dispense( 'users' );
          $user -> phone_confirm_code = $smscodenew;
          $user -> phone = $phone;
          $id = R::store( $user );
          echo json_encode (array('success' => TRUE, 'error' => NULL, 'phase' => '0'));
        }
        else {
          echo json_encode (array('success' => FALSE, 'error' => 'Такой телефон уже зарегистрирован', 'phase' => '0'));
        }

        

        // $data = new stdClass();
        // $data->to = '79138370020';
        // $data->text = 'Hello World'; // Текст сообщения
        // // $data->from = ''; // Если у вас уже одобрен буквенный отправитель, его можно указать здесь, в противном случае будет использоваться ваш отправитель по умолчанию
        // // $data->time = time() + 7*60*60; // Отложить отправку на 7 часов
        // // $data->translit = 1; // Перевести все русские символы в латиницу (позволяет сэкономить на длине СМС)
        // // $data->test = 1; // Позволяет выполнить запрос в тестовом режиме без реальной отправки сообщения
        // // $data->partner_id = '1'; // Можно указать ваш ID партнера, если вы интегрируете код в чужую систему
        // $sms = $smsru->send_one($data); // Отправка сообщения и возврат данных в переменную

        // if ($sms->status == "OK") { // Запрос выполнен успешно
        //     echo "Сообщение отправлено успешно. ";
        //     echo "ID сообщения: $sms->sms_id. ";
        //     echo "Ваш новый баланс: $sms->balance";
        // } else {
        //     echo "Сообщение не отправлено. ";
        //     echo "Код ошибки: $sms->status_code. ";
        //     echo "Текст ошибки: $sms->status_text.";
        // }

        // $codecheckmail = md5codegenerator();
        // $password = password_hash($password,PASSWORD_DEFAULT);
        // $post = R::dispense( 'users' );
        // $post->phone = $phone;
        // $post->password = $password;
        // $post->email_confirm_code = $codecheckmail;
        // $id = R::store( $post );
        // echo json_encode (array('success' => TRUE, 'error' => NULL));
      } else {
        // Пользователь такой есть - смотрим фазу
        if ($phase == '0') { // если получен телефон
          $user = R::findOne('users', ' phone LIKE ?', [ $phone ] );
          // Проверяем существует ли пароль и если есть, то выводим что пользователь уже зареган
          if ($user->password <> '') {
            echo json_encode (array('success' => FALSE, 'error' => 'Такой пользователь уже зарегистрирован', 'phase' => '0'));
          } else {
            $smscodenew = mt_rand ( 10000, 99999 );
            // $user = R::dispense( 'users' );
            // echo $smscodenew;
            $user -> phone_confirm_code = $smscodenew;
            R::store( $user );
            echo json_encode (array('success' => TRUE, 'error' => NULL, 'phase' => '0'));
          }
          
        }
        if ($phase == '1') { // если ждем смс код
          
          if ($user['phone_confirm_code'] == strval($smscode)) {
            echo json_encode (array('success' => TRUE, 'error' => NULL, 'phase' => '1'));
          } else {
            echo json_encode (array('success' => FALSE, 'error' => 'Неверный код', 'phase' => '1'));
          }
        }
        if ($phase == '2') { // если ждем пароль с смс кодом
          // $user = R::findOne('users', ' phone LIKE ?', [ $phone ] );
          if ($user['phone_confirm_code'] ==  strval($smscode)) {
            // $user = R::dispense( 'users' );
            $user -> phone_confirm_code = NULL;
            $user -> password = password_hash($password,PASSWORD_DEFAULT);
            $user -> name = $name;
            R::store( $user );
            echo json_encode (array('success' => TRUE, 'error' => NULL, 'phase' => '2'));
          } else {
            echo json_encode (array('success' => FALSE, 'error' => 'Неверный код', 'phase' => '2'));
          }
        }
        // else {
        //   echo json_encode (array('success' => FALSE, 'error' => 'Такой телефон уже зарегистрирован', 'phase' => '0'));
        // }

        // echo json_encode (array('success' => FALSE, 'error' => 'Такой телефон уже зарегистрирован'));
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
    // }
    // else {
    //   echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести телефон и парольь'));
    // }
  } 
  else
  {
    if ($phase == '0') {
      echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести телефон'));
    }
    if ($phase == '1') {
      echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести код из смс'));
    }
    if ($phase == '2') {
      echo json_encode (array('success' => FALSE, 'error' => 'Необходимо ввести имя и пароль'));
    }
  }
?>
