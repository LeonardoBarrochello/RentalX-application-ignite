import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserMap {
    static toDTO({
        id,
        name,
        email,
        avatar,
        driver_license,
        avatar_url,
    }: User): IUserResponseDTO {
        const user = instanceToInstance({
            id,
            name,
            email,
            avatar,
            driver_license,
            avatar_url,
        });
        return user;
    }
}

export { UserMap };
