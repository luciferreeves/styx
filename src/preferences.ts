// import * as Store from 'electron-store';
import systemLevelInformation from './systemLevelInformation';

class Preferences {

    
    getFavourites(): { text: string, path: string, icon: string }[] {
        if (localStorage.getItem('favourites')) {
            return JSON.parse(localStorage.getItem('favourites')) as { text: string, path: string, icon: string }[];
        } else {
            switch (systemLevelInformation.getUserInfo().platform) {
                case 'darwin':
                    const userPath: string = `/Users/${systemLevelInformation.getUserInfo().username}`;
                    const favourites: { text: string, path: string, icon: string }[] = [
                        { text: 'Applications', path: '/Applications', icon: 'icofont-brand-appstore' },
                        { text: 'Desktop', path: `${userPath}/Desktop`, icon: 'icofont-computer' },
                        { text: 'Documents', path: `${userPath}/Documents`, icon: 'icofont-file-document' },
                        { text: 'Movies', path: `${userPath}/Movies`, icon: 'icofont-movie' },
                        { text: 'Music', path: `${userPath}/Music`, icon: 'icofont-music-disk' },
                        { text: 'Pictures', path: `${userPath}/Pictures`, icon: 'icofont-image' },
                        { text: systemLevelInformation.getUserInfo().username, path: `${userPath}`, icon: 'icofont-home' },
                    ];
                    localStorage.setItem('favourites', JSON.stringify(favourites));
                    return favourites;
                default:
                    return [];
            }
        }
    }

    getConfiguredPathToDisplayAfterAppInit(): string {
        if (localStorage.getItem('appStartPath')) {
            return localStorage.getItem('appStartPath');
        } else {
            localStorage.setItem('appStartPath', `/Users/${systemLevelInformation.getUserInfo().username}`);
            return localStorage.getItem('appStartPath');
        }
    }

}

export default new Preferences;
