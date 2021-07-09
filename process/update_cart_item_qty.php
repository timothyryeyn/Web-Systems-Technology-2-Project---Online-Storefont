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

session_start();
$username = $_SESSION['user'];
$items = json_decode($_POST['items']);

foreach ($items as $name => $qty) {
    if (validateAction($username, $name)) {
        //removeToCart($username, $itemName);
        updateItemQtyOnCart($username, $items);
    }
}
