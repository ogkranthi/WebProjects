    /**
     * Created by kranthikumar on 2/23/17.
     */



    // Initial arguments to be passed to the general purpose function createDropDown
    var firstLevel = 'listID0';
    var loadFirst = -1;

    // Call the general purpose function to create the initial elements
    document.body.onload = createDropDown(firstLevel,loadFirst);


    /*
    General Purpose function that generates the select elements.
    dropSelected: Will be used to fetch the corresponding data from Jsonp file
    levelID: is used to set the IDs for the created select elements
     */
    function createDropDown(dropSelected,levelID) {

        // DHTML for sliding the Title
        slide();

        //Level id that maintains the level of the dropdown created
        levelID = levelID + 1;
        var ele = document.getElementById('div1');
        var select = document.createElement('select');
        var currentID = select.id = "listID" + (levelID);
        var currentSelected = dropSelected;

        //Consuming Data from Jsonp file
        var states = jsonstr[currentSelected];
        var stopt = document.createElement('option');

        //flag is used to find if any corresponding element is present or if it is the final element selected
        var flag = 0;
        stopt.value = stopt.text = "SELECT";
        select.appendChild(stopt);

        //checks for the data from the jsonp file
        if (states !== undefined) {

            states.forEach(function (element) {
                stopt = document.createElement('option');
                stopt.value = stopt.text = element;
                select.appendChild(stopt);

            } );
        } else {
            flag = 1;
        }

        /*If all levels are created or if the final level is reached,
          create the correspoding buttons
        */
        if (levelID > 3 || flag == 1){
            var clickMe = document.createElement('BUTTON');
            clickMe.id = 'finalSelect';
            var applytext = document.createTextNode("YOUR SELECTION");
            clickMe.appendChild(applytext);
            document.body.appendChild(clickMe);
            var applyButton = document.createElement('BUTTON');
            applyButton.id = 'Apply';
            var applyButtonText = document.createTextNode("APPLY");
            applyButton.appendChild(applyButtonText);
            document.body.appendChild(applyButton);


            //Event listeners for the buttons created later to validate forms, reset
            document.getElementById('finalSelect').addEventListener("click",function () {
                var divFinalFlag = document.getElementById('finalDiv');
            //create the final div element if it is not created yet. To avoid multiple creations.
                if (divFinalFlag === null){
                    createFinal();
                }
            });

            document.getElementById('Apply').addEventListener("click",function () {
                var divFormFlag = document.getElementById('divForm');
                if (divFormFlag === null){
                    createForm();

                    document.getElementById('submitFinal').addEventListener("click", function () {validateForm();clearFields();});
                }
                     });


        } else {
            ele.appendChild(select);
            document.getElementsByTagName('body')[0].appendChild(ele);
            document.getElementById(currentID).addEventListener("change", function () {
                deleteNodes(levelID);
                myfunction(levelID);
            });
        }
    }

    /*
    createFinal function is used to list out the final elements of the selected choice by the users on the webpage
     */
    function createFinal() {
        var curID;
        var curIDElement;
        var curselectedindex;
        var curselectedObject;
        var divElement = document.createElement("div");
        divElement.id = 'finalDiv';
        document.body.appendChild(divElement);
        var olElement = document.createElement("ol");
            for (i = 0; i < 4; i++) {
                curID = "listID" + (i);
                curIDElement = document.getElementById(curID);
                if (curIDElement !== null){
                    curselectedindex = curIDElement.selectedIndex;
                    curselectedObject = document.getElementById(curID).options[curselectedindex];
                    var ulEle = document.createElement('li');
                    var inp = document.createTextNode(curselectedObject.text);
                    ulEle.appendChild(inp);
                    olElement.appendChild(ulEle);
                    }
            }

        divElement.appendChild(olElement);

    }

    /*
    createForm function is used for creating the form elements, by fetching the data from the array. More data can be
    put into the array or jsonp can be used for data retrieval for large elements
     */

    function createForm() {
        var formDivContainer = document.createElement("div");
        formDivContainer.id = "divContainer";
        var formDiv = document.createElement("div");
        formDiv.id = "divForm";
        var formEle = document.createElement("FORM");
        formEle.id = "eleForm";
        var formLabels = ["FirstName", "Lastname", "Email", "College", "City"];

        for (i=0;i<5;i++){
            var inpEle = "inpEle" + i;
            inpEle = document.createElement("INPUT");
            inpEle.id = "Label" + i;
            inpEle.setAttribute("type","text");
            inpEle.setAttribute("placeholder",formLabels[i]);
            formEle.appendChild(inpEle);

        }

        //Elements appended and divs created for styling
        formDiv.appendChild(formEle);
        var validateButton = document.createElement('BUTTON');
        validateButton.id = 'submitFinal';
        var validateText = document.createTextNode("SUBMIT");
        validateButton.appendChild(validateText);
        document.body.appendChild(validateButton);
        formDiv.appendChild(validateButton);
        formDivContainer.appendChild(formDiv)
        document.body.appendChild(formDivContainer);

    }


    //validateForm validates the data the users enters and checks if anything is left blank or if the email is in right format(basic check)
    function validateForm(){
        var checkfield = true;
        for (i=0;i<5;i++){
            var fields = document.getElementById("Label"+i);
            if (fields.value == ""){
                alert("Any of the Fields cannot be left blank");
                checkfield = false;
                break;
            }
        }
        //validation
        if (checkfield){
            var emailField = document.getElementById("Label2").value;
            var atIndex = emailField.indexOf("@");
            var dotIndex = emailField.indexOf(".");
            //email validation
            if (atIndex == null || atIndex < 1 || dotIndex == null || dotIndex == emailField.length-1 || dotIndex <1 || atIndex == emailField.length-1
                || dotIndex-atIndex < 2 ){
                alert("Enter a valid email");

            } else {
                localStore();
            }
        }
    }

    //Using Local storage for storing the user firstname only.
    function localStore() {

        if (typeof (Storage) !== "undefined") {
            if (localStorage.getItem('user') == 'undefined' || localStorage.getItem('user') == null) {
                localStorage.setItem('user',document.getElementById('Label0').value);
                alert("Hello guest. Your details have been saved");
            }
            else {
                alert("Welcome back "+ localStorage.getItem('user')+ ". We have your details");
            }
        }
        else {
            alert('Your browser does not support localstorage...');
        }
    }



    //clearFields clears the fields when submit button is clicked
    function clearFields(){
        for (i=0;i<5;i++){
           document.getElementById('Label'+i).value = "";
        }
    }

    //slide function for dynamic HTML
    function slide() {

        var slider = document.getElementById('title');
        if (parseInt(slider.style.left) < 350) {
            slider.style.left = parseInt(slider.style.left) + 1 + 'px';
            setTimeout(function () { slide(); }, 100);
        }
    }


    function myfunction(levelID){
        var selected = document.getElementById("listID"+levelID).value;
        createDropDown(selected,levelID);

    }



    /*
    deleteNodes is a general purpose function to delete the nodes. This function is used with reset button or
    when a user changes his mind and goes back to select another dropdown
    levelID: gives the function a note of how many nodes to be deleted or when the user has changed the mind
     */
    function deleteNodes(levelID) {
        var deleteID = 4;
        var Applynode = document.getElementById('Apply');
        var selectFinalNode = document.getElementById('finalSelect');
        var finalDivElement = document.getElementById('finalDiv');
        var divFormElement = document.getElementById('divForm');
        if (selectFinalNode !== null){
            selectFinalNode.parentNode.removeChild(selectFinalNode);
        }

        if (Applynode !== null){
            Applynode.parentNode.removeChild(Applynode);
        }

        if (finalDivElement !== null){
            finalDivElement.parentNode.removeChild(finalDivElement);
        }

        if (divFormElement !== null){
            divFormElement.parentNode.removeChild(divFormElement);
        }

        while (deleteID > levelID) {
            var present = document.getElementById("listID" + (deleteID));
            if (present != 'listID0' && present != null) {
                present.parentNode.removeChild(present);
            }

            deleteID = deleteID - 1;
        }

    }

    //Restore the selected element to be SELECT instead of null
    function selectfunc(){
        document.getElementById("listID0").value = "SELECT";
    }
