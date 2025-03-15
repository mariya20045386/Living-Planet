<?php
/*********************************************
******************************************
* Title: oauth2callback.php
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /oauth2callback.php
*
**********************************************
*****************************************/

// Run autoload.php file in vendor folder which contains the Google OAuth dependencies
require_once __DIR__.'/vendor/autoload.php';

session_start();

// Create a Google Client object
$client = new Google\Client();
// Pass details from Google OAuth client JSON file to the client object
$client->setAuthConfig('client_secret.json');
// Set the redirect URI to the oauth2callback.php file
$client->setRedirectUri('http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php');
// Add a scope for authorising the app
$client->addScope('https://www.googleapis.com/auth/userinfo.email');

// Check user authentication
if (!isset($_SESSION['access_token']) && !isset($_GET['code'])) {
    $auth_url = $client->createAuthUrl();
    header('Location: ' . filter_var($auth_url, FILTER_SANITIZE_URL));
} else {
    // If the user is authorised, get the access token and allow access to index.php
    if (isset($_GET['code'])) {
        $client->authenticate($_GET['code']);
        $_SESSION['access_token'] = $client->getAccessToken();
        $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/oauthinfo.php';
        header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
    }
}
?>
