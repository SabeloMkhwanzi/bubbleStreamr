import React from "react";
import { IconPlayerPlay } from "@tabler/icons";
import { Button } from "@mantine/core";

export class JoinStreamButton extends React.Component {
  constructor(props) {
    super(props);
    this.unlockHandler = this.unlockHandler.bind(this);
    this.checkout = this.checkout.bind(this);
    this.state = {
      locked: "pending", // there are 3 state: pending, locked and unlocked
    };
  }

  /**
   * When the component mounts, listen to events from unlockProtocol
   */
  componentDidMount() {
    window.addEventListener("unlockProtocol", this.unlockHandler);
  }

  /**
   * Make sure we clean things up before unmounting
   */
  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler);
  }

  /**
   * Invoked to show the checkout modal provided by Unlock (optional... but convenient!)
   */
  checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  }

  /**
   * event handler
   * @param {*} e
   */
  unlockHandler(e) {
    this.setState((state) => {
      return {
        ...state,
        locked: e.detail,
      };
    });
  }

  render() {
    const { locked } = this.state;
    return (
      <div>
        {(locked === "pending" || locked === "locked") && (
          <Button
            rightIcon={<IconPlayerPlay size={20} color="black" stroke={5} />}
            styles={(theme) => ({
              root: {
                backgroundColor: "#00eb88",
                borderRadius: 10,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                "&:hover": {
                  backgroundColor: theme.fn.darken("#00eb88", 0.05),
                },
              },
              leftIcon: {
                marginRight: 15,
              },
            })}
            onClick={() => {
              this.checkout();
            }}
            className="mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Subscribe
          </Button>
        )}
        {locked === "unlocked" && (
          <Button
            rightIcon={<IconPlayerPlay size={20} color="black" stroke={5} />}
            styles={(theme) => ({
              root: {
                backgroundColor: "#00eb88",
                borderRadius: 10,
                height: 42,
                paddingLeft: 20,
                paddingRight: 20,

                "&:hover": {
                  backgroundColor: theme.fn.darken("#00eb88", 0.05),
                },
              },
              leftIcon: {
                marginRight: 15,
              },
            })}
            onClick={() => {
              this.props.renderPlayer(true);
            }}
            className="mb-4 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Watch Stream
          </Button>
        )}
      </div>
    );
  }
}
