import jwt from "jsonwebtoken";

//ACCESS AND REFRESH 
const access_token_generator = (userId: number): string => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
    });
    return token;
};
const refresh_token_generator = (userId: number): string => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: "7d",
    });
    return token;
};

export { access_token_generator, refresh_token_generator };