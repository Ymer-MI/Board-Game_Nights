import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export default class JWTHelper {
    private readonly secret = process.env.JWT_SECRET
    private readonly options = {
        algorithm: 'HS512'
    } as const

    getToken = async (str: string) => this.secret && jwt.sign({ hash: await (bcrypt.hash(str, await (bcrypt.genSalt(12)))) }, this.secret, this.options as SignOptions)
    verifyToken = async (str: string, token: string) => this.secret && await bcrypt.compare((jwt.verify(str, this.secret, this.options as VerifyOptions) as JwtPayload).hash, (jwt.verify(token, this.secret, this.options as VerifyOptions) as JwtPayload).hash)
}