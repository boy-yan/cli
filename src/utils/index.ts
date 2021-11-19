import fs from 'fs';

export function checkPathIsDirectory(path: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) reject(err);
        resolve(stats.isDirectory());
      });
    });
}