import { object, string, TypeOf } from 'zod';

export const UserRegisterInputSchema = object({
  body: object({
    firstName: string({
      required_error: 'First Name is required',
    }),
    lastName: string({
      required_error: 'Last Name is required',
    }),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be 6 chars minimum'),
  }),
});

export interface IUserUpdateInput {
  firstName?: string;
  lastName?: string;
}

export interface IUserResendConfirm{
  email: string;
}

export interface IUserResetPassword{
  password: string;
  confirmPassword: string;
}

export interface IUserAddToCart{
  quantity: string;
}

export const userLoginInputSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email address'),
    password: string({
      required_error: 'Password is required',
    }).min(6, 'Password too short - should be atleast 8 characters'),
  }),
});

export type IUserRegisterInput = TypeOf<typeof UserRegisterInputSchema>
export type IuserLoginInputSchema = TypeOf<typeof userLoginInputSchema>;
