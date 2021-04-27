import * as os from 'os';
import * as glob from 'glob';
import { statSync, readdirSync } from 'fs';
import { extname, basename } from 'path';

class systemLevelInformation {

    getUserInfo(): { username: string, homedir: string, platform: string } {
        return {
            username: os.userInfo().username,
            homedir: os.userInfo().homedir,
            platform: os.platform()
        };
    }

    getAllFilesOfDirectory(currentDirectory): { files: string[], directories: string[] } {
        const currentFilteredItems: string[] = readdirSync(currentDirectory).filter((item: string) => item.indexOf(".") !== 0);
        const files: string[] = [];
        const directories: string[] = [];

        currentFilteredItems.forEach((item: string) => {
            if (statSync(`${currentDirectory}/${item}`).isDirectory()) {
                directories.push(item);
            } else {
                files.push(item);
            }
        });

        return { files, directories };
    }

}

export default new systemLevelInformation;
