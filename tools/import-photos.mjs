import {ELEMENTS,DATASET} from '../dist/src/elements.js';
import {applyPhotoManifest,writeSnapshot} from './photo-importer.mjs';
// Deliberately do not fetch or regenerate numerical facts, electron configurations or crystal records.
const elements=structuredClone(ELEMENTS),photos=await applyPhotoManifest(elements);
await writeSnapshot(elements,{...DATASET,...photos});
console.log(JSON.stringify(photos));
