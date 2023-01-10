import { NotificationItem } from "@pushprotocol/uiweb";
import { Indicator, Button, ScrollArea, Menu, Tooltip } from "@mantine/core";
import { BellIcon } from "@chakra-ui/icons";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";

export default function NotificationItems({ notifications, OptInChannel }) {
  return (
    <div>
      <Menu width="'100%" position="bottom" withArrow shadow="md">
        <Menu.Target>
          <Tooltip
            multiline
            width={200}
            transition="fade"
            label="ℹ Push notifications of newly released live streams in the app"
          >
            <Indicator offset={7} color="green.8" label="New" size={16}>
              <BellIcon
                color="#FF0057"
                aria-label="BellIcon database"
                boxSize="40"
                mx="5"
                my="5"
                id="sdk-trigger-id"
              />
            </Indicator>
          </Tooltip>
        </Menu.Target>
        <Menu.Dropdown>
          <center>
            <Button
              onClick={() => {
                OptInChannel;
                showNotification({
                  id: "load-data",
                  loading: true,
                  title: "Subscribing to Channel",
                  message:
                    "Subscribing request begin Sent in 5 seconds, you cannot close this yet",
                  autoClose: false,
                  disallowClose: true,
                });

                setTimeout(() => {
                  updateNotification({
                    id: "load-data",
                    color: "teal",
                    title: "User is Subscribing",
                    message:
                      "Notification will close in 2 seconds, you can close this notification now",
                    icon: <IconCheck size={16} />,
                    autoClose: 4000,
                  });
                }, 3000);
              }}
              variant="outline"
              color="green"
            >
              Subscribe
            </Button>
          </center>
          <ScrollArea style={{ height: 800 }}>
            {notifications.map((oneNotification, i) => {
              const { cta, title, message, app, icon, image, url, blockchain } =
                oneNotification;

              return (
                <NotificationItem
                  key={i} // any unique id
                  notificationTitle={title}
                  notificationBody={message}
                  cta={cta}
                  app={app}
                  icon={icon}
                  image={image}
                  url={url}
                  theme="dark"
                  chainName={blockchain}
                />
              );
            })}
          </ScrollArea>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
