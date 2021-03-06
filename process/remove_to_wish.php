<?php

require 'utilities.php';

function validateAction($username, $itemName)
{
    $result = findProduct($itemName);
    if (!doesUserExist($username)) {
        return false;
    }
    if (is_null($result)) {
        return false;
    }
    if (!hasOnWishlist($username, $itemName)) {
        return false;
    }
    return true;
}

session_start();
$username = $_SESSION['user'];
$items = explode(',', $_POST['items']);


foreach ($items as $item) {
    if (validateAction($username, $item)) {
        removeToWishlist($username, $item);
    }
}
