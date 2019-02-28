import React, { Component } from "react";
import withUrl from "shared/decorators/with-url";

export interface ImageBaseProps {
  url: string;
  alt: string;
  defaultImage: string;
  className?: string;
  imageClassName?: string;
}

interface ImageBaseState {
  imageLoadError: boolean;
}

class ImageBase extends Component<ImageBaseProps, ImageBaseState> {
  private readonly image: React.RefObject<any>;

  constructor(props: ImageBaseProps) {
    super(props);
    this.image = React.createRef();
  }

  state = {
    imageLoadError: false
  };

  handleImageError = (event: any) => {
    event.target.onerror = null;
    this.setState({ imageLoadError: true });
  };

  componentDidMount() {
    this.image.current.onerror = this.handleImageError;
  }

  render() {
    const { url, alt, defaultImage, className, imageClassName } = this.props;
    const currentSrc = this.state.imageLoadError || !url ? defaultImage : url;

    return (
      <div className={className}>
        <img
          alt={alt}
          className={imageClassName}
          src={currentSrc}
          ref={this.image}
        />
      </div>
    );
  }
}

export default withUrl("url")(ImageBase);
