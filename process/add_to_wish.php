<?php

require 'utilities.php';

function validateAction($username, $itemName)
{
    $result = findProduct($itemName);
    if (!doesUserExist($username)) {
        return -1;
    }
    if (is_null($result)) {
        return -2;
    }
    if (hasOnWishlist($username, $itemName)) {
        return -3;
    }
    return 1;
}

session_start();
$username = isset($_SESSION['user']) ? $_SESSION['user'] : '';
$itemName = $_POST['item_name'];

switch (validateAction($username, $itemName)) {
    case -1:
        echo 'no-user';
        break;
    case -2;
        echo 'no-product';
        break;
    case -3;
        echo 'already-wished';
        break;
    case 1;
        echo 'success';
        addToWish($username, $itemName);
        break;
}
