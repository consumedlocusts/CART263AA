import { params } from "./param.js";
import { OceanScene } from "./render/oceanscene.js";
//entry
const oceanScene = new OceanScene({ params });
//startt render loop
oceanScene.start();
//expose for the scene in the browser console(this where i will use that re-read option)
window.oceanScene = oceanScene;
window.oceanParams = params;
