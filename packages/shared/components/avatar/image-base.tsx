import classNames from "classnames";
import * as React from "react";
import withUrl from "shared/decorators/with-url";

export interface IImageProps {
  url: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  defaultImageClassName?: string;
}

interface IImageBaseProps {
  defaultImage: string;
}

interface IImageBaseState {
  error: boolean;
}

class ImageBase extends React.Component<
  IImageBaseProps & IImageProps,
  IImageBaseState
> {
  state = {
    error: false
  };
  handleError = (e: any) => {
    e.target.onerror = null;
    this.setState({ error: true });
  };
  render() {
    const {
      url,
      alt,
      defaultImage,
      className,
      imageClassName,
      defaultImageClassName
    } = this.props;
    const currentSrc = this.state.error || !url ? defaultImage : url;

    return (
      <div className={className}>
        <img
          alt={alt}
          className={classNames(
            imageClassName,
            this.state.error || !url ? defaultImageClassName : ""
          )}
          src={currentSrc}
          onError={this.handleError}
        />
      </div>
    );
  }
}

export default withUrl("url")(ImageBase);
