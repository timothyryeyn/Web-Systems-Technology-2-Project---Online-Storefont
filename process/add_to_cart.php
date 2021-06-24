<?php

require 'utilities.php';

function validateAction($username, $itemName, $qty)
{
    $result = findProduct($itemName);
    if (!doesUserExist($username)) {
        return false;
    }
    if (is_null($result)) {
        return false;
    }
    if ($result->stock < $qty) {
        return false;
    }
    return true;
}

$username = $_POST['username'];
$itemName = $_POST['item_name'];
$qty = $_POST['qty'];

if (validateAction($username, $itemName, $qty)) {
    //addToCart($username, $itemName, $qty);
    echo '1';
}
