<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php'; 

$shoulderwidth = isset($_POST['shoulderwidth']) ? $_POST['shoulderwidth'] : '';
$chestwidth = isset($_POST['chestwidth']) ? $_POST['chestwidth'] : '';
$cuff = isset($_POST['cuff']) ? $_POST['cuff'] : '';
$sleevelength = isset($_POST['sleevelength']) ? $_POST['sleevelength'] : '';
$bodylength = isset($_POST['bodylength']) ? $_POST['bodylength'] : '';
$reqcategory = isset($_POST['reqcategory']) ? $_POST['reqcategory'] : '';
$fname = isset($_POST['fname']) ? $_POST['fname'] : '';
$lname = isset($_POST['lname']) ? $_POST['lname'] : '';
$gender = isset($_POST['gender']) ? $_POST['gender'] : '';
$address = isset($_POST['address']) ? $_POST['address'] : '';
$email = isset($_POST['email']) ? $_POST['email'] : '';
$phone = isset($_POST['phone']) ? $_POST['phone'] : '';
$additionalinfo = isset($_POST['additionalinfo']) ? $_POST['additionalinfo'] : '';

if (empty($shoulderwidth) || empty($chestwidth) || empty($cuff) || empty($sleevelength) || empty($bodylength) || empty($fname) || empty($lname) || empty($gender) || empty($address) || empty($email) || empty($phone)) {
    echo "Please fill in all required fields.";
    exit;
}

$message = "
    <html>
    <head>
        <title>New Form Submission</title>
    </head>
    <body>
        <h2>Form Submission Details</h2>

        <h4 style='text-decoration: underline;'>Category</h4>
        <p><strong>Category:</strong> $reqcategory</p>

        <h4 style='text-decoration: underline;'>Gown Measurements</h4>
        <p><strong>Shoulder Width:</strong> $shoulderwidth</p>
        <p><strong>Chest Width:</strong> $chestwidth</p>
        <p><strong>Cuff:</strong> $cuff</p>
        <p><strong>Sleeve Length:</strong> $sleevelength</p>
        <p><strong>Body Length:</strong> $bodylength</p>

        <h4 style='text-decoration: underline;'>Personal Details</h4>
        <p><strong>First Name:</strong> $fname</p>
        <p><strong>Last Name:</strong> $lname</p>
        <p><strong>Gender:</strong> $gender</p>
        <p><strong>Address:</strong> $address</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Phone:</strong> $phone</p>
        <p><strong>Additional Info:</strong> $additionalinfo</p>
    </body>
    </html>
";

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = 'mukudutinotenda@gmail.com';
    $mail->Password   = 'lvrn rsas kppe mdil'; 
    $mail->SMTPSecure = 'tls';
    $mail->Port       = 587;

    $mail->setFrom($email, $fname . ' ' . $lname);
    $mail->addAddress('mukudutinotenda@gmail.com'); 

    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body    = $message;

    $mail->send();
    echo 'success'; 
} catch (Exception $e) {
    echo "There was a problem sending your email. Mailer Error: {$mail->ErrorInfo}";
}
?>
