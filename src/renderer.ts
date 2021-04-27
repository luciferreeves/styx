import systemLevelInformation from './systemLevelInformation';
import Preferences from './Preferences';

// List all the favourites

Preferences.getFavourites().forEach(favourite => {
    const favourites = document.getElementById('favourites');
    const listElement = document.createElement('li');
    const iconElement = document.createElement('i');
    iconElement.classList.add(favourite.icon);
    listElement.appendChild(iconElement);
    const spanElement = document.createElement('span');
    spanElement.innerHTML = favourite.text;
    listElement.appendChild(spanElement);
    listElement.setAttribute('path', favourite.path);
    if (Preferences.getConfiguredPathToDisplayAfterAppInit() === favourite.path) {
        listElement.classList.add('selected');
        displayDirectoryViaElement(listElement);
    }
    favourites.appendChild(listElement);
});

function displayDirectoryViaElement(element: HTMLElement) {
    // Listing Files in the Directory
    const currentFolders: any = systemLevelInformation.getAllFilesOfDirectory(element.getAttribute('path'));
    console.log(currentFolders);
}

