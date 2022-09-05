const notes = require("./notes");
const chalk = require("chalk");
const yargs = require("yargs");

//add, remove, read, list

//create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: "remove",
  describe: "remove a specific note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

//Read  command
yargs.command({
  command: "read",
  describe: "read a command",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});
yargs.command({
  command: "list",
  describe: "print a list",
  describe: "read a command",

  handler: function () {
    notes.printNotes();
  },
});

yargs.parse();
