import { makeId, slugify } from "../utilities/helpers";
import { AbstractEntity } from "./AbstractEntity";
import { Users } from "./Users";
import { BeforeInsert, Column, Entity, Index, 
    JoinColumn, ManyToOne } from "typeorm";

@Entity({name: "posts"})
export class Posts extends AbstractEntity {
    constructor(posts: Partial<Posts>) {
        super();
        Object.assign(this, posts);
    };

    @Index()
    @Column() identifier: string;  // 7 Character ID.

    @Column() title: string;

    @Index()
    @Column() slug: string;

    @Column({nullable: true, type: "text"}) body: string;

    @Column() subName: string;

    @ManyToOne(() => Users, user => user.posts)
    @JoinColumn({name: "username", referencedColumnName: "username"})
    user: Users;

    @BeforeInsert()
    makeIdAndSlug() {
        this.identifier = makeId(7);
        this.slug = slugify(this.title);
    };
};





