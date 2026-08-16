import { applyDecorators, UseGuards } from "@nestjs/common";
import { RolUserEnum } from "../../user/enum/RolUserEnum";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard } from "../guards/RolesGuard";
import { Roles } from "../utils/roles";
import { JwtAuthGuard } from "../guards/JWTAuthGuard";

export function Auth(...roles: RolUserEnum[]) {
    return applyDecorators(
        Roles(...roles),
        UseGuards(JwtAuthGuard, RolesGuard)
    )
}