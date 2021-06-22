<?php

require 'utilities.php';

function validate($username, $password, $fullName, $address, $phoneNum)
{
    $un = "\"username\":\"" . preg_match('/^[a-z\d_]{5,20}$/i', $username) . "\"";

    echo $un;
}

/*
{"product":[{"name":"Milo","price":"10.00","stock":"100"},
{"name":"Energen","price":"12.00","stock":"100"}]}
*/

$username = '';
$password = '';
$fullName = '';
$address = '';
$phoneNum = '';

//validate($username, $password, $fullName, $address, $phoneNum);

//addNewUser($username, $password, $fullName, $address, $phoneNum);
