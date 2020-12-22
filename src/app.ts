import { app, BrowserWindow } from 'electron';
import windowCreator from './windowCreator';

windowCreator.main(app, BrowserWindow);
