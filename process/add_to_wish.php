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

$username = 's';
$itemName = 'Del Monte';

if (validateAction($username, $itemName)) {
    //addToWish($username, $itemName);
}
