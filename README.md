# projectKleee02

> Play Kleee02 NFTs on an ILDA laser projector!

## ⚠️ Laser Safety (Read First)
Lasers are **not toys**. They can cause permanent eye injury, skin burns, and fire hazards. Before operating any laser projector, **learn proper laser safety practices** (beam heights, audience scanning rules, interlocks, eyewear, local laws). By using this software, **you accept all responsibility** for safe setup and operation.

---

## Requirements
- **ILDA laser projector** with **analog color** inputs (not TTL).  
  Example: <https://phantomdynamics.com/unity-lasers-elite-2-ilda-laser-light-show-projector/>
- **Helios Laser DAC**  
  Example: <https://ebay.us/m/KVduID>
- **Computer with Node.js**  
  Get Node.js: <https://nodejs.org/>

## Install
1. Install Node.js if you haven’t already.  
2. Download this repo and extract it to a folder.  
3. Open a terminal and `cd` into the project folder. Easiest way: type `cd ` then drag the folder into the terminal.
   ```bash
   cd /path/to/projectKleee02
   ```
4. Install dependencies:
   ```bash
   npm install
   ```

## Run
Start the example show (will auto-scan for `token_N.json` files in the folder):
```bash
node main.js
```

**Controls**
- **Left/Right Arrow**: Previous/Next token

> Note: On launch, the script finds every file that matches `token_N.json` and queues them.

## Get Your Own Token Files
1. Open:  
   `https://fungle.xyz/kleee02_new/visual/#328`  
   Replace `#328` with the token number you want to project.
2. (Optional) Adjust **Animation Speed** and/or **FPS** in the page settings.
3. Click the **lower-right corner** to start recording (a **red circle** appears).
4. Don’t touch anything while it records. After one full loop, the red circle disappears.
5. A file named `token_N.json` is saved to your **Downloads** folder.
6. Copy that file into your `projectKleee02` folder. Run `node main.js` to project it.

> Some editor settings (like **FPS** and **Animation Speed**) are embedded into the exported file and will affect playback.

---

### Tips
- Use **analog**-capable projectors for smooth color fades; TTL-only units won’t render colors correctly.
- Keep beam paths **above eye level** and avoid reflective surfaces.
- Secure the projector and **use interlocks** where available.

Stay safe & have fun!
