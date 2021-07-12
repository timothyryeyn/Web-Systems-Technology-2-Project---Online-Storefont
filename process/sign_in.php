<?php

require 'utilities.php';

$username = $_POST['username'];
$password = $_POST['password'];

$result = isUserExisting($username, $password);

// echo $result['username'];
// echo $result->address;
// echo $result->phoneNumber;

if (!is_null(json_encode($result))) {
    session_start();
    if (!is_null($result['username'])) {
        $_SESSION['user'] = strval($result['username']);
        setcookie('fullname', strval($result->fullName), time() + (86400 * 30), "/");
        setcookie('address', strval($result->address), time() + (86400 * 30), "/");
        setcookie('phone', strval($result->phoneNumber), time() + (86400 * 30), "/");
        echo 'success';
    } else {
        echo 'fail';
    }
} else {
    echo 'fail';
}
