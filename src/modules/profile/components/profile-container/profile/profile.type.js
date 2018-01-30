// @flow
export type IProfile = {
  firstName: string,
  lastName: string,
  documentNumber: string,
  birthday: Date,
  avatar: string,
  email: string,
  balance: number,
  +fullName: string
};

export type IProfileProps = {
  isPending: boolean,
  profile: ?IProfile
};

export type IProfileActions = {
  fetchProfile: () => void
};

export type IProfileFullProps = IProfileProps & IProfileActions;
