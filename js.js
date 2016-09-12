$(document).ready(function(){

        $("#submitBtn").click(function() {

            var text = $(".inputCalTextArea").val();
            var input = new InputDate(text);

        });

        function InputDate (input){

            var separatedInput = getInput(input);

            //alert(separatedInput);

            /*
            var getDescriptionTest = getEventDescription1(separatedInput);
            var getMonthTest =  getMonth(separatedInput);
            var getDateTest = getDate(separatedInput, getMonthTest[1]);
            var getHoursTest = getHours(separatedInput);
            var getYearTest = getYear(separatedInput);
            //var trim = getFocusPoint(text, getDescriptionTest, getDateTest, getMonthTest[2], getYearTest, getHoursTest);
            */
            //$("#outputFrame-div").append('<br/>' + '<br/>' + getDateTest  +  getMonthTest[0] + " år " + getYearTest +  " från kl. " + getHoursTest[0] + " till kl. " + getHoursTest[1] + '.' + '<br/>');

            //$("#outputFrame-div").append(testInput);

        }

        function getInput (input) {

            var descriptionAndDetails = "";
            var description = getEventDescription(input, "Schemalagd");
            var details = defineEnding(input.substring(description[1], input.length)); //sends in input without first event

            descriptionAndDetails = description[0] + details;


//Pappa fyller år
//Schemalagd: 23 aug. 2016 12:00 till 13:00

            $("#outputFrame-div").append(descriptionAndDetails);

            return descriptionAndDetails;

        }

        function getEventDescription (text, keyword) {

            var spotlight = "";
            var searchForDividePoint = keyword;
            var description = ["", ""];
            var test = text;

            for (var i = 0; i < text.length; i++){

                spotlight = test.substring(i, i+10);

                if(spotlight == searchForDividePoint){

                    description = [text.substring(0, i), i];

                    return description;
                }
            }

        }

        function defineEnding (input) {

            var dateArray = getDate(input);
            var monthArray = getMonth(input, dateArray[1]);
            var definedDetailsArray = defineDetailLength(dateArray[1], monthArray[1]);
            var yearArray = getYear(input, definedDetailsArray[2]);
            var hoursArray = getHours(input, yearArray[1]);

            var endingDetails = [dateArray[0], monthArray[2], yearArray[0], hoursArray[0], hoursArray[1]];
            alert(endingDetails);

            return endingDetails;

        }

        function defineDetailLength (dateType, monthType) {

            var monthTypeString = "";
            var dateTypeString = "";
            var pointer = 0;


            if (dateType == 1 && monthType == 1){
                dateTypeString = "single";
                monthTypeString = "long";
                pointer = 19;

            }
            else if (dateType == 1 && monthType == 2) {
                dateTypeString = "single";
                monthTypeString = "short";
                pointer = 18;
            }
            else if (dateType == 2 && monthType == 1) {
                dateTypeString = "double";
                monthTypeString = "long";
                pointer = 20;
            }
            else {
                dateTypeString = "double";
                monthTypeString = "short";
                pointer = 19;
            }

            var typeAndPointerReturnArray = [dateTypeString, monthTypeString, pointer];

            return typeAndPointerReturnArray;

        }

        $("div").css("border", "1px solid red");

        //TODO: implementera funktionalitet för minuter
        function getHours(input, startingPoint){

            var startingHour = startingPoint;
            var finishingHour = startingPoint + 11;
            var startingTime = "";
            var finishingTime = "";

                for (var i = 0; i <= 1; i++){

                    startingTime += input[startingHour + i];
                    finishingTime += input[finishingHour + i];

                }

            var hoursCount = countHours(startingTime, finishingTime);
            startingTime = " " + startingTime + ":00";
            finishingTime = " " + finishingTime + ":00";
            var returnHourArray = [startingTime, finishingTime, hoursCount[0], hoursCount[1]];

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

        //TODO: work with this so its compatible with the new month-setup
        function getDate(input){

            var date = "";
            var dateTypeString = 0;

            var firstNumber = input[12];
            var secondNumber = input[13];

            if(secondNumber == " "){
                date = firstNumber;
                dateTypeString = 1;
            }
            else {
                date = firstNumber + secondNumber;
                dateTypeString = 2;
            }

            var dateAndDateTypeReturnArray = [date, dateTypeString];

            return dateAndDateTypeReturnArray;

        }

        function getMonth (input, dateTypeString){

            var inputLength = input.length;
            var month = "";
            var type = 0;
            var i = 15;
            var defineLength = 0;
            //type 1 => 4 chars
            //type 2 = 3 chars

            if (dateTypeString == 2){
                i = 16;
            }

            defineLength = i + 3;

            for (; i < defineLength; i++){

                month += input[i];
            }

            var formatKeeper = "";

            switch (month) {

                case "an.":
                    month = "januari";
                    type = 1;
                    formatKeeper = "jan.";
                    break;

                case "eb.":
                    month = "februari";
                    type = 1;
                    formatKeeper = "feb.";
                    break;

                case "ars":
                    month = "mars";
                    type = 1;
                    formatKeeper = "mars";
                    break;

                case "pr.":
                    month = "april";
                    type = 1;
                    formatKeeper = "apr.";
                    break;

                case "maj":
                    type = 2;
                    formatKeeper = "maj";
                    break;

                case "uni":
                    month = "juni";
                    type = 1;
                    formatKeeper = "juni";
                    break;

                case "uli":
                    month = "juli";
                    type = 1;
                    formatKeeper = "juli";
                    break;

                case "ug.":
                    month = "augusti";
                    type = 1;
                    formatKeeper = "aug."
                    break;

                case "ept.":
                    month = "september";
                    type = 1;
                    formatKeeper = "sep.";
                    break;

                case "kt.":
                    month = "oktober";
                    type = 1;
                    formatKeeper = "okt.";
                    break;

                case "ov.":
                    month = "november";
                    type = 1;
                    formatKeeper = "nov.";
                    break;

                case "ec.":
                    month = "december";
                    type = 1;
                    formatKeeper = "dec.";
                    break;

                default:
                    alert("Wrong input format on month.");
                    break;
            }

            var returnArray = [month, type, formatKeeper];
            return returnArray;
        }

        function getYear (input, startingPoint){

            var year = "";

            for (var i = startingPoint; i < startingPoint + 4; i++){
                year += input[i];
            }

            var yearAndNewStartingPointArray = [year, startingPoint + 5];

            return yearAndNewStartingPointArray;
        }

        function getSalary (amountOfHours, salary){

            var result = amountOfHours * salary;
            return result;
        }
    //};
});