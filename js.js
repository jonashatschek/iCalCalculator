$(document).ready(function(){

        $("#submitBtn").click(function() {
            var text = $(".inputCalTextArea").val();
            var input = new InputDate(text);
        });

        function InputDate (input){

            var separatedInput = getInput(input);
            alert(separatedInput);

            //var getDescriptionTest = getEventDescription(separatedInput);
            var getMonthTest =  getMonth(separatedInput);
            var getDateTest = getDate(separatedInput, getMonthTest[1]);
            var getHoursTest = getHours(separatedInput);
            var getYearTest = getYear(separatedInput);
            //var trim = getFocusPoint(text, getDescriptionTest, getDateTest, getMonthTest[2], getYearTest, getHoursTest);
            
            $("#outputFrame-div").append('<br/>' + getDescriptionTest + '<br/>' + getDateTest  +  getMonthTest[0] + " år " + getYearTest +  " från kl. " + getHoursTest[0] + " till kl. " + getHoursTest[1] + '.' + '<br/>');

            //$("#outputFrame-div").append(testInput);

        }

        function getInput (input) {

            var separatedInput = "";

            separatedInput = getEventDescription1(input, "Schemalagd");
            return separatedInput;

        }

        function getEventDescription1 (text, keyword) {
            alert(keyword);

            var spotlight = "";
            var searchForDivider = keyword;
            var description = "";

            for (var i = 0; i < text.length; i++){

                spotlight = text.substring(i, i+10);
                alert(spotlight);

                if(spotlight == searchForDivider){

                    description = text.substring(0, i);
                    alert(description);
                    return description;
                }
            }

        }

        function defineEnding (input) {

            var description = getEventDescription(input);
            var trimDescriptionFromInput = input.substring(description[1], input.length);          
            var textHolder = "";
            var countZerosInInput = 0;

            for (var i = 0; i < input.length; i++) {

                textHolder += input[i];

                if(!isNaN(input[i])){

                    countZerosInInput++;

                    if(countZerosInInput >= 8) {

                        var eventAndDescriptionReturnArray = [description[0], textHolder];
                        return eventAndDescriptionReturnArray;

                    }
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

            date = "" + date + " ";

            return date;
        }

        function getMonth (text){

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