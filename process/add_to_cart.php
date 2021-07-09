<?php

require 'utilities.php';

function validateAction($username, $itemName, $qty)
{
    $result = findProduct($itemName);
    if (!doesUserExist($username)) {
        return -1;
    }
    if (is_null($result)) {
        return -2;
    }
    if ($result->stock < $qty) {
        return -3;
    }
    return 1;
}

session_start();
$username = isset($_SESSION['user']) ? $_SESSION['user'] : '';
$itemName = $_POST['item_name'];
$qty = $_POST['qty'];

switch (validateAction($username, $itemName, $qty)) {
    case -1:
        echo 'no-user';
        break;
    case -2;
        echo 'no-product';
        break;
    case -3;
        echo 'invalid-qty';
        break;
    case 1;
        echo 'success';
        addToCart($username, $itemName, $qty);
        break;
}
