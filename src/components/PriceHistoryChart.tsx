import PriceHistories from "@/types/PriceHistories";
import React from "react";
import { View, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";

type Props = {
  priceHistories: Array<PriceHistories>;
};

const PriceHistoryChart = ({ priceHistories }: Props) => {
  const data = {
    labels: priceHistories.map((history) => history.createdAt),
    datasets: [
      {
        data: priceHistories.map((history) => history.price),
      },
    ],
  };

  return (
    <View>
      <LineChart
        data={data}
        width={350}
        height={220}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PriceHistoryChart;
