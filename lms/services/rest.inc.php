<?php

/*
 * File : Rest.inc.php
 * Author : Arun Pitchai
 *
 */
class REST
{

    public $_content_type = "application/json";

    public $_request = array();

    private $_method = "";

    private $_code = 200;

    public function __construct()
    {
        $this->inputs();
    }

    /**
     * *
     * Method to get the HTTP REferer
     */
    public function getReferer()
    {
        return $_SERVER['HTTP_REFERER'];
    }

    /**
     * *
     * Method to return output response
     *
     * @param array $data            
     * @param int $status            
     */
    public function response($data, $status)
    {
        $this->_code = ($status) ? $status : 200;
        $this->setHeaders();
        echo $data;
        exit();
    }

    /**
     * *
     * Method to convert array to json
     *
     * @param array $data            
     * @return string
     */
    public function json($data)
    {
        if (is_array($data)) {
            return json_encode($data);
        }
    }

    /**
     * *
     * Method to get the status message
     *
     * @return string
     */
    private function getStatusMessage()
    {
        $status = array(
            100 => 'Continue',
            101 => 'Switching Protocols',
            200 => 'OK',
            201 => 'Created',
            202 => 'Accepted',
            203 => 'Non-Authoritative Information',
            204 => 'No Content',
            205 => 'Reset Content',
            206 => 'Partial Content',
            300 => 'Multiple Choices',
            301 => 'Moved Permanently',
            302 => 'Found',
            303 => 'See Other',
            304 => 'Not Modified',
            305 => 'Use Proxy',
            306 => '(Unused)',
            307 => 'Temporary Redirect',
            400 => 'Bad Request',
            401 => 'Unauthorized',
            402 => 'Payment Required',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            406 => 'Not Acceptable',
            407 => 'Proxy Authentication Required',
            408 => 'Request Timeout',
            409 => 'Conflict',
            410 => 'Gone',
            411 => 'Length Required',
            412 => 'Precondition Failed',
            413 => 'Request Entity Too Large',
            414 => 'Request-URI Too Long',
            415 => 'Unsupported Media Type',
            416 => 'Requested Range Not Satisfiable',
            417 => 'Expectation Failed',
            500 => 'Internal Server Error',
            501 => 'Not Implemented',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            504 => 'Gateway Timeout',
            505 => 'HTTP Version Not Supported'
        );
        
        return ($status[$this->_code]) ? $status[$this->_code] : $status[500];
    }

    /**
     * *
     * Method to get the request method
     */
    public function getRequestMethod()
    {
        return $_SERVER['REQUEST_METHOD'];
    }

    private function inputs()
    {
        switch ($this->getRequestMethod()) {
            case "POST":
                $inputJSON = file_get_contents('php://input');
                $this->_request = $this->cleanInputs($inputJSON);
                break;
            case "GET":
                $this->_request = $this->cleanInputs($_GET);
                break;
            default:
                $this->response('', 406);
                break;
        }
    }

    private function cleanInputs($data)
    {
        $cleanInputArray = array();
        if (is_array($data)) {
            foreach ($data as $k => $v) {
                $cleanInputArray[$k] = $this->cleanInputs($v);
            }
        } else {
            $data = trim($data);
            $cleanInputArray = json_decode( $data, TRUE );
        }
        return $cleanInputArray;
    }

    private function setHeaders()
    {
        header("HTTP/1.1 " . $this->_code . " " . $this->getStatusMessage());
        header("Content-Type:" . $this->_content_type);
    }
}

?>