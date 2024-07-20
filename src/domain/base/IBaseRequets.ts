

export interface IBaseRequets {

  UserId: string;
  SportClubGuid: string;
  SecurityProviderName: string;
}

export class BaseRequets implements IBaseRequets {


  UserId: string = '';
  SportClubGuid: string = '';
  SecurityProviderName: string = '';
}

