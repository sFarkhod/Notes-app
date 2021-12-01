// getting data  
const button = document.getElementById('btn');

// getting data localhost which dynamicly come from addNote function. 
// we use it when user come after closing brouser to save data.
const localhost = JSON.parse(localStorage.getItem("notes"));

// we gonna check localhost and loop through note and call addNote function.
if (localhost) {
    localhost.forEach((note) => {
        addNote(note);
    });
}

// we gonna call addNote function when button clicked
button.addEventListener('click', () => {
    
    addNote();

    console.log('worked..');
});


// we gonna create addNote funvction which do basic part of our programm 
function addNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
    <div class="notes_func">
        <div class="del-add">
            <button class="edit">Edit</button>
            <button class="delete">Delete</i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
    </div>
    `;

    // we gonna use this constants when user clicked add and delete buttons. 
    // So later we gonna create some function which do it.
    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = text;


    // we gonna hide toggle when edit button clicked
    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // we gonna create delete function which delete notes when delete button clicked. 
    deleteBtn.addEventListener("click", () => {
        note.remove();

        updateLS();
    });

    // // we gonna add our note to html.
    textArea.addEventListener("input", (e) => {
        const { value } = e.target;

        main.innerHTML = value;

        updateLS();
    });

    document.body.appendChild(note);

    
}

// we gonna add our localstorage to html so it store and if we close browser it saves anyway.
function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notes));
}














