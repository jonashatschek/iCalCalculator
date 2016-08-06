<doctype html>
<html>
    <head>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"></script>
        <script src="js.js"></script>
        <link rel="stylesheet" type="text/css" href="style.css">
        <meta charset="utf-8">
        <title>copyPasteHaveFun</title>
    </head>
    <body>
        <div id="inputFrame-div">
            <p>Paste your Calender input</p>
            <textarea class="inputCalTextArea" placeholder="Paste here"></textarea>
            <p>Lön per arbetad timme</p>
            <input type="text" id="inputSalary" class="inputSalary"><br><br>
            <input type="button" id="submitBtn" value="Räkna!">
        </div>
        <div id="outputDiv">
            <p>Output:</p>
            <div id="outputFrame-div">

            </div>
        </div>
    </body>
</html>
