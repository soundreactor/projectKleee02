# projectKleee02
 
## what you need:
- ilda laser projector with analog colors (not TTL)     
[for example https://phantomdynamics.com/unity-lasers-elite-2-ilda-laser-light-show-projector/ ]     
- helios laser dac     
[for example https://ebay.us/m/KVduID]      
- computer with node js

get node js here:
https://nodejs.org/

:          
    
    


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
if you want you can modify speed and/or FPS in the settings.     
once you're happy click on the lower right corner of the page,        
a red circle will appear signaling that it’s now recording.     
don't touch anything now. it is recording the token animation. wait for the red circle to dissapear.        
after a full loop a file of token_N.json will be saved to your downloads folder.    
you can now copy that file to the projectKleee02 folder and project it.       
note: some of the settings of the editor will be taken into account like FPS and Animation Speed.     
