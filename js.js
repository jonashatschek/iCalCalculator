$(document).ready(function(){

        $("#submitBtn").click(function() {
            var text = $(".inputCalTextArea").val();
            var input = new InputDate(text);
        });


        function getFocusPoint (text, eventDescription, date, month, year, hours) {

            var word = eventDescription + date + month + year + hours[0] + hours[1];
            alert(word);

            for (var i = 0; i > text.length; i++){
                word = text.substr(i, i + 12)

                if (word == "Schemalagd:"){
                    text = text.substr(0)

                    //Fråga om jag kan jobba hemifrån onsdag
                    //Schemalagd: 6 apr. 2016 16:00 till 17:00
                    }
            }

        }

        function InputDate (text){

            var getDescriptionTest = getEventDescription(text);
            var getMonthTest =  getMonth(text);
            var getDateTest = getDate(text, getMonthTest[1]);
            var getHoursTest = getHours(text);
            var getYearTest = getYear(text);
            var trim = getFocusPoint(text, getDescriptionTest, getDateTest, getMonthTest[2], getYearTest, getHoursTest);

            $("#outputFrame-div").append(getDescriptionTest + '<br/>' + getDateTest  +  getMonthTest[0] + getYearTest +  getHoursTest + '.' + '<br/>');
        }

        function getEventDescription (text){

            var firstLetter = text[text.length - 39];
            var getDescription = 0;
            var returnEvent = " ";

            if(firstLetter == "S" || firstLetter == "c" || firstLetter == "h")   {

                //if firstLetter = "S" = alla månader utom maj och datum 9 <
                //if firstLetter = "c" = antingen är det maj eller så är det ensiffrigt
                //if "h" = både ensiffrigt och maj

                switch (firstLetter) {
                    case "S":
                    break;

                    case "c":
                    getDescription = 1;
                    break;

                    case "h":
                    getDescription = 2;
                    break;
                }

                for (var i = 0; i < text.length - (39 + getDescription); i++){

                    returnEvent += text[i];
                }

            }

            else    {

                alert("Something went wrong!");
            }

            return returnEvent;
        }

        $("div").css("border", "1px solid red");

        //TODO: implementera funktionalitet för minuter
        function getHours(text){
            var inputLength = text.length;

            var startingHour = 15;
            var finishingHour = 4;
            var startingTime = "";
            var finishingTime = "";

            for (var i = 1; i >= 0; i--){

            var iterateStart = startingHour + i;
            var iterateFinish = finishingHour + i;

            startingTime += text[inputLength - iterateStart];
            finishingTime += text[inputLength - iterateFinish];

            }

            var hoursCount = countHours(startingTime, finishingTime);
            startingTime = " från kl. " + startingTime;
            finishingTime = " till kl. " + finishingTime;
            var returnHourArray = [startingTime, finishingTime, hoursCount];

            return returnHourArray;
        }

        function countHours (start, finish){
            startingHourInt = parseInt(start);
            finishingHourInt = parseInt(finish);

            var amountOfHours = finishingHourInt - startingHourInt;

            if (amountOfHours > 1 || amountOfHours == 0) {
                var returnAmountString = " vilket totalt blir " + amountOfHours + " timmar";
            }
            else {
                var returnAmountString = " vilket totalt blir " + amountOfHours + " timme";
            }

            var salaryPerHour = $(".inputSalary").val();

            if(salaryPerHour != null){
                var returnSalary = " och din lön blir " + getSalary(amountOfHours, salaryPerHour) + " innan skatteavdrag";
            }

            var returnAmountArray = [returnAmountString, returnSalary];
            return returnAmountArray;
        }

        function getDate(text, type){

            var date = "";

            if (type == 1){
                var firstNumber = text[text.length - 29];
                var lastNumber = text[text.length - 28];

                if(firstNumber == " "){
                    date = lastNumber;
                }
                else {
                    date = firstNumber + lastNumber;
                }
            }
            else if (type == 2){

                var firstNumber = text[text.length - 28];
                var lastNumber = text[text.length - 27];

                if (firstNumber == " "){
                    date = lastNumber;
                }
                else {
                    date = firstNumber + lastNumber;

                }
            }
            else {
                alert("Wrong type");
            }

            /*
            if(lastNumber == " "){
                var date = firstNumber;
            }
            else{
                var date = firstNumber + lastNumber;
            }
            */

            date = "Planerad " + date + " ";

            return date;
        }

        function getMonth (text) {

            var inputLength = text.length;
            var month = "";
            var type = 0;
            //type 1 => 4 chars
            //type 2 = 3 chars

            for (var i = 25; i >= 23; i--){
                month += text[inputLength - i];
            }
            var formatKeeper = "";

            formatKeeper = month;

            switch (month) {

                case "an.":
                    month = "januari";
                    type = 1;
                    break;

                case "eb.":
                    month = "februari";
                    type = 1;
                    break;

                case "ars":
                    month = "mars";
                    type = 1;
                    break;

                case "pr.":
                    month = "april";
                    type = 1;
                    break;

                case "maj":
                    type = 2;
                    break;

                case "uni":
                    month = "juni";
                    type = 1;
                    break;

                case "uli":
                    month = "juli";
                    type = 1;
                    break;

                case "ug.":
                    month = "augusti";
                    type = 1;
                    break;

                case "ept.":
                    month = "september";
                    type = 1;
                    break;

                case "kt.":
                    month = "oktober";
                    type = 1;
                    break;

                case "ov.":
                    month = "november";
                    type = 1;
                    break;

                case "ec.":
                    month = "december";
                    type = 1;
                    break;

                default:
                    alert("Wrong input format on month.");
                    break;
            }

            var returnArray = [month, type, formatKeeper];
            return returnArray;
        }

        function getYear (text){
            var inputLength = text.length;
            var year = " år ";

            for (var i = 21; i > 17; i--){
                year += text[inputLength - i];
            }

            return year;
        }

        function getSalary (amountOfHours, salary){

            var result = amountOfHours * salary;
            return result;
        }
    //};
});

