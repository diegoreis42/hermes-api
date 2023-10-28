import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email', 'name'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column('varchar', { length: 60 })
    email: string;

    @Column('varchar', { length: 100 })
    name: string;

    @Column('varchar', { length: 50, nullable: true })
    nickName: string;

    @Column()
    password: string;
}
