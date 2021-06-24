<?php

require 'utilities.php';

function validate($username, $password, $fullName, $address, $phoneNum)
{
    if (
        is_string($username) && is_string($password)
        && is_string($fullName) && is_string($address)
        && is_string($phoneNum)
    ) {
        return true;
    }

    return false;
}

$username = $_POST['username'];
$password = $_POST['password'];
$fullName = $_POST['full_name'];
$address = $_POST['address'];
$phoneNum = $_POST['phone_num'];

if (validate($username, $password, $fullName, $address, $phoneNum)) {
    //addNewUser($username, $password, $fullName, $address, $phoneNum);   
}
