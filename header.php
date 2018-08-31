<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="/favicon.ico">

<title>RemSpaw</title>

<!-- Bootstrap core CSS -->
<link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">

<!-- Custom styles for this template -->
<link rel="stylesheet" type="text/css" href="/css/jumbotron.css">
<link rel="stylesheet" type="text/css" href="/css/fontawesome-all.min.css">
<link rel="stylesheet" type="text/css" href="/css/angular-material.min.css">

<style>
/* AngularJS MAterial - bledy w formularzach */
.inputErrors .RemSpawApp {
  min-height: 48px; }

.inputErrors md-input-container > p {
  font-size: 0.8em;
  text-align: left;
  width: 100%; }
/* radio input box */
.md-radio-interactive input {
    pointer-events: all;
}
/* male przyciski do tabelek */
.md-button.md-tableButton {
    padding: 0 3px 0 3px;
    margin: 0px 0px 0px 0px;
    min-width: 200px;
    min-height: 24px;
    line-height: 24px;
    border-radius: 1px;
    font-size: 14px;
    text-align: justify;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    outline: none;
}
.md-button.md-tableButtonShort {
    padding: 0 3px 0 3px;
    margin: 0px 2px 0px 2px;
    min-width: 30px;
    min-height: 24px;
    line-height: 24px;
    border-radius: 1px;
    font-size: 14px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    border: none;
    outline: none;
}
/* Coby sie dialogi pokazywaly nad navbarem */
.md-dialog-container {
  z-index: 1040;
}
/* Uzywane z ng-tables Hack - zamiast bootstrapowej wersji, bo ng-tables uzywa boota 3 */
.paginationGroup {
    /* font-size: 16px; */
    margin: 0px 0;
    padding: 3px 15px 3px 15px;
    /* color: rgb(49, 46, 46); */
    /* background-color: rgba(224, 224, 224, 0.96); */
    /* text-transform: none;
    font-weight: 400; */
    border: 0.5px solid rgba(224, 224, 224, 0.96);
    border-radius: 0px;
    min-width:60px;
    line-height: 20px;
}
/* Padding coby NavBar nie zaslanial gory strony */
body {
  padding-top: 50px;
}
</style>

<!-- Common JS-->
<!-- <script src="./js/fontawesome/fontawesome-all.js"></script> -->
<script src="/js/jquery-3.2.1.min.js"></script>
<script src="/js/popper.min.js"></script>
<script src="/js/bootstrap.min.js"></script>
<script src="/js/moment.min.js"></script>
<script src="/js/locale/pl.js" charset="UTF-8"></script>
<script>
  moment.locale('pl');  // Set the default/global locale
</script>
<script src="/js/lodash.min.js"></script>
<script src="/js/ie10-viewport-bug-workaround.js"></script>
<script src="/app/CommonFunctions.js"></script>
<script src="/js/angular.min.js"></script>
<script src="/js/angular-resource.min.js"></script>
<script src="/js/angular-animate.min.js"></script>
<script src="/js/angular-aria.min.js"></script>
<script src="/js/angular-messages.min.js"></script>
<script src="/js/angular-material.min.js"></script>
<script src="/js/elasticsearch.angular.min.js"></script>
