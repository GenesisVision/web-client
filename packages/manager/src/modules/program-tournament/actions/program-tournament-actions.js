import authService from "../../../services/auth-service";
import SwaggerManagerApi from "../../../services/api-client/swagger-manager-api";
import { TOURNAMENT_PROGRAM_CREATE } from "./program-tournament-actions.constants";

export const createTournamentProgram = request => ({
  type: TOURNAMENT_PROGRAM_CREATE,
  payload: SwaggerManagerApi.apiManagerAccountTournamentNewInvestmentRequestPost(
    authService.getAuthArg(),
    { request }
  )
});
