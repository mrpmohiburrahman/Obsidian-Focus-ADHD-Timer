// screens/HistoryScreen.tsx

import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Card, Title, Paragraph } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import moment from "moment";
import { Colors } from "@/constants/Colors";
import { moderateScale } from "react-native-size-matters";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const screenWidth = Dimensions.get("window").width;

const HistoryScreen: React.FC = () => {
  const sessions = useSelector((state: RootState) => state.xp.sessions);

  // Group sessions by date
  const sessionsByDate = useMemo(() => {
    const grouped: { [key: string]: number[] } = {};

    sessions.forEach((session) => {
      if (!grouped[session.date]) {
        grouped[session.date] = [];
      }
      grouped[session.date].push(session.duration);
    });

    return grouped;
  }, [sessions]);

  // Get the last 7 days
  const last7Days = useMemo(() => {
    const days: string[] = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
    }
    return days;
  }, []);

  // Prepare data for the chart
  const chartData = useMemo(() => {
    const data = last7Days.map((date) => {
      const durations = sessionsByDate[date] || [];
      const total = durations.reduce((acc, curr) => acc + curr, 0);
      return total / 60; // Convert seconds to minutes
    });

    return {
      labels: last7Days.map((date) => moment(date).format("ddd")),
      datasets: [
        {
          data: data,
        },
      ],
    };
  }, [last7Days, sessionsByDate]);

  // Prepare list data
  const listData = useMemo(() => {
    return last7Days.map((date) => {
      const durations = sessionsByDate[date] || [];
      const totalSessions = durations.length;
      const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
      return {
        date,
        totalSessions,
        totalDuration: totalDuration / 60, // Convert to minutes
      };
    });
  }, [last7Days, sessionsByDate]);
  const inset = useSafeAreaInsets();
  return (
    <ScrollView
      style={{
        flex: 1,
        padding: 20,
        paddingTop: inset.top,
        backgroundColor: Colors.background, // Define in Colors.ts
      }}
    >
      

      {/* Chart Section */}
      <Card
        style={{
          backgroundColor: "transparent",
          borderRadius: 16,
          marginBottom: 20,
          // borderWidth: 1,
          // borderColor: "red",
        }}
      >
        <Card.Content
          style={
            {
              // borderWidth: 1,
              // borderColor: "cyan",
            }
          }
        >
          <Title>Total Time Spent (Last 7 Days)</Title>
          <LineChart
            data={chartData}
            width={screenWidth - 40}
            height={220}
            yAxisSuffix="m"
            chartConfig={{
              backgroundColor: Colors.secondary,
              backgroundGradientFrom: Colors.secondary,
              backgroundGradientTo: Colors.primary,
              decimalPlaces: 0, // optional, defaults to 2dp
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
              // marginVertical: 8,
              marginLeft: moderateScale(-18),
              borderRadius: 16,
              // borderWidth: 1,
              // borderColor: "red",
            }}
          />
        </Card.Content>
      </Card>

      {/* List Section */}
      <View style={styles.listContainer}>
        <Text style={styles.subHeader}>Last 7 Days Summary</Text>
        <FlatList
          data={listData}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <Card style={styles.listCard}>
              <Card.Content>
                <View style={styles.listItem}>
                  <Text style={styles.dateText}>
                    {moment(item.date).format("MMMM Do")}
                  </Text>
                  <View style={styles.stats}>
                    <Text style={styles.statText}>
                      Sessions: {item.totalSessions}
                    </Text>
                    <Text style={styles.statText}>
                      Total: {item.totalDuration}m
                    </Text>
                  </View>
                </View>
              </Card.Content>
            </Card>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {},
  subHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  card: {},
  listContainer: {
    flex: 1,
  },
  listCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: 10,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  stats: {
    alignItems: "flex-end",
  },
  statText: {
    fontSize: 14,
    color: "#FFFFFF",
  },
});

export default HistoryScreen;
