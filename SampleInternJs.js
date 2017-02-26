/**
 * Created by kranthikumar on 2/23/17.
 */
document.body.onload = firstDropDown('listID0',-1);

function firstDropDown(dropSelected,listid) {

    listid = listid + 1;
    var ele = document.createElement('div');

    var select = document.createElement('select');
    var currentID = select.id = "listID" + (listid);
    var currentSelected = dropSelected;
    var choices = jsonstr["userChoice"];
    choices.push(currentSelected);
    console.log(ele);
    console.log("user choices are:" + choices);
    var states = jsonstr[currentSelected];
    var stopt = document.createElement('option');
    var flag = 0;
    stopt.value = stopt.text = "select";
    select.appendChild(stopt);
    console.log(states);
    if (states !== undefined) {

        states.forEach(function (element) {
            console.log(element);
            stopt = document.createElement('option');
            stopt.value = stopt.text = element;
            select.appendChild(stopt);

        } );
    } else {
        console.log("inside states undefined else loop");
        flag = 1;
    }

    if (listid > 3 || flag == 1){
        console.log("this is final" + listid + flag);
        //var choiceLength = choices.length;
        // for (var i=1;i<choiceLength;i++){
        //     console.log(choices[i]);
        // }

        var curID;
        var curselectedindex;
        var curselectedObject

        for (i = 0;i<4;i++){
            curID = "listID" + (i);
            curselectedindex    = document.getElementById(curID).selectedIndex;
            curselectedObject   = document.getElementById(curID).options[curselectedindex];
            console.log("curently selected : "+ curselectedObject.text);

             // choices.pop(curselectedObject.text);
        }

    } else {
        ele.appendChild(select);
        document.getElementsByTagName('body')[0].appendChild(ele);
        document.getElementById(currentID).addEventListener("change", function () {
            // var curselectedindex    = document.getElementById(currentID).selectedIndex;
            // var curselectedObject   = document.getElementById(currentID).options[curselectedindex];
            // console.log("curently selected : "+ curselectedObject.text);
            // choices.pop(curselectedObject.text);

            deleteNodes(listid);
            myfunction(listid);
        });
    }
}
