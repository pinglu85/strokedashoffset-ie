import React from 'react';
import styled from 'styled-components';
import './App.css';

const isIE = /*@cc_on!@*/ false || !!document.documentMode;

const AnimateSVG = styled.svg`
  & .animate {
    stroke-dashoffset: 1000;
    animation: fadeInP 10s linear infinite;
  }
  @keyframes fadeInP {
    to {
      stroke-dashoffset: 0;
    }
  }
  & .path {
    stroke-dashoffset: ${props => props.offset};
  }
`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { offset: 1000 };
  }

  componentDidMount() {
    if (isIE) {
      this.offsetMe();
    }
  }

  offsetMe = () => {
    if (this.state.offset < 0) {
      this.setState({ offset: 1000 });
    }
    const newOffset = this.state.offset - 1;
    this.setState({ offset: newOffset });
    requestAnimationFrame(this.offsetMe);
  };

  render() {
    let text = <p>Browser is not IE</p>;
    let className = 'animate';
    if (isIE) {
      text = <p>Browser is IE</p>;
      className = 'path';
    }
    return (
      <div>
        {text}
        <div className="svg-wrapper">
          <AnimateSVG offset={this.state.offset} viewBox="0 0 400 400">
            <path
              fill="none"
              stroke="#000"
              strokeDasharray="10 10"
              strokeWidth="8"
              d="M0 0c100 10 200 80 300 15"
              className={className}
            ></path>
          </AnimateSVG>
        </div>
      </div>
    );
  }
}

export default App;
