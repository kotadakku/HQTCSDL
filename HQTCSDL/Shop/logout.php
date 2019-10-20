<?php

session_start();
if(session_destroy()) // Destroying All Sessions
{
header("Location: products.php"); // Redirecting To Home Page
}

?>
