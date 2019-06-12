import React, { PureComponent } from "react";

const ICON = `M2.5,91.2l249.9-7.4l58.3,74.2l-6.2,5.2l-5.9-5.2l-96.4,71.7H74.5l-48.8-47.6l-13.8-44.5H8.1
	L2.5,91.2z`;

const pinStyle = {
  cursor: "pointer",
  fill: "#40c5ab",
  stroke: "#fff",
  strokeWidth: 15,
  strokeMiterlimit: 10
};

export default class CityPin extends PureComponent {
  render() {
    const { size = 30, onClick } = this.props;

    return (
      <svg
        height={size}
        viewBox="0 0 313.3 313.3"
        style={{
          ...pinStyle,
          transform: `translate(${-size / 2}px,${-size}px)`
        }}
        onClick={onClick}
      >
        <path d={ICON} />
      </svg>
    );
  }
}
