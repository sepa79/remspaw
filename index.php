<!DOCTYPE html>
<html lang="en">
  <head>
<?php include ('header.php'); ?>
  </head>
  <body>
<?php include ('navbar.php'); ?>
    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-3">Rem-Spaw</h1>
        <p>P.P.H.U. "Rem-Spaw" Marian Dziurgot</p>
      </div>
    </div>
    <div class="container">
      <h4>Wybierz:</h4>
      <div class="row">
        <div class="col-md-4">
          <h2>Na stanie</h2>
          <p>Lista urządzeń przyjętych do naprawy.</p>
          <p><a class="btn btn-block btn-primary" href="/stan/spawarki.php" role="button">Lista spawarek</a></p>
          <p><a class="btn btn-sm btn-block btn-outline-dark" href="/niebangla.php" role="button">Lista palników</a></p>
        </div>
        <div class="col-md-4">
          <h2>Przyjecia</h2>
          <p>Formularze przyjęcia do naprawy.</p>
          <p><a class="btn btn-sm btn-block btn-outline-primary" href="/przyjecia/spawarka.php" role="button">Przyjęcie spawarki</a></p>
          <p><a class="btn btn-sm btn-block btn-outline-dark" href="/niebangla.php" role="button">Przyjęcie palnika</a></p>
        </div>
        <div class="col-md-4">
          <h2>Warsztat</h2>
          <p>Formularze warsztatowe.</p>
          <p><a class="btn btn-sm btn-block btn-outline-primary" href="/warsztat/spawarki.php" role="button">Lista spawarek - wszystko</a></p>
          <p><a class="btn btn-sm btn-block btn-outline-dark" href="/warsztat/spawarki.php?filter=rozpoznanie" role="button">Lista spawarek - rozpoznanie</a></p>
          <p><a class="btn btn-sm btn-block btn-outline-dark" href="/warsztat/spawarki.php?filter=naprawa" role="button">Lista spawarek - naprawa</a></p>
          <p><a class="btn btn-sm btn-block btn-outline-dark" href="/niebangla.php" role="button">Lista palników</a></p>
        </div>
      </div>
      <hr>
      <footer>
        <p>&copy; Remspaw 2018</p>
      </footer>
    </div> <!-- /container -->
  </body>
</html>
