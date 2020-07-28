const EDIT_BUTTON = "<button type='button' class='btn btn-outline-info' onclick='makeRowEditable(this)'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'></path><path fill-rule='evenodd' d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z'></path></svg></button>"
const DELETE_BUTTON = "<button type='button' class='btn btn-danger' onclick='deleteRow(this)'><svg width='1em' height='1em' viewBox='0 0 16 16' class='bi bi-x-circle' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z'/><path fill-rule='evenodd' d='M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z'/><path fill-rule='evenodd' d='M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z'/></svg></button>"
const DROPDOWN = {"Cotton" : 0, "Leather" : 1, "Linen" : 2, "Nylon" : 3}


function rowToHtml (row) {

    // Convert a data row to html to add to a table

    let vals = Object.values(row);
    let trs = vals.map((v) => {return "<td>" + String(v) + "</td>"})
    return "<tr>" + trs.join("") + "<td>" + EDIT_BUTTON + DELETE_BUTTON + "</td>" + "</tr>"
}

function newId (length) {

    // Make a <length> long id string

    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;      
}

function captureData () {

    // Convert table and inputted values into JSON

    let rows = Array.from(document.getElementsByClassName("table")[0].tBodies[0].children);
    let table = [];

    rows.forEach( (row) => {

        let cols = Array.from(row.children);
        let id = cols[0].innerText;

        if(cols[1].innerHTML.includes("select")){
            var mat = cols[1].children[0].selectedOptions[0].text;
        }
        else {
            var mat = cols[1].innerText;
        }

        var vals = [];
        for (let i=2; i<5; i++) {
            if(cols[i].innerHTML.includes("input")) {
                vals.push(cols[i].children[0].value)
            }
            else {
                vals.push(cols[i].innerText)
            }
        }
        table.push({
            "id" : id,
            "material" : mat,
            "length" : vals[0],
            "width" : vals[1],
            "quantity" : vals[2]
        })
    })

    return table    

}

function reverseRowEditability (row) {

    // Remove dropdown menus and text fields to confirm typed data

    let cols = Array.from(row.children);
    if(cols[1].innerHTML.includes("select")) {
        cols[1].innerHTML = "<td>" + cols[1].children[0].selectedOptions[0].text + "</td>";
    }

    for (let i=2; i<5; i++) {
        if(cols[i].innerHTML.includes("input")) {
            cols[i].innerHTML = "<td>" + cols[i].children[0].value + "</td>";
        }
    }

}

function makeRowEditable (e) {

    // Add dropdown menus and text fields to modify data

    let row = e.parentElement.parentElement;
    let cols = Array.from(row.children);

    // Material -> Create dropdown menu
    let mat = cols[1].innerHTML;
    if(!mat.includes("select")){
        cols[1].innerHTML = "<select> \
                            <option value='Cotton'>Cotton</option> \
                            <option value='Leather'>Leather</option> \
                            <option value='Linen'>Linen</option> \
                            <option value='Nylon'>Nylon</option> \
                            </select>"; // Add dropdown menu
        if (mat.length < 1) {mat = "Cotton"} // Assign default 
        Array.from(cols[1].children)[0].selectedIndex = DROPDOWN[mat]; // Select already filled value
    }

    // Size, Quantity -> Create input field
    for(let i=2; i<5; i++) {
        let quant = cols[i].innerHTML;
        if(!quant.includes("input")){cols[i].innerHTML = `<input type="text" placeholder=${quant}>`}
    }
}