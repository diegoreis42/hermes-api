import { Logger } from '@nestjs/common';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from 'src/domain/auth/middlewares';
import { IMessage } from 'src/domain/message/interfaces';


@WebSocketGateway({
    cors: { origin: '*' },
    namespace: '/chat',
})
export class MessageGateway
    implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('ChatGateway');

    afterInit(client: Socket) {
        client.use(SocketAuthMiddleware() as any);

        this.logger.log('Chat iniciado!');
    }

    @SubscribeMessage('message')
    handleMessage(socket: Socket, mess: IMessage) {
        socket.broadcast.emit('message', mess);
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
        this.server.emit('userDisconnected', client.id);
    }

    handleConnection(client: Socket) {
        this.logger.log(`Client connected: ${client.id}`);
        this.server.emit('userConnected', client.id);
    }
}
