<?php

require 'utilities.php';

function validateAction($sender, $receiver, $msg)
{
    if (!doesUserExist($sender)) {
        return false;
    }
    if (!doesUserExist($receiver)) {
        return false;
    }
    if (!is_string($msg)) {
        return false;
    }
    return true;
}

$sender = 'a';
$receiver = '4';
$msg = '';

if (validateAction($sender, $receiver, $msg)) {
    // addMessage($sender, $receiver, $msg, true);
    // addMessage($receiver, $sender, $msg, false);
}
