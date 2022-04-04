import upload from "@config/upload";
import fs from "fs";
import { resolve } from "path";
import { injectable } from "tsyringe";

import { IStorageProvider } from "../IStorageProvider";

@injectable()
class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`, file)
        );
        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${upload.tmpFolder}/${folder}`, file);
        try {
            await fs.promises.stat(fileName);
        } catch {
            throw new Error(
                "An Error has ocurred searching for the given file path"
            );
        }

        fs.unlink(fileName, (err) => {
            if (err) throw err;
            console.log(`${fileName} was deleted`);
        });
    }
}

export { LocalStorageProvider };
