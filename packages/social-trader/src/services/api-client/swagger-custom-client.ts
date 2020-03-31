import {
  ApiClient,
  AssetsApi,
  AuthApi,
  BrokersApi,
  DashboardApi,
  EventsApi,
  FileApi,
  FollowApi,
  FundsApi,
  InvestmentsApi,
  NotificationsApi,
  PartnershipApi,
  PlatformApi,
  ProfileApi,
  ProgramsApi,
  RateApi,
  SignalApi,
  SocialApi,
  TradingaccountApi,
  UsersApi,
  WalletApi
} from "gv-api-web";
import fetch from "isomorphic-unfetch";
import Token from "services/api-client/token";
import { getApiUrl } from "utils/config-helpers";

import withApiProxy from "./api-proxy";

const apiUrl = getApiUrl();

export const isBrowser = () => {
  return process.browser;
};

class AuthClient extends ApiClient {
  token?: Token;

  constructor(apiUrl?: string, token?: Token) {
    super(apiUrl);
    this.token = token;
  }
  fetch(input: RequestInfo, init?: RequestInit) {
    const auth = this.token?.getHeader();

    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...auth
      }
    });
  }

  public static create(token?: Token) {
    return new AuthClient(apiUrl, token);
  }
}

class Client extends ApiClient {
  token: Token;
  authApi: AuthApi;

  constructor(
    apiUrl: string = "https://localhost/api",
    token: Token,
    authApi: AuthApi
  ) {
    super(apiUrl);
    this.token = token;
    this.authApi = authApi;
  }

  async fetch(input: RequestInfo, init?: RequestInit) {
    const auth = this.token.getHeader();
    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...auth
      }
    });
  }

  public static create(token: Token = Token.create(), authApi: AuthApi) {
    return new Client(apiUrl, token, authApi);
  }
}

const client = new ApiClient(apiUrl);
export default client;

export class Api {
  token: Token = Token.create();

  auth = (token: Token = this.token): AuthApi =>
    withApiProxy(new AuthApi(AuthClient.create(token)));

  profile = (token: Token = this.token): ProfileApi =>
    withApiProxy(new ProfileApi(Client.create(token, this.auth(token))));

  dashboard = (token: Token = this.token): DashboardApi =>
    withApiProxy(new DashboardApi(Client.create(token, this.auth(token))));

  platform = (token: Token = this.token): PlatformApi =>
    withApiProxy(new PlatformApi(Client.create(token, this.auth(token))));

  programs = (token: Token = this.token): ProgramsApi =>
    withApiProxy(new ProgramsApi(Client.create(token, this.auth(token))));

  investments = (token: Token = this.token): InvestmentsApi =>
    withApiProxy(new InvestmentsApi(Client.create(token, this.auth(token))));

  funds = (token: Token = this.token): FundsApi =>
    withApiProxy(new FundsApi(Client.create(token, this.auth(token))));

  notifications = (token: Token = this.token): NotificationsApi =>
    withApiProxy(new NotificationsApi(Client.create(token, this.auth(token))));

  events = (token: Token = this.token): EventsApi =>
    withApiProxy(new EventsApi(Client.create(token, this.auth(token))));

  follows = (token: Token = this.token): FollowApi =>
    withApiProxy(new FollowApi(Client.create(token, this.auth(token))));

  files = (token: Token = this.token): FileApi =>
    withApiProxy(new FileApi(Client.create(token, this.auth(token))));

  assets = (token: Token = this.token): AssetsApi =>
    withApiProxy(new AssetsApi(Client.create(token, this.auth(token))));

  accounts = (token: Token = this.token): TradingaccountApi =>
    withApiProxy(new TradingaccountApi(Client.create(token, this.auth(token))));

  wallet = (token: Token = this.token): WalletApi =>
    withApiProxy(new WalletApi(Client.create(token, this.auth(token))));

  social = (token: Token = this.token): SocialApi =>
    withApiProxy(new SocialApi(Client.create(token, this.auth(token))));

  signal = (token: Token = this.token): SignalApi =>
    withApiProxy(new SignalApi(Client.create(token, this.auth(token))));

  users = (token: Token = this.token): UsersApi =>
    withApiProxy(new UsersApi(Client.create(token, this.auth(token))));

  partnership = (token: Token = this.token): PartnershipApi =>
    withApiProxy(new PartnershipApi(Client.create(token, this.auth(token))));

  brokers = (token: Token = this.token): BrokersApi =>
    withApiProxy(new BrokersApi(Client.create(token, this.auth(token))));

  rate = (token: Token = this.token): RateApi =>
    withApiProxy(new RateApi(Client.create(token, this.auth(token))));
}

export const api = new Api();
