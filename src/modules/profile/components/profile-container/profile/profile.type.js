// @flow
export interface IProfile {
  userName: string;
  firstName: string;
  lastName: string;
  documentNumber: string;
  birthday: Date;
  avatar: string;
  email: string;
  balance: number;
  +fullName: string;
}

export interface IProfileProps {
  isPending: boolean;
  profile: ?IProfile;
}

export interface IProfileActions {
  fetchProfile: () => void;
}

export interface IProfileFullProps extends IProfileProps, IProfileActions {}
