const { default: chalk } = require("chalk")
const fs = require("fs")

const addNote = (title, body) =>
{
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote)
    {
        notes.push
        (
            {
                title: title,
                body: body
            }
        )
        savedNotes(notes)
        console.log(chalk.green.inverse("Added note"))
    }
    else
        console.log(chalk.red.inverse("Note title taken"))
}

const removeNote = (title) =>
{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)
    
    savedNotes(notesToKeep)

    if (notesToKeep.length !== notes.length)
        console.log(chalk.green.inverse("Note removed!"))
    else
        console.log(chalk.red.inverse("No note found!"))
}

const savedNotes = (notes) =>
{
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync("notes.json", dataJSON)
}

const loadNotes = () =>
{
    try
    {
        const dataBuffer = fs.readFileSync("notes.json")
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }
    catch (e)
    {
        return []
    }
}

const listNotes = () =>
{
    console.log(chalk.inverse("Your notes"))
    const notes = loadNotes()
    notes.forEach
    (
        (note) =>
        {
            console.log(note.title)
        }
    )
}

const readNotes = (title) =>
{
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note)
    {
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    }
    else
        console.log(chalk.red.inverse("No note found!"))
}

module.exports = 
{
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}