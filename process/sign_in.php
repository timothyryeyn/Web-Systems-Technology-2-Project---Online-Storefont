<?php

require 'utilities.php';

$username = $_POST['username'];
$password = $_POST['password'];

echo isUserExisting($username, $password) ? 'yes' : 'no';
