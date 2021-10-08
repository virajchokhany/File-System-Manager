let path=require("path");
let fs=require("fs");

function tree(dirpath,indent)
{
    let isFile=fs.lstatSync(dirpath).isFile();
    if(isFile)
    {
        console.log(indent+path.basename(dirpath));
        return;
    }
    else
    {
        console.log(indent+path.basename(dirpath));
        let dirContents=fs.readdirSync(dirpath);
        for(let i=0;i<dirContents.length;i++)
        {
            tree(path.join(dirpath,dirContents[i]),indent+"\t");
        }
    }
}
module.exports={
    fn:tree
}