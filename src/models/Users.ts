import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";
import { Exclude } from "class-transformer";
import { BeforeInsert, Column, Entity, Index, 
    OneToMany } from "typeorm";
import { AbstractEntity } from "./AbstractEntity";
import { Posts } from "./Posts";

@Entity({name: "users"})
export class Users extends AbstractEntity {
    @Index()
    @IsEmail()
    @Column({ unique: true }) email: string;

    @Index()
    @Length(4, 50, {message: "Min four characters."})
    @Column({ unique: true }) username: string;

    @Exclude()
    @Length(6, 50)
    @Column() password: string;

    @OneToMany(() => Posts, post => post.user) posts: Posts[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 6);
    };
};





