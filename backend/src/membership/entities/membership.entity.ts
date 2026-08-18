import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Membership {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'varchar',
        length: 100
    })
    nombre_plan: string

    @Column({
        type: 'timestamptz',
    })
    fecha_inicio: Date

    @Column({
        type: 'timestamptz',
    })
    fecha_vencimiento: Date

    @Column({
        type: 'int'
    })
    creditos_totales: number

    @Column({
        type: 'int'
    })
    creditos_restantes: number

    @Column({
        type: 'varchar',
        length: 50
    })
    estado: string

    @ManyToOne(() => User, user => user.memberships)
    socio_id: User

}
