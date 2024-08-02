import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/modules/users/schemas/users.schema';

export type TaskDocument = Task & Document;

@Schema()
export class Task extends Document {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({
        default: false,
    })
    completed: boolean;

    @Prop({
        type: MongooseSchema.Types.ObjectId,
        ref: User.name,
        autopopulate: true,
        default: null,
    })
    userID: User;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: null })
    deletedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
