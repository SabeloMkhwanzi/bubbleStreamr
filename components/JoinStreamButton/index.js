import React from "react";
import { IconPlayerPlay } from "@tabler/icons";
import { Button, Text, Tooltip } from "@mantine/core";
import { Petrona } from "@next/font/google";

const petrona = Petrona({ weight: "500" });

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
          <Tooltip
            multiline
            withArrow
            width={300}
            transition="fade"
            label="ℹ The Playback ID that you obtained from the stream creator or Push Alert should be copied and pasted. After that, click the subscribe button to purchase a NFT via the Unlock Protocol and join the stream."
          >
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
            >
              <Text
                fw={700}
                fz="xl"
                color="black"
                className={petrona.className}
              >
                Subscribe
              </Text>
            </Button>
          </Tooltip>
        )}
        {locked === "unlocked" && (
          <Button
            fw={700}
            fz="xl"
            color="black"
            className={petrona.className}
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
          >
            <Text fw={700} fz="xl" color="black" className={petrona.className}>
              Watch Stream
            </Text>
          </Button>
        )}
      </div>
    );
  }
}
