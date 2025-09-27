import React, { useEffect } from "react";
import { View, Text, ScrollView, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrdersStore } from "../state/ordersStore";

export default function StatusScreen() {
  const orders = useOrdersStore((s) => s.orders);
  const load = useOrdersStore((s) => s.load);

  useEffect(() => {
    load();
    const t = setInterval(() => {
      load();
    }, 5000);
    return () => clearInterval(t);
  }, [load]);

  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  const columns = {
    Received: orders.filter((o) => o.status === "Received"),
    Preparing: orders.filter((o) => o.status === "Preparing"),
    Ready: orders.filter((o) => o.status === "Ready"),
  } as const;

  const statusBadgeClass = (status: "Received" | "Preparing" | "Ready") =>
    status === "Received"
      ? "bg-gray-200 text-gray-800"
      : status === "Preparing"
      ? "bg-yellow-200 text-yellow-900"
      : "bg-green-200 text-green-900";

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View
        style={{ flex: 1 }}
        className="p-4"
      >
        <View className="flex justify-between items-center mb-4">
          <Text className="text-3xl font-bold">Order Status</Text>
          <Text className="text-sm text-gray-600">Live kitchen display</Text>
        </View>

        <View
          style={{ flex: 1, flexDirection: isWide ? "row" : "column" }}
          className="gap-4"
        >
          {(["Received", "Preparing", "Ready"] as const).map((key) => (
            <View
              key={key}
              style={{ flex: 1 }}
              className="bg-gray-50 rounded-lg overflow-hidden"
            >
              <View className="px-4 py-3 border-b border-gray-200 bg-white">
                <Text className="text-lg font-semibold">{key}</Text>
                <Text className="text-xs text-gray-500">
                  {columns[key].length} orders
                </Text>
              </View>

              <ScrollView
                contentContainerStyle={{ padding: 12 }}
                showsVerticalScrollIndicator={false}
              >
                {columns[key].map((order) => (
                  <View
                    key={order.id}
                    className="bg-white p-4 mb-3 rounded-lg shadow"
                  >
                    <View className="flex-row justify-between items-start">
                      <View>
                        <Text className="text-lg font-semibold">{order.name}</Text>
                        <Text className="text-md font-light">
                          {order.items.join(" • ")}
                        </Text>
                      </View>
                      <View>
                        <Text className="text-xs text-gray-500 mt-1">#{order.id}</Text>
                      </View>
                      <View className={`self-start px-2 py-1 rounded ${statusBadgeClass(order.status)}`}>
                        <Text className="text-xs font-medium"> {order.status} </Text>
                      </View>
                    </View>
                  </View>
                ))}

                {columns[key].length === 0 && (
                  <View className="py-8 items-center">
                    <Text className="text-gray-400">No orders</Text>
                  </View>
                )}
              </ScrollView>
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
