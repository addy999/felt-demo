$(document).ready(function () {

    // Load table from database on page load

    let table = document.getElementsByClassName("table")[0];
    $.get({
        "url" : "/getdata",
        "success" : (data) => {
            data = $.parseJSON(data);
            let tbody = "";
            data.map( (row) => { tbody += rowToHtml(row)});
            table.tBodies[0].innerHTML = tbody;
        }
    });

});


function deleteRow (e) {

    // Delete row from table

    let row = e.parentElement.parentElement;
    document.getElementsByTagName("table")[0].deleteRow(row.rowIndex);

}

function newRow () {

    // Insert new row in table

    // Create new row in html
    document.getElementsByTagName("table")[0].tBodies[0].insertRow();
    let row = Array.from(document.getElementsByTagName("table")[0].tBodies[0].children).splice(-1)[0]; // last inserted row

    // Populate
    let id = newId(5); // make a 5 char long random id
    row.innerHTML = "<td>" + id + "</td>";

    // Add spaces for material, size and quantity
    for(i=0; i<4; i++) {
        row.innerHTML += "<td></td>";
    }

    // Finally, add edit + delete button 
    row.innerHTML +=  "<td>" + EDIT_BUTTON + DELETE_BUTTON + "</td>";

    // Turn row into edit mode
    let button = row.getElementsByTagName("button")[0];
    makeRowEditable(button);
    
}

function saveData () {

    // Save table data to db 

    let data_field_valid = Array.from(document.getElementsByTagName("input")).every( (i) => {
        if(i.value.length < 1) {
            alert("Some fields are blank."); 
            return false;
        }
        else{return true}
    })

    if(data_field_valid) {
        $.post("/savedata", {data : JSON.stringify(captureData())})
        .done( () => {
            let rows = Array.from(document.getElementsByClassName("table")[0].tBodies[0].children);
            rows.forEach(reverseRowEditability);
            alert("Saved successfully.");
        })
        .fail( () => {
            alert("Server error, try again.")
        });
    }
}

