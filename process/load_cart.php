<?php

require 'utilities.php';

session_start();
$username = $_SESSION['user'];

echo displayCartItemsOfUser($username);
