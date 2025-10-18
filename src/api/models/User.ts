import { ObjectId } from "mongodb";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @ObjectIdColumn()
    public _id: ObjectId | undefined;

    @Column()
    public firstName: string | undefined;

    @Column()
    public lastName: string | undefined;

    @Column({ unique: true })
    public email: string | undefined;

    @Column()
    public password: string | undefined;

    @CreateDateColumn()
    public createdAt: Date | undefined;

    @UpdateDateColumn()
    public updatedAt: Date | undefined;

    @BeforeInsert()
    @BeforeUpdate()
    public async hasPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}