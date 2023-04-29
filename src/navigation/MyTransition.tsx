import { Animated } from "react-native";
import { TransitionSpecs } from "@react-navigation/stack";
import type {
  StackCardInterpolationProps,
  StackCardInterpolatedStyle,
} from "@react-navigation/stack";

interface MyTransitionProps {
  current: StackCardInterpolationProps["current"];
  next?: StackCardInterpolationProps["next"];
  inverted: boolean;
  layouts: StackCardInterpolationProps["layouts"];
}

const MyTransition = {
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({
    current,
    next,
    inverted,
    layouts: { screen },
  }: MyTransitionProps): StackCardInterpolatedStyle => {
    const progress = Animated.add(
      current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: "clamp",
      }),
      next
        ? next.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: "clamp",
          })
        : 0
    );

    return {
      cardStyle: {
        transform: [
          {
            translateX: Animated.multiply(
              progress.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [
                  screen.width, // Fica fora da tela a direita
                  0, // Posição original
                  -screen.width, // Fica fora da tela a esquerda
                ],
              }),
              inverted
            ),
          },
        ],
      },
    };
  },
};

export default MyTransition;
