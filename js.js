$(document).ready(function(){

        $("#submitBtn").click(function() {

            var text = $(".inputCalTextArea").val();
            var input = new InputDate(text);

        });

        function InputDate (input){

            var remainingInput = input;
            var remainingInputLength = 0;

            for (var i = 0; i < input.length; i++) {

                if (remainingInput === ""){
                    break;
                }
                remainingInputLength = getInput(remainingInput);
                
                remainingInput = remainingInput.substring(remainingInputLength, remainingInput.length);

            }

        }

        function getInput (input) {

            var descriptionAndDetails = "";
            var description = getEventDescription(input, "Schemalagd");
            var details = defineEnding(input.substring(description[1], input.length)); //sends in input without first event
            var remainingLength = publishEventOnSite(description, details);

            return remainingLength;

        }

        function publishEventOnSite (description, details) {

            //Pappa fyller år
            //Schemalagd: 23 aug. 2016 12:00 till 13:00
            var stringCounter = description[0] + "Schemalagd: " + details[0] + " " + details[1] + " " + details[2] + " " + details[3] + " till " + details[4];
            $("#outputFrame-div").append('<br>' + description[0] + "Schemalagd: " + details[0] + " " + details[1] + " " + details[2] + " " + details[3] + " till " + details[4] + details[5] + '<br>');
            return stringCounter.length;
        }

        function getEventDescription (text, keyword) {

            var spotlight = "";
            var searchForDividePoint = keyword;
            var description = ["", ""];

            for (var i = 0; i < text.length; i++){

                spotlight = text.substring(i, i+10);

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

            var endingDetails = [dateArray[0], monthArray[2], yearArray[0], hoursArray[0], hoursArray[1], hoursArray[3]];

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
                var returnSalary = " och din lön blir " + getSalary(amountOfHours, salaryPerHour) + " kr innan skatteavdrag.";
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

            var month = "";
            var type = 0;
            var i = 15;
            var defineLength = 0;
            //type 1 => 4 chars
            //type 2 = 3 chars

            if (dateTypeString == 2){
                i = 15
            }

            defineLength = i + 4;

            for (; i < defineLength; i++){

                month += input[i];
            }

            var formatKeeper = "";

            switch (month) {

                case "jan.":
                    month = "januari";
                    type = 1;
                    formatKeeper = "jan.";
                    break;

                case "feb.":
                    month = "februari";
                    type = 1;
                    formatKeeper = "feb.";
                    break;

                case "mars":
                    month = "mars";
                    type = 1;
                    formatKeeper = "mars";
                    break;

                case "apr.":
                    month = "april";
                    type = 1;
                    formatKeeper = "apr.";
                    break;

                case "maj ":
                    type = 2;
                    formatKeeper = "maj";
                    break;

                case "juni":
                    month = "juni";
                    type = 1;
                    formatKeeper = "juni";
                    break;

                case "juli":
                    month = "juli";
                    type = 1;
                    formatKeeper = "juli";
                    break;

                case "aug.":
                    month = "augusti";
                    type = 1;
                    formatKeeper = "aug."
                    break;

                case "sept.":
                    month = "september";
                    type = 1;
                    formatKeeper = "sep.";
                    break;

                case "okt.":
                    month = "oktober";
                    type = 1;
                    formatKeeper = "okt.";
                    break;

                case "nov.":
                    month = "november";
                    type = 1;
                    formatKeeper = "nov.";
                    break;

                case "dec.":
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
});