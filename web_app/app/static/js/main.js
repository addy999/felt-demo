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

const EDIT_BUTTON = "<button type='button' class='btn btn-outline-info'><svg width='1em' height='1em' onclick='makeRowEditable(this)' viewBox='0 0 16 16' class='bi bi-pencil' fill='currentColor' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' d='M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z'></path><path fill-rule='evenodd' d='M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z'></path></svg></button>"
const DROPDOWN = {"Cotton" : 0, "Leather" : 1, "Linen" : 2, "Nylon" : 3}

function makeRowEditable (e) {
    let row = e.parentElement.parentElement.parentElement;
    let cols = Array.from(row.children);

    // Material -> Create dropdown menu
    let mat = cols[1].innerHTML;
    cols[1].innerHTML = "<select> \
                        <option value='Cotton'>Cotton</option> \
                        <option value='Leather'>Leather</option> \
                        <option value='Linen'>Linen</option> \
                        <option value='Nylon'>Nylon</option> \
                        </select>";
    Array.from(cols[1].children)[0].selectedIndex = DROPDOWN[mat]; // Select already filled value

    // Size, Quantity -> Create input field
    for(let i=2; i<5; i++) {
        let quant = cols[i].innerHTML;
        cols[i].innerHTML = `<input type="text" placeholder=${quant}>`
    }
}

function rowToHtml (row) {
    let vals = Object.values(row);
    let trs = vals.map((v) => {return "<td>" + String(v) + "</td>"})
    return "<tr>" + trs.join("") + "<td>" + EDIT_BUTTON + "</td>" + "</tr>"
}