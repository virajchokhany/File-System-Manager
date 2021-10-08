let types = 
{
    media: ["mp4", "mkv","mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

let fs=require("fs");
let path=require("path");

function organise(dirpath)
{
    let destPath=path.join(dirpath,"Organised Folder");

    if (!fs.existsSync(destPath))
    {
        fs.mkdirSync(destPath);
    }
    organiseFiles(dirpath,destPath);
}



function organiseFiles(dirpath,destPath)
{
    if(fs.lstatSync(dirpath).isFile())
    {
        let dest=getDestinationByCategory(dirpath,destPath);
        console.log(dest);
        if (!fs.existsSync(dest))
        {
            fs.mkdirSync(dest);
        }
        fs.copyFileSync(dirpath,path.join(dest,path.basename(dirpath)));
    }
    else
    {
        let contents=fs.readdirSync(dirpath);
        for(let i=0;i<contents.length;i++)
        {
            if(contents[i]!="Organised Folder")
                organiseFiles(path.join(dirpath,contents[i]),destPath);
        }
    }
}



function getDestinationByCategory(srcFileAddress,destPath)
{
    let ext=path.extname(srcFileAddress);
    ext=ext.slice(1);
    for(let type in types)
    {
        let arr=types[type];
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]==ext)
            {
                return path.join(destPath,type);
            }
        }
    }
    return path.join(destPath,"others");
}

module.exports={
    fn:organise
}