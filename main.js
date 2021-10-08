let input=process.argv.slice(2);
let cmd=input[0];
let helperFile = require("./commands/help.js");
let treeFile=require("./commands/tree.js");
let orgFile=require("./commands/organise.js");
switch(cmd)
{
    case "organise":
        orgFile.fn(input[1]);
        break;
    
    case "tree":
        treeFile.fn(input[1],"");
        break;

    case "help":
        helperFile.fn();
        break;

    default:
        console.log("Please enter a valid command");
        break;
}