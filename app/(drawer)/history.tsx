// screens/HistoryScreen.tsx

import { LavaLamp } from "@/components/LavaLamp";
import { Colors } from "@/constants/Colors";
import { RootState } from "@/redux/store";
import { Ionicons } from "@expo/vector-icons"; // For navigation icons
import moment from "moment";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Card, Title } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";
import { useSelector } from "react-redux";

const screenWidth = Dimensions.get("window").width;

interface WeekData {
  startOfWeek: string; // YYYY-MM-DD
  endOfWeek: string; // YYYY-MM-DD
}

interface ListItem {
  date: string;
  totalSessions: number;
  totalDuration: number; // in minutes
}

const HistoryScreen: React.FC = () => {
  const sessions = useSelector((state: RootState) => state.xp.sessions);
  const inset = useSafeAreaInsets();

  // State to track current week index (0 = current week, 1 = previous week, etc.)
  const [weekIndex, setWeekIndex] = useState<number>(0);

  // Calculate the start and end dates of the selected week
  const currentWeek: WeekData = useMemo(() => {
    const startOfWeek = moment()
      .subtract(weekIndex, "weeks")
      .startOf("isoWeek");
    const endOfWeek = moment(startOfWeek).endOf("isoWeek");
    return {
      startOfWeek: startOfWeek.format("YYYY-MM-DD"),
      endOfWeek: endOfWeek.format("YYYY-MM-DD"),
    };
  }, [weekIndex]);

  // Filter sessions within the selected week
  const sessionsInWeek = useMemo(() => {
    return sessions.filter((session) =>
      moment(session.date).isBetween(
        currentWeek.startOfWeek,
        currentWeek.endOfWeek,
        undefined,
        "[]"
      )
    );
  }, [sessions, currentWeek]);

  // Group sessions by date within the selected week
  const sessionsByDate = useMemo(() => {
    const grouped: { [key: string]: number[] } = {};

    sessionsInWeek.forEach((session) => {
      if (!grouped[session.date]) {
        grouped[session.date] = [];
      }
      grouped[session.date].push(session.duration);
    });

    return grouped;
  }, [sessionsInWeek]);

  // Get all dates within the selected week
  const datesInWeek = useMemo(() => {
    const days: string[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(
        moment(currentWeek.startOfWeek).add(i, "days").format("YYYY-MM-DD")
      );
    }
    return days;
  }, [currentWeek]);

  // Prepare data for the chart
  const chartData = useMemo(() => {
    const data = datesInWeek.map((date) => {
      const durations = sessionsByDate[date] || [];
      const total = durations.reduce((acc, curr) => acc + curr, 0);
      return total / 60; // Convert seconds to minutes
    });

    return {
      labels: datesInWeek.map((date) => moment(date).format("ddd")),
      datasets: [
        {
          data: data,
        },
      ],
    };
  }, [datesInWeek, sessionsByDate]);

  // Prepare list data
  const listData = useMemo<ListItem[]>(() => {
    return datesInWeek.map((date) => {
      const durations = sessionsByDate[date] || [];
      const totalSessions = durations.length;
      const totalDuration = durations.reduce((acc, curr) => acc + curr, 0);
      return {
        date,
        totalSessions,
        totalDuration: totalDuration / 60, // Convert to minutes
      };
    });
  }, [datesInWeek, sessionsByDate]);

  // Handlers for week navigation
  const handlePreviousWeek = () => {
    setWeekIndex((prev) => prev + 1);
  };

  const handleNextWeek = () => {
    if (weekIndex > 0) {
      setWeekIndex((prev) => prev - 1);
    }
  };

  // Disable Next Week button if viewing the current week
  const isCurrentWeek = weekIndex === 0;

  // Render ListHeaderComponent
  const renderHeader = () => (
    <>
      {/* Header with Week Navigation */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={handlePreviousWeek}
          style={styles.navButton}
          accessibilityLabel="Previous Week"
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.headerText}>
          {moment(currentWeek.startOfWeek).format("MMM DD")} -{" "}
          {moment(currentWeek.endOfWeek).format("MMM DD, YYYY")}
        </Text>

        <TouchableOpacity
          onPress={handleNextWeek}
          style={styles.navButton}
          disabled={isCurrentWeek}
          accessibilityLabel="Next Week"
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isCurrentWeek ? "#888" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      {/* Chart Section */}
      <Card style={styles.chartCard}>
        <Card.Content>
          <Title>Total Time Spent (Selected Week)</Title>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={screenWidth - 60} // Adjusted for padding and navigation buttons
              height={220}
              yAxisSuffix="m"
              yAxisInterval={1} // optional, defaults to 1
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
                  r: "4",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={styles.lineChart}
              withInnerLines={false}
              withOuterLines={false}
              verticalLabelRotation={-45}
            />
          </View>
        </Card.Content>
      </Card>

      {/* Summary Header */}
      <Text style={styles.subHeader}>Weekly Summary</Text>
    </>
  );

  // Render ListFooterComponent for additional spacing
  const renderFooter = () => <View style={styles.footerSpacing} />;

  // Render Item for FlatList
  const renderItem = ({ item }: { item: ListItem }) => (
    <Card style={styles.listCard}>
      <Card.Content>
        <View style={styles.listItem}>
          <Text style={styles.dateText}>
            {moment(item.date).format("MMMM Do")}
          </Text>
          <View style={styles.stats}>
            <Text style={styles.statText}>Sessions: {item.totalSessions}</Text>
            <Text style={styles.statText}>Total: {item.totalDuration}m</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  // Optional: Show a message if there are no sessions in the selected week
  const hasSessions = useMemo(() => {
    return sessionsInWeek.length > 0;
  }, [sessionsInWeek]);

  const renderEmptyComponent = () => (
    <Text style={styles.noDataText}>No sessions recorded for this week.</Text>
  );

  return (
    <FlatList
      data={listData}
      keyExtractor={(item) => item.date}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmptyComponent}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      style={{ backgroundColor: Colors.background }}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // marginBottom: moderateScale(20),
  },
  navButton: {
    padding: moderateScale(10),
  },
  headerText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  chartCard: {
    backgroundColor: "transparent",
    borderRadius: 16,
    marginBottom: moderateScale(20),
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  lineChart: {
    borderRadius: 16,
  },
  listContainer: {
    flex: 1,
  },
  listCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    marginBottom: moderateScale(10),
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
  subHeader: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: moderateScale(10),
  },
  footerSpacing: {
    height: moderateScale(30), // Adjust as needed
  },
  noDataText: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  contentContainer: {
    backgroundColor: Colors.background,
    paddingBottom: moderateScale(100), // Additional spacing at the bottom
    paddingHorizontal: moderateScale(20),
  },
});

export default HistoryScreen;
