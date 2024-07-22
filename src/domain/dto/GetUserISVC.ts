



export class GetUserRes {
  public User: UserSimpleViewDTO;
}
export interface UserSimpleViewDTO {
  id: string;
  userName: string;
  fullName: string;
  email: string;
  twoFAenabled:boolean

}