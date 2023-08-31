import { register } from './dispatcher.js';
import { renderFileExplorer } from './operations.js';

register(renderFileExplorer);
renderFileExplorer();
