<?php

require 'utilities.php';

$username = $_POST['username'];
$password = $_POST['password'];

$result = isUserExisting($username, $password);

if (!is_null($result)) {
    session_start();
    $_SESSION['user'] = $result;
    echo 'success';
} else {
    echo 'fail';
}
