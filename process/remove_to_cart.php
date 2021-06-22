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
    return true;
}

$username = 's';
$itemName = 'Energen';

if (validateAction($username, $itemName)) {
    //removeToCart($username, $itemName);
}
