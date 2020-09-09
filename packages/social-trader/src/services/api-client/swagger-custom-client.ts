import {
  ApiClient,
  AssetsApi,
  AuthApi,
  BrokersApi,
  DashboardApi,
  EventsApi,
  ExchangesApi,
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
  SearchApi,
  SignalApi,
  SocialApi,
  TradingaccountApi,
  TradingplatformApi,
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

class Client extends ApiClient {
  token: Token;

  constructor(
    apiUrl: string = "https://localhost/api",
    token: Token = Token.create()
  ) {
    super(apiUrl);
    this.token = token;
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

  public static create(token?: Token) {
    return new Client(apiUrl, token);
  }
}

const client = new ApiClient(apiUrl);
export default client;

export class Api {
  terminal = (token?: Token): TradingplatformApi =>
    withApiProxy(new TradingplatformApi(Client.create(token)));

  exchanges = (token?: Token): ExchangesApi =>
    withApiProxy(new ExchangesApi(Client.create(token)));

  auth = (token?: Token): AuthApi =>
    withApiProxy(new AuthApi(Client.create(token)));

  profile = (token?: Token): ProfileApi =>
    withApiProxy(new ProfileApi(Client.create(token)));

  dashboard = (token?: Token): DashboardApi =>
    withApiProxy(new DashboardApi(Client.create(token)));

  platform = (token?: Token): PlatformApi =>
    withApiProxy(new PlatformApi(Client.create(token)));

  programs = (token?: Token): ProgramsApi =>
    withApiProxy(new ProgramsApi(Client.create(token)));

  investments = (token?: Token): InvestmentsApi =>
    withApiProxy(new InvestmentsApi(Client.create(token)));

  funds = (token?: Token): FundsApi =>
    withApiProxy(new FundsApi(Client.create(token)));

  notifications = (token?: Token): NotificationsApi =>
    withApiProxy(new NotificationsApi(Client.create(token)));

  events = (token?: Token): EventsApi =>
    withApiProxy(new EventsApi(Client.create(token)));

  follows = (token?: Token): FollowApi =>
    withApiProxy(new FollowApi(Client.create(token)));

  files = (token?: Token): FileApi =>
    withApiProxy(new FileApi(Client.create(token)));

  assets = (token?: Token): AssetsApi =>
    withApiProxy(new AssetsApi(Client.create(token)));

  accounts = (token?: Token): TradingaccountApi =>
    withApiProxy(new TradingaccountApi(Client.create(token)));

  wallet = (token?: Token): WalletApi =>
    withApiProxy(new WalletApi(Client.create(token)));

  social = (token?: Token): SocialApi =>
    withApiProxy(new SocialApi(Client.create(token)));

  signal = (token?: Token): SignalApi =>
    withApiProxy(new SignalApi(Client.create(token)));

  users = (token?: Token): UsersApi =>
    withApiProxy(new UsersApi(Client.create(token)));

  partnership = (token?: Token): PartnershipApi =>
    withApiProxy(new PartnershipApi(Client.create(token)));

  brokers = (token?: Token): BrokersApi =>
    withApiProxy(new BrokersApi(Client.create(token)));

  rate = (token?: Token): RateApi =>
    withApiProxy(new RateApi(Client.create(token)));

  search = (token?: Token): SearchApi =>
    withApiProxy(new SearchApi(Client.create(token)));
}

export const api = new Api();
