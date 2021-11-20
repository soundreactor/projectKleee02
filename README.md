# projectKleee02
 
## what you need:
- laser projector with analog colors (not TTL)
- helios laser dac
- computer with node js

get node js here:
https://nodejs.org/

## installation:
install node js if you have not yet.       
download this repo and extract it to a folder      
open a terminal.   
navigate inside the folder with your terminal.     
type ```cd``` and drag and drop the repo folder into the terminal.    
```
xxx:~ vp$ cd /location/of/your/folder/projectKleee02
```  
now install the dependencies.      
```
npm install
```     
to start the show of the 2 example tokens
```
node main.js
``` 
note: the script will automatically scan the folder for token_N.json files and add them all to a list.          
to play the next or previous token hit the arrow keys on the keyboard.

## get your own token files:
go to:         
https://fungle.xyz/kleee02_new/visual/#328        
replace the number after the # with the token number you want to project.       
there is a hidden record button at the bottom right of the page. click it.       
it will record the token and download a file token_N.json to your downloads folder.
you can now copy that file to the projectKleee02 folder and project it.
note: some of the settings of the editor will be taken into account like FPS and Animation Speed.     
