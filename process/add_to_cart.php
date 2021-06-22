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

$username = 'a';
$itemName = 'Energen';
$qty = '99';

if (validateAction($username, $itemName, $qty)) {
    //addToCart($username, $itemName, $qty);
}
