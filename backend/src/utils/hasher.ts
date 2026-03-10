import bcrypt from "bcrypt";
const hashPass = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    return hashedPass;
}
export default hashPass