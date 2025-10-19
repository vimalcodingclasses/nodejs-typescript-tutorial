import { ObjectId } from "mongodb";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ObjectIdColumn, UpdateDateColumn } from "typeorm";
import * as bcrypt from 'bcrypt';

@Entity()
export class User {
    @ObjectIdColumn()
    public _id!: ObjectId;

    @Column()
    public firstName!: string;

    @Column()
    public lastName!: string;

    @Column({ unique: true })
    public email!: string;

    @Column()
    public password!: string;

    @CreateDateColumn()
    public createdAt!: Date;

    @UpdateDateColumn()
    public updatedAt!: Date;

    @BeforeInsert()
    @BeforeUpdate()
    public async hasPassword() {
        if (this.password) {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
        }
    }
}