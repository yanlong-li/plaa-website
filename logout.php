<?php
include_once 'common.php';

session_destroy();
Header('Location: index.php');
