import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist/client');
if(!fs.existsSync(root))throw new Error('Build output is missing. Run the Sites build first.');
const collect=(directory)=>fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry=>{
 if(entry.name.startsWith('.'))return[];
 const full=path.join(directory,entry.name);
 return entry.isDirectory()?collect(full):/\.(js|css|jpg|png|svg|woff2|webmanifest)$/.test(entry.name)&&entry.name!=='sw.js'?['/'+path.relative(root,full).split(path.sep).join('/')]:[];
});
const assets=collect(root).sort();
fs.writeFileSync(path.join(root,'precache.json'),JSON.stringify(assets));
console.log(`PWA precache manifest: ${assets.length} assets`);
