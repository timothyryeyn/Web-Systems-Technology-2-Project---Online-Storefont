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
    if (hasOnWishlist($username, $itemName)) {
        return false;
    }
    return true;
}

$username = $_POST['username'];
$itemName = $_POST['item_name'];

if (validateAction($username, $itemName)) {
    //addToWish($username, $itemName);
    echo 'a';
}
