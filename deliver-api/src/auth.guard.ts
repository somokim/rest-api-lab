
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest();
		const key = request.headers['x-api-key'];
        console.log(key);
        console.log(process.env.API_KEY);
		if (!key) {
			throw new UnauthorizedException();
		}

        if (key != process.env.API_KEY) {
            throw new UnauthorizedException();
        }
        return true;
	}
}
