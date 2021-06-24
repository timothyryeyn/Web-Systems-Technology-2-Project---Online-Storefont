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

$username = $_POST['username'];
$items = json_decode($_POST['items']);

foreach ($items as $name => $qty) {
    if (validateAction($username, $name)) {
        //removeToCart($username, $itemName);
        echo $name . "\n";
    }
}
