<?php

require 'utilities.php';

$user = $_POST['user'];
$otherUser = $_POST['other_user'];

if (doesUserExist($user)) {
    echo displayConversationOfUserWith($user, $otherUser);
}
