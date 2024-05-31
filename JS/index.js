
// Form input fields
var siteName = document.getElementById("siteName");
var siteUrl = document.getElementById("siteUrl");
var modalBtn = document.getElementById("modalBtn");

var submitBtn = document.getElementById("submitBtn");
// Table elements
var bookmarkTableBody = document.getElementById("bookmarkTableBody");

//Array to hold form data
var bookmarkContainer = [];


// Regex function
function validateInput(element) {
    var regex = {
        siteName: /^[\w]{3,}$/,
        siteUrl: /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:\/?#[\]@!$&'()*+,;=]*)?$/
    }

    //validating the input
    if (regex[element.id].test(element.value)) {
        //if valid, show the green border around the input
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");

        return true;
    }
    else {
        //if invalid, show the red border around the input
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");

        return false;
    }
}




//Checking if there are bookmarks stored in the local storage or not
if (localStorage.getItem("bookmark") != null) {
    bookmarkContainer = JSON.parse(localStorage.getItem("bookmark"));
    displayBookmark(bookmarkContainer);
}


function addNewBookmark() {

    if (validateInput(siteName) && validateInput(siteUrl)) {

        //Creating a bookmark object to push in the array
        var bookmark = {
            name: siteName.value,
            url: siteUrl.value
        };

        bookmarkContainer.push(bookmark);
        localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));

        deleteFormData();
        displayBookmark(bookmarkContainer);
    }
    else
    {
        modalBtn.click();
    }

    //removing green border from the from input fields
    removeIsValid();
}

function deleteFormData() {
    siteName.value = "";
    siteUrl.value = "";
}

function displayBookmark(displayedArray) {
    var container = ``;

    for (var i = 0; i < displayedArray.length; i++) {
        container += `<tr>
        <td>${i+1}</td>
        <td>${displayedArray[i].name}</td>
        <td> <a target="_blank" href="${displayedArray[i].url}"> <button class="btn visit"><i class="fa-solid fa-eye pe-1"></i>  Visit </button></a> </td>
        <td> <button class="btn delete" onclick="deleteBookmark(${i})" ><i class="fa-solid fa-trash-can pe-1"></i> Delete</button> </td>
    </tr>`;
    }

    bookmarkTableBody.innerHTML = container;

}

function deleteBookmark(index) {
    bookmarkContainer.splice(index, 1);
    localStorage.setItem("bookmark", JSON.stringify(bookmarkContainer));
    displayBookmark(bookmarkContainer);
}

function removeIsValid() {
    siteName.classList.remove("is-valid");
    siteUrl.classList.remove("is-valid");
}