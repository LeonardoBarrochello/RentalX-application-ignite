import upload from "@config/upload";
import fs from "fs";
import { resolve } from "path";
import { injectable } from "tsyringe";

@injectable()
class LocalStorageProvider implements IStorageProvider {
    async save(file: string, folder: string): Promise<string> {
        await fs.promises.rename(
            resolve(upload.tmpFolder, file),
            resolve(`${upload.tmpFolder}/${folder}`)
        );
        return file;
    }
    async delete(file: string, folder: string): Promise<void> {
        const fileName = resolve(`${upload.tmpFolder}/${folder}`);
        try {
            await fs.promises.stat(fileName);
        } catch {
            return;
        }
        await fs.promises.unlink(fileName);
    }
}

export { LocalStorageProvider };
