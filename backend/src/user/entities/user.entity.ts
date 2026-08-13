import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { RolUserEnum } from "../enum/RolUserEnum";
import { Exclude } from "class-transformer";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
    })
    name: string;

    @Column({
        type: 'varchar',
        unique: true,
    })
    email: string;

    @Exclude()
    @Column({
        name: 'password_hash',
        type: 'varchar'
    })
    password: string;

    @Column({
        type: 'enum',
        enum: RolUserEnum,
        default: RolUserEnum.PARTNER
    })
    rol: RolUserEnum;

    @Column({
        type: 'boolean',
        default: true
    })
    state: boolean;

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }
}
