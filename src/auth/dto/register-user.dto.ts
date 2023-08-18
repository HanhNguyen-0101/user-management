export class RegisterUserDto {
  readonly email: string;
  readonly password: string;
  readonly isPending: boolean;
  readonly isDisable: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly updatedBy: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly globalId: string;
  readonly officeCode: string;
  readonly country: string;
}
