/**
 * Simplified version of the https://github.com/otiai10/lookpath.
 */

import * as fs from 'fs';
import * as path from 'path';

const isWindows = /^win/i.test(process.platform);

export async function lookupPath(command: string): Promise<string | undefined> {
    const directpath = isFilepath(command);
    if (directpath) { 
        return isExecutable(directpath);
    };

    const dirs = getDirsToWalkThrough();
    const bins = await Promise.all(dirs.map(dir => isExecutable(path.join(dir, command))));
    return bins.find(bin => !!bin);
}

const isFilepath = (cmd: string): string | undefined => {
    return cmd.includes(path.sep) ? path.resolve(cmd) : undefined;
};

const isExecutable = async (abspath: string): Promise<string | undefined> => {
    const envvars = process.env;
    const exts = (envvars.PATHEXT || '').split(path.delimiter).concat('');
    const bins = await Promise.all(exts.map(ext => access(abspath + ext)));
    return bins.find(bin => !!bin);
};

const access = (fpath: string): Promise<string | undefined> => {
    return new Promise(resolve => fs.access(fpath, fs.constants.X_OK, err => resolve(err ? undefined : fpath)));
};

const getDirsToWalkThrough = (): string[] => {
    const envvars = process.env;
    const envname = isWindows ? 'Path' : 'PATH';
    return (envvars[envname] || '').split(path.delimiter);
};