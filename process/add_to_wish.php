<?php

require 'utilities.php';

$username = 's';
$itemName = 'Del Monte';

if (hasOnWishlist($username, $itemName)) {
    echo 'has';
} else {
    addToWish($username, $itemName);
    echo 'added';
}
