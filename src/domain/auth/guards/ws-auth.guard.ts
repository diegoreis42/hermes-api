import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { jwtConstants } from 'src/domain/auth/constants';

@Injectable()
export class WsAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        if (context.getType() != 'ws') return true;

        const client: Socket = context.switchToWs().getClient();
        const { authorization } = client.handshake.headers;

        Logger.log({ authorization }, 'got the auth');

        return false;
    }

    static validateToken(client: Socket) {

        const { authorization } = client.handshake.headers;
        const token: string = authorization.split(' ')[1];

        return verify(token, jwtConstants.secret);
    }
}
