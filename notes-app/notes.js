const fs = require("fs");
const { title } = require("process");
const getNotes = (title) => {
  return `Your note is ${note}`;
};

const addNote = (title, body) => {
  const notes = loadNotes();
  debugger;
  const note = notes.find((note) => note.title === title);
  if (note) {
    console.log("note already exist");
  } else {
    notes.push({ title, body });
    saveNotes(notes);
    console.log("note added successfully");
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesFiltered = notes.filter((item) => item.title !== title);
  if (notes.length === notesFiltered.length) {
    console.log("note not found!");
  } else {
    saveNotes(notesFiltered);
    console.log("the note removed successfully!");
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((item) => item.title === title);
  if (!note) {
    console.log("note not found");
  } else {
    console.log(`title: ${note.title}, body: ${note.body} `);
  }
};

const printNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    console.log("No notes on the list");
  } else {
    notes.forEach((note) => {
      console.log(`title: ${note.title}, body: ${note.body} `);
    });
  }
};

const loadNotes = () => {
  try {
    const buffer = fs.readFileSync("notes.json");
    const notesStr = buffer.toString();
    return JSON.parse(notesStr);
  } catch (err) {
    return [];
  }
};

const saveNotes = (notes) => {
  const notesSrtingify = JSON.stringify(notes);
  fs.writeFileSync("notes.json", notesSrtingify);
};

module.exports = { getNotes, addNote, removeNote, readNote, printNotes };
