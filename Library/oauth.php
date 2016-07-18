<?php
/**
* Example of simple product POST using Admin account via Magento REST API. OAuth authorization is used

$callbackUrl = "http://172.24.144.144/gama/oauth_customer.php";
$temporaryCredentialsRequestUrl = "http://172.24.144.144/gama/shop/admin/oauth/initiate?oauth_callback=" . urlencode($callbackUrl);
$adminAuthorizationUrl = 'http://172.24.144.144/gama/shop/oauth_authorize';
$accessTokenRequestUrl = 'http://172.24.144.144/gama/shop/oauth/token';
$apiUrl = 'http://172.24.144.144/gama/shop/api/rest';
$consumerKey = '671a98db126a8d2e3276cb859384f1ee';
$consumerSecret = '001bcf70dc3f0ef27286d326058d3033';
*/
$callbackUrl = "http://172.24.144.144/oauth_customer.php";
$temporaryCredentialsRequestUrl = "http://172.24.144.144/gama/shop/admin/oauth/initiate?oauth_callback=" . urlencode($callbackUrl);
$adminAuthorizationUrl = 'http://172.24.144.144/gama/shop/admin/oauth_authorize';
$accessTokenRequestUrl = 'http://172.24.144.144/gama/shop/oauth/token';
$apiUrl = 'http://172.24.144.144/gama/shop/api/rest';
$consumerKey = '671a98db126a8d2e3276cb859384f1ee';
$consumerSecret = '001bcf70dc3f0ef27286d326058d3033';

session_start();
print_r($_SESSION); exit;
if (!isset($_GET['oauth_token']) && isset($_SESSION['state']) && $_SESSION['state'] == 1) {
	echo "asd"; 
    $_SESSION['state'] = 0;
}
try {
	echo "asdas";
    $authType = ($_SESSION['state'] == 2) ? OAUTH_AUTH_TYPE_AUTHORIZATION : OAUTH_AUTH_TYPE_URI;
    $oauthClient = new OAuth($consumerKey, $consumerSecret, OAUTH_SIG_METHOD_HMACSHA1, $authType);
    // $oauthClient = new OAuth($consumerKey,$consumerSecret);
    echo "<pre>";
    print_r($oauthClient);
    
    $oauthClient->enableDebug();

    if (!isset($_GET['oauth_token']) && !$_SESSION['state']) {
			echo "fff";
        $requestToken = $oauthClient->getRequestToken($temporaryCredentialsRequestUrl);
        print_r($requestToken); 
        $_SESSION['secret'] = $requestToken['oauth_token_secret'];
        $_SESSION['state'] = 1;
        header('Location: ' . $adminAuthorizationUrl . '?oauth_token=' . $requestToken['oauth_token']);
        exit;
    } else if ($_SESSION['state'] == 1) {
			echo "ddd";
        $oauthClient->setToken($_GET['oauth_token'], $_SESSION['secret']);
        $accessToken = $oauthClient->getAccessToken($accessTokenRequestUrl);
        print_r($accessToken); 
        $_SESSION['state'] = 2;
        $_SESSION['token'] = $accessToken['oauth_token'];
        $_SESSION['secret'] = $accessToken['oauth_token_secret'];
        header('Location: ' . $callbackUrl);
        exit;
    } else {
			echo "ggg";
        $oauthClient->setToken($_SESSION['token'], $_SESSION['secret']);
        $resourceUrl = "$apiUrl/products";
        $$oauthClient->fetch($resourceUrl);
        $productsList = json_decode($oauthClient->getLastResponse());
        print_r($productsList);
    }
} catch (OAuthException $e) {
     print_r($e);
    print_r($e);
    
}
