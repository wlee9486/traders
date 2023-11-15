/**
 * @author heera youn
 * @create date 2023-10-25 14:16:07
 * @modify date 2023-10-28 17:53:32
 */
import React, { Component } from "react";

class Confetti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confettiElements: [],
    };
    this.confettiColors = [
      "#EF2964",
      "#00C09D",
      "#2D87B0",
      "#48485E",
      "#EFFF1D",
    ];
    this.confettiAnimations = ["slow", "medium", "fast"];
  }

  componentDidMount() {
    this.confettiInterval = setInterval(() => {
      const confettiSize = Math.floor(Math.random() * 3) + 7 + "px";
      const confettiBackground =
        this.confettiColors[
          Math.floor(Math.random() * this.confettiColors.length)
        ];
      const confettiLeft = Math.floor(Math.random() * window.innerWidth) + "px";
      const confettiAnimation =
        this.confettiAnimations[
          Math.floor(Math.random() * this.confettiAnimations.length)
        ];

      const newConfetti = {
        size: confettiSize,
        background: confettiBackground,
        left: confettiLeft,
        animation: confettiAnimation,
      };

      this.setState((prevState) => ({
        confettiElements: [...prevState.confettiElements, newConfetti],
      }));

      setTimeout(() => {
        this.setState((prevState) => ({
          confettiElements: prevState.confettiElements.slice(1),
        }));
      }, 3000);
    }, 25);
  }

  componentWillUnmount() {
    clearInterval(this.confettiInterval);
  }

  render() {
    return (
      <div className="confetti-container">
        {this.state.confettiElements.map((confetti, index) => (
          <div
            key={index}
            className={`confetti confetti--animation-${confetti.animation}`}
            style={{
              left: confetti.left,
              width: confetti.size,
              height: confetti.size,
              backgroundColor: confetti.background,
            }}
          />
        ))}
      </div>
    );
  }
}

export default Confetti;
