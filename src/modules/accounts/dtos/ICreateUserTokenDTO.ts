interface ICreateUserTokenDTO {
    refresh_token: string;
    expires_date: Date;
    user_id: string;
}

export { ICreateUserTokenDTO };
