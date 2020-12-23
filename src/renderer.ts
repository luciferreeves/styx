import systemLevelInformation from './systemLevelInformation';

// Listing Files in Home Directory

const currentHomeDir: string = systemLevelInformation.getUserInfo().homedir;
document.getElementById('username').innerHTML = systemLevelInformation.getUserInfo().username;

// This variable will keep track of current path
var currentDirectoryPath: string = currentHomeDir;

const currentHomeFolders: any = systemLevelInformation.getAllFilesOfDirectory(currentHomeDir);

