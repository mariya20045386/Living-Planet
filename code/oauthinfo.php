<?php

/*********************************************
******************************************
* Title: oauthinfo.php
* Author: Mariya Razzak
* Date: 03/06/2024
* Code version: 1.0
* Availability: /oauthinfo.php
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
// Add a scope for authorising the app
$client->addScope('https://www.googleapis.com/auth/userinfo.email');

// Check user authentication
if (isset($_SESSION['access_token']) && $_SESSION['access_token']) {
    //set the Google OAuth client access token
    $client->setAccessToken($_SESSION['access_token']);
    // Display OAuth information to the user and allow them to sign out
    echo "<p>You have been signed in.</p>";
    echo "<form action='oauthinfo.php' method='post'>
        <input type='submit' name='signOut' value='Sign Out' />
    </form>";
    echo "<h1>OAuth</h1>

    <p>OAuth is a protocol that is used for authenticating and authorising users (Google for Developers, 2024). 
    It works by initially, getting the OAuth 2.0 client credentials (client ID and client secret)
    through the Google API console (Google for Developers, 2024). 
    Next, the client application requests an access token from the Google Authorization Server, 
    retrieves the token from the response, then sends it to the desired Google API (Google for Developers, 2024).
    </p>
    
    <p>The website uses OAuth 2.0 to authenticate users so that they can access google APIs. OAuth 2.0 enables user data to
    be shared with an application i.e. the website, but also keeps there information such as username and passwords private (Google for Developers, 2019). 
    
    The OAuth 2.0 flow is designed for user authorisation, so applications can store confidential information while also maintaining state (Google for Developers, 2019).
    
    It works by initially, getting the OAuth 2.0 client credentials (client ID and client secret)
    through the Google API console (Google for Developers, 2019).
    Next, the client application requests an access token from the Google Authorization Server, 
    retrieves the token from the response, then sends it to the desired Google API (Google for Developers, 2019).</p>";
} else {
    // If the user is not authorised, redirect them to the Google OAuth sign in page
    $redirect_uri = 'http://' . $_SERVER['HTTP_HOST'] . '/oauth2callback.php';
    header('Location: ' . filter_var($redirect_uri, FILTER_SANITIZE_URL));
}

// If the user signs out, revoke the client token and destroy the session
if ($_SERVER['REQUEST_METHOD'] == 'POST' and isset($_POST['signOut'])) {
    $client->revokeToken($_SESSION['access_token']);
    session_destroy();
    // Redirect the user to the home page
    $redirect = 'http://' . $_SERVER['HTTP_HOST'] . '/index.html';
    header('Location: ' . filter_var($redirect, FILTER_SANITIZE_URL));
}
?>
