<!DOCTYPE html>
<html lang="en">
  <head>
<?php include ('header.php'); ?>
  </head>
  <body>
<br/>
<br/>
<br/>
Robimy update z GITa...<br/>
<?php include ('navbar.php');
$output = "<pre>Git:".shell_exec("../runGit.sh")."</pre>";
echo $output;
?>
  </body>
</html>
