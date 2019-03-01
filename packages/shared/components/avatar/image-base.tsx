import React, { Component } from "react";
import withUrl from "shared/decorators/with-url";

export interface IImageProps {
  url: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

interface IImageBaseProps extends ImageBase {
  defaultImage: string;
}

interface IImageBaseState {
  error: boolean;
}

class ImageBase extends Component<IImageBaseProps, IImageBaseState> {
  state = {
    error: false
  };
  handleError = (e: any) => {
    e.target.onerror = null;
    this.setState({ error: true });
  };
  render() {
    const { url, alt, defaultImage, className, imageClassName } = this.props;
    const currentSrc = this.state.error || !url ? defaultImage : url;

    return (
      <div className={className}>
        <img
          alt={alt}
          className={imageClassName}
          src={currentSrc}
          onError={this.handleError}
        />
      </div>
    );
  }
}

export default withUrl("url")(ImageBase);
