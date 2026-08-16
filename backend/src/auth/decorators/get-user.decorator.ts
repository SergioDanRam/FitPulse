import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { User } from "../../user/entities/user.entity";

export const GetUser = createParamDecorator((data: string, execution: ExecutionContext) => {

    const req = execution.switchToHttp().getRequest();

    const user = req.user as User;

    if (!user) throw new ForbiddenException('No autorizado');

    return data ? user[data] : user;

})