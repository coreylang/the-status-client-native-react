import React, { useEffect } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { useOrdersStore } from "../state/ordersStore";

export default function Home() {
  const orders = useOrdersStore((s) => s.orders);
  const counts = useOrdersStore((s) => s.counts);
  const loading = useOrdersStore((s) => s.loading);
  const refreshing = useOrdersStore((s) => s.refreshing);
  const load = useOrdersStore((s) => s.load);
  const refresh = useOrdersStore((s) => s.refresh);

  // Load once on mount. load is stable from the store.
  useEffect(() => {
    load();
  }, [load]);

  const total = orders.length;

  return (
    <ScrollView
      className="flex-1 bg-gray-100 p-6"
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
    >
      <Text className="text-2xl font-bold mb-6">Kitchen Dashboard</Text>

      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-lg font-semibold">Total Orders</Text>
        <Text className="text-3xl font-bold text-blueberry">{total}</Text>
      </View>

      <View className="bg-white rounded-lg p-4 mb-4 shadow">
        <Text className="text-lg font-semibold mb-2">By Status</Text>

        <View className="flex-row justify-between mb-2">
          <Text className="text-red-500 font-medium">Received</Text>
          <Text className="text-xl font-bold">{counts.Received}</Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-orange-500 font-medium">Preparing</Text>
          <Text className="text-xl font-bold">{counts.Preparing}</Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-green-600 font-medium">Ready</Text>
          <Text className="text-xl font-bold">{counts.Ready}</Text>
        </View>
      </View>
    </ScrollView>
  );
}
