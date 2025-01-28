import { User } from '../../user/entities/user.entity';
export declare class Administrator {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}
