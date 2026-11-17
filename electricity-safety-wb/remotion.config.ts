import path from 'path';
import { Config } from '@remotion/cli/config';

Config.setPublicDir('./public');
Config.setBrowserExecutable('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe');
Config.setChromiumOpenGlRenderer('angle');
Config.setConcurrency(8);
Config.setJpegQuality(90);
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);

