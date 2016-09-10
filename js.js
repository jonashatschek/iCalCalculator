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

            var description = "";
            var details = "";
            var descriptionAndDetails = "";
            description = getEventDescription1(input, "Schemalagd");
            details = defineEnding(input.substring(description[1], input.length)); //sends in input without first event
            //alert(details);
            descriptionAndDetails = description + " " + details;
            return descriptionAndDetails;

        }

        function getEventDescription1 (text, keyword) {

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

            var textHolder = "";
            var countSemicolonsInInput = 0;

            var dateReturn = getDate1(input);
            alert(dateReturn);
            var monthArray = getMonth(input, dateReturn[1]);
            alert(monthArray);

            for (var i = 0; i < input.length; i++){

                textHolder += input[i]; //copies a part of the input into a separate variable

                if(textHolder == ":"){

                    countSemicolonsInInput++;

                }

                if (countSemicolonsInInput == 2){

                    return textHolder;
                    break;

                }

            }

        }

        /*
        function getEventDescription (text){

            var firstLetter = text[text.length - 39];
            var descriptionType = 0;
            var eventDescription = "";
            var eventLength = 0;

            if(firstLetter == "S" || firstLetter == "c" || firstLetter == "h"){

                //if firstLetter = "S" = alla månader utom maj och datum 9 <
                //if firstLetter = "c" = antingen är det maj eller så är det ensiffrigt
                //if "h" = både ensiffrigt och maj

                switch (firstLetter) {
                    case "S":
                    break;

                    case "c":
                    descriptionType = 1;
                    break;

                    case "h":
                    descriptionType = 2;
                    break;
                }

                for (var i = 0; i < text.length - (39 + descriptionType); i++){

                    eventDescription += text[i];
                }

            }

            else    {

                alert("Something went wrong!");
            }
            eventLength = eventDescription.length;

            var lengthAndDataReturnArray = [eventDescription, eventLength];

            return lengthAndDataReturnArray;
        }
        */

        $("div").css("border", "1px solid red");

        //TODO: implementera funktionalitet för minuter
        function getHours(input){

            var startingHour = 15;
            var finishingHour = 4;
            var startingTime = "";
            var finishingTime = "";

                for (var i = 1; i >= 0; i--){

                    var iterateStart = startingHour + i;
                    var iterateFinish = finishingHour + i;

                    startingTime += input[input.length - iterateStart];
                    finishingTime += input[input.length - iterateFinish];

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
        function getDate1(input){

            var date = "";
            var dateType = 0;

            var firstNumber = input[12];
            var secondNumber = input[13];

            if(secondNumber == " "){
                date = firstNumber;
                dateType = 1;
            }
            else {
                date = firstNumber + secondNumber;
                dateType = 2;
            }

            var dateAndDateTypeReturnArray = [date, dateType];

            return dateAndDateTypeReturnArray;

        }

        function getMonth (input, dateType){

            var inputLength = input.length;
            var month = "";
            var type = 0;
            var i = 15;
            var defineLength = 0;
            //type 1 => 4 chars
            //type 2 = 3 chars

            if (dateType == 2){
                i = 16;
            }

            defineLength = i + 3;

            for (; i < defineLength; i++){

                month += input[i];
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
            var year = "";

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