import "./details-description-control.scss";

import React, { ComponentType, FunctionComponent, PureComponent } from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import FavoriteIcon from "shared/components/favorite-asset/favorite-icon/favorite-icon";
import isAuthenticated from "shared/decorators/is-authenticated";
import { toggleFavoriteProgram } from "shared/modules/favorite-asset/services/favorite-program.service";

import DetailsDescriptionControl from "./details-description-control";

interface IDetailsFavoriteOwnProps {
  id: string;
  isFavorite: boolean;
}

interface IDetailsFavoriteProps
  extends IDetailsFavoriteOwnProps,
    InjectedTranslateProps {}

interface IDetailsFavoriteState {
  isFavorite: boolean;
  isPending: boolean;
}

class DetailsFavorite extends PureComponent<
  IDetailsFavoriteProps,
  IDetailsFavoriteState
> {
  constructor(props: IDetailsFavoriteProps) {
    super(props);
    this.state = {
      isFavorite: false,
      isPending: false
    };
  }
  handleFavoriteClickOnButton = (id: string, isFavorite: boolean) => {
    this.setState({ isFavorite: !isFavorite, isPending: true });
    toggleFavoriteProgram(id, !isFavorite)
      .then(() => {
        this.setState({ isPending: false });
      })
      .catch(() => {
        this.setState({ isFavorite: isFavorite, isPending: false });
      });
  };

  handleFavoriteClickOnText = () => {
    this.handleFavoriteClickOnButton(this.props.id, this.state.isFavorite);
  };

  render() {
    const { t, id } = this.props;
    const { isFavorite, isPending } = this.state;
    return (
      <DetailsDescriptionControl
        tag="button"
        className="details-description-control--button"
        onClick={this.handleFavoriteClickOnText}
        disabled={isPending}
        text={t("fund-details-page.description.addToFavorites")}
      >
        <FavoriteIcon
          className="details-description-control__icon"
          id={id}
          selected={isFavorite}
          onClick={this.handleFavoriteClickOnButton}
        />
      </DetailsDescriptionControl>
    );
  }
}
export default compose<ComponentType<IDetailsFavoriteOwnProps>>(
  translate(),
  isAuthenticated
)(DetailsFavorite);
