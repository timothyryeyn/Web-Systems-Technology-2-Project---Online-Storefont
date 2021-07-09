<?php
require 'utilities.php';

session_start();
$username = $_SESSION['user'];
$items = json_decode($_POST['items']);

function validateAction($username, $items)
{
    if (!doesUserExist($username)) {
        return false;
    }
    foreach ($items as $name => $qty) {
        $result = findProduct($name);

        if (is_null($result)) {
            return false;
        }
        if ($result->stock < $qty) {
            return false;
        }
    }
    return true;
}

if (validateAction($username, $items)) {
    purchaseItemOrItems($username, $items);
}
