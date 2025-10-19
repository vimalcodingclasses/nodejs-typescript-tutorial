import jwt from 'jsonwebtoken';

export class JwtService {
    private expiresIn: number;
    private secret: string;

    public constructor() {
        this.expiresIn = parseInt(process.env.JWT_EXPIRES!);
        this.secret = process.env.JWT_SECRET!;
    }

    public generateToken(payload: any): string {
        return jwt.sign({ data: payload }, this.secret, { expiresIn: this.expiresIn })
    }

    public verifyToken(token: string): any {
        return jwt.verify(token, this.secret);
    }
}
