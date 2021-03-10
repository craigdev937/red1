import { classToPlain, Exclude } from "class-transformer";
import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, 
    UpdateDateColumn } from "typeorm";

export abstract class AbstractEntity extends BaseEntity {
    @Exclude()
    @PrimaryGeneratedColumn() id: number;

    @CreateDateColumn() createAt: Date;

    @UpdateDateColumn() updatedAt: Date;
    
    toJSON() {
        return classToPlain(this);
    };
};



