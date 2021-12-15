interface ICreateUserDTO {
    name: string;
    email: string;
    id?: string;
    avatar?: string;
    password: string;
    driver_license: string;
}

export { ICreateUserDTO };
