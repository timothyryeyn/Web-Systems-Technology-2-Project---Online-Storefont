<?php

require 'utilities.php';

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

$username = 's';
$items = array('Eneragen' => '20', 'Milo' => '20');

if (validateAction($username, $items)) {
    //purchaseItemOrItems($username, $items);
}

//purchaseItemOrItems($username, $items);
