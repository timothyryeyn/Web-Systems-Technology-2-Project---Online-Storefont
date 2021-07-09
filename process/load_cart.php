<?php

require 'utilities.php';

$username = $_SESSION['user'];

echo displayCartItemsOfUser($username);
