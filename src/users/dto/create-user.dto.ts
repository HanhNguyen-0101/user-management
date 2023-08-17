export class CreateUserDto {
  readonly id: number;
  readonly email: string;
  readonly is_pending: boolean;
  readonly is_disable: boolean;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly updated_by: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly global_id: string;
  readonly office_code: string;
  readonly country: string;
}
