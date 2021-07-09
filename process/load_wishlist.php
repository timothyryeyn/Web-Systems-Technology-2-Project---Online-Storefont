<?php

require 'utilities.php';

session_start();
$username = $_SESSION['user'];

if (doesUserExist($username)) {
    echo displayWishlistOfUser($username);
}
