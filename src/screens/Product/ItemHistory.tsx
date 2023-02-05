import { Center, Heading, VStack } from "native-base";
import { useEffect, useState, useTranslation } from "../../hooks";
import { Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import { compareDate, formatDate } from "../../utils/generic";
import { IProduct } from "../../@types/product";
type Props = {
  product: IProduct;
};
const initialHist = {
  labels: [],
  datasets: [
    {
      data: [0],
    },
  ],
};
const ProductHistory: React.FC<Props> = ({ product }) => {
  const { t } = useTranslation();
  const [hist, setHist] = useState(initialHist);
  const [priceIcon, setPriceIcon] = useState<any>({
    color: "coolGray.800",
    icon: "minus",
    diference: 0,
  });
  const [lastHist, setLastHist] = useState({
    id: "",
    price: 0,
    supermarket: {
      id: "",
      name: "",
      address: "",
    },
    createdAt: "",
    updatedAt: "",
  });

  function compare(a: any, b: any) {
    if (
      moment(a.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000").isSameOrAfter(
        moment(b.updatedAt, "YYYY-MM-DD-THH:mm:ss.00000")
      )
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  const getHistData = () => {
    if (product) {
      let prices = product.priceHistories;
      if (prices.length > 0) {
        prices = prices.sort(compareDate);
        const _labels = prices.map((x: any) =>
          formatDate(x.updatedAt, "DD/MM/YY")
        );
        const _datas = prices.map((x: any) => x.price);
        if (_labels.length == 0) {
          setHist(initialHist);
        } else {
          const datasets = [{ data: [] }];
          datasets[0].data = _datas;
          setHist({ ...hist, labels: _labels, datasets });
        }
      } else {
        setHist(initialHist);
      }
    } else {
      setHist(initialHist);
    }
  };

  useEffect(() => {
    getHistData();
  }, [product]);

  return (
    <VStack>
      {hist.labels.length > 0 && (
        <Center>
          <Heading size={"xs"} marginTop={2}>
            {t("form_messages.label_price_history")}
          </Heading>
          <LineChart
            data={hist}
            width={Dimensions.get("window").width - 50} // from react-native
            height={200}
            yAxisLabel="R$ "
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#0099e6",
              backgroundGradientFrom: "#0088e6",
              backgroundGradientTo: "#0050e6",
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Center>
      )}
    </VStack>
  );
};

export default ProductHistory;
