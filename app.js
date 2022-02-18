// File
// const fs = require("fs")
// fs.writeFileSync("notes.txt", "This file was created again")
// fs.appendFileSync("notes.txt", "\nNew text")

// module export var
// const name = require("./utils.js")
// console.log(name)
// module export function
// const add = require("./utils.js")
// console.log(add(4, -2))
const notes = require("./notes.js")
// const msg = getNotes()
// console.log(msg)

// import package
// validator
// const validator = require("validator")
// console.log(validator.isEmail("gmail.com"))
// console.log(validator.isURL("https://mead.com"))
// chalk
// const chalk = require("chalk")
// console.log(chalk.green.inverse.bold("Success!"))

// args
// const command = process.argv[2]
// if (command === "add")
// {
//     console.log("Adding note")
// }
// else if (command === "remove")
// {
//     console.log("Removing note")
// }

// customize yargs 
const yargs = require("yargs")
// yargs.version("1.1.0")
// add command
yargs.command(
    {
        command: "add", // node app.js add
        describe: "Add a new note",
        builder:
        {
            title:
            {
                describe: "Note title",
                demandOption: true,
                type: "string" // node app.js add --title="some string"
            },
            body:
            {
                describe: "Note body",
                demandOption: true,
                type: "string" // node app.js add --body="some string"
            }
        },
        handler (argv)
        {
            notes.addNote(argv.title, argv.body)
        }
    }
)
// remove command
yargs.command(
    {
        command: "remove", // node app.js remove
        describe: "Remove a note",
        builder:
        {
            title:
            {
                describe: "Note title to be removed",
                demandOption: true,
                type: "string" // node app.js remove --title="some string"
            }
        },
        handler (argv)
        {
            notes.removeNote(argv.title)
        }
    }
)
// list command
yargs.command(
    {
        command: "list", // node app.js list
        describe: "List the notes",
        handler ()
        {
            notes.listNotes()
        }
    }
)
// read command
yargs.command(
    {
        command: "read", // node app.js remove
        describe: "Read a note",
        builder:
        {
            title:
            {
                describe: "Note title to be read",
                demandOption: true,
                type: "string" // node app.js read --title="some string"
            }
        },
        handler (argv)
        {
            notes.readNotes(argv.title)
        }
    }
)
yargs.parse()