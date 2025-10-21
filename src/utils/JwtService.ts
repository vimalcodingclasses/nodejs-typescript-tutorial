import jwt from 'jsonwebtoken';
import fs from 'fs';

export class JwtService {
    private expiresIn: number;

    public constructor() {
        this.expiresIn = parseInt(process.env.JWT_EXPIRES!);
    }

    public generateToken(payload: any): string {
        const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH!);
        return jwt.sign({ data: payload }, privateKey, { algorithm: 'RS256', expiresIn: this.expiresIn })
    }

    public verifyToken(token: string): any {
        const cert = fs.readFileSync(process.env.PUBLIC_PEM_PATH!);
        return jwt.verify(token, cert);
    }
}
