import React, { Component } from "react";
import { Text } from "native-base";
import { TouchableOpacity } from "react-native";
import Swipeable from "react-native-swipeable";

export default class SwipeableItem extends Component {
  swipeable = null;

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }

  render() {
    return (
      <Swipeable
        onRef={(ref) => (this.swipeable = ref)}
        leftButtons={[
          <TouchableOpacity
            style={[
              {
                alignItems: "flex-end",
                justifyContent: "center",
                paddingRight: 20,
                backgroundColor: "#7AC1E4",
                marginTop: 15,
                height: "80%",
                borderRadius: 50,
              },
            ]}
            onPress={() => {
              this.handleUserBeganScrollingParentView();
              if (this.props.onPressLeftButton != undefined) {
                this.props.onPressLeftButton();
              }
            }}
          >
            <Text fontWeight={"bold"} color={"black"}>
              {this.props.leftTitleButton}
            </Text>
          </TouchableOpacity>,
        ]}
        rightButtons={[
          <TouchableOpacity
            style={[
              {
                alignItems: "flex-start",
                justifyContent: "center",
                paddingLeft: 15,
                backgroundColor: "red",
                marginTop: 15,
                height: "80%",
                borderRadius: 50,
              },
            ]}
            onPress={() => {
              this.handleUserBeganScrollingParentView();

              if (this.props.onPressRightButton != undefined) {
                this.props.onPressRightButton();
              }
            }}
          >
            <Text fontWeight={"bold"} color={"white"}>
              {this.props.rightTitleButton}
            </Text>
          </TouchableOpacity>,
        ]}
      >
        {this.props.children}
      </Swipeable>
    );
  }
}
