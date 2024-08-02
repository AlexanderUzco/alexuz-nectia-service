import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
    @Prop()
    name: string;

    @Prop()
    lastname: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    password: string;

    // Add role ADMIN - USER
    @Prop({
        default: 'USER',
    })
    role: string;

    @Prop({
        default: false,
    })
    isSuspended: boolean;

    @Prop({
        default: false,
    })
    isDeleted: boolean;

    @Prop({
        default: null,
    })
    reasonSuspended: string;

    @Prop({})
    lastLogin: Date;

    @Prop({ default: null })
    origin: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: null })
    deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
