import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import { Card } from "react-native-paper";
import { LineChart } from "react-native-chart-kit";
import { Ionicons } from "@expo/vector-icons"; // For navigation icons
import { Image } from "expo-image";
import moment from "moment";
import { moderateScale } from "react-native-size-matters";
import { Colors } from "@/constants/Colors";
import { plainBackground, rankBackgrounds } from "@/constants/rankBackgrounds";
import { RootState } from "@/redux/store";
import { defaultBlurhash, rankBlurhashes } from "@/constants/rankBlurhashes";
import BackgroundShadows from "@/components/BackgroundShadows";
import { generalBackgrounds } from "@/constants/generalBackgrounds";
import { getBackgrundAndHashs } from "@/utils/getBackgrundAndHashs";

const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT } = Dimensions.get("window");

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

  // State to track current week index (0 = current week, 1 = previous week, etc.)
  const [weekIndex, setWeekIndex] = useState<number>(0);

  // Calculate the end and start dates of the selected week
  const currentWeek: WeekData = useMemo(() => {
    const endOfWeek = moment().subtract(weekIndex, "weeks").endOf("day");
    const startOfWeek = moment(endOfWeek).subtract(6, "days").startOf("day");
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

  // Get all dates within the selected week (from start to end)
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

  const renderHeader = () => (
    <>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handlePreviousWeek} style={styles.navButton}>
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
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={isCurrentWeek ? "#888" : "#FFFFFF"}
          />
        </TouchableOpacity>
      </View>

      <Card style={styles.chartCard}>
        <Card.Content>
          <View style={styles.chartContainer}>
            <LineChart
              data={chartData}
              width={WINDOW_WIDTH - 60} // Adjusted for padding and navigation buttons
              height={220}
              yAxisSuffix="m"
              chartConfig={{
                backgroundColor: Colors.secondary,
                backgroundGradientFrom: Colors.secondary,
                backgroundGradientTo: Colors.primary,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: { borderRadius: 16 },
              }}
              bezier
              style={styles.lineChart}
            />
          </View>
        </Card.Content>
      </Card>

      <Text style={styles.subHeader}>Weekly Summary</Text>
    </>
  );

  const renderFooter = () => <View style={styles.footerSpacing} />;

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

  const renderEmptyComponent = () => (
    <Text style={styles.noDataText}>No sessions recorded for this week.</Text>
  );

  const { usePlainBackground } = useSelector(
    (state: RootState) => state.settings
  );

  const { backgroundImageSource } = getBackgrundAndHashs({ isGeneral: true });
  const backgroundImage = usePlainBackground
    ? plainBackground
    : backgroundImageSource;

  return (
    <View style={styles.container}>
      {/* Background Image */}

      <Image
        style={styles.backgroundImage}
        source={backgroundImage}
        placeholder={{ blurhash: defaultBlurhash }}
        contentFit="cover"
        transition={1000}
      />

      {/* FlatList content over the background image */}
      <FlatList
        data={listData}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: Colors.background,
  },
  backgroundImage: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: WINDOW_HEIGHT,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: moderateScale(20),
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
  },
  lineChart: {
    borderRadius: 16,
  },
  subHeader: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: moderateScale(10),
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
  footerSpacing: {
    height: moderateScale(30),
  },
  noDataText: {
    fontSize: moderateScale(16),
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: moderateScale(20),
  },
  contentContainer: {
    paddingTop: moderateScale(100),
    paddingBottom: moderateScale(100),
    paddingHorizontal: moderateScale(20),
  },
});

export default HistoryScreen;
