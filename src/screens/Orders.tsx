import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useOrdersStore } from "../state/ordersStore";

export default function OrdersScreen() {
  const orders = useOrdersStore((s) => s.orders);
  const loading = useOrdersStore((s) => s.loading);
  const refreshing = useOrdersStore((s) => s.refreshing);
  const updatingIds = useOrdersStore((s) => s.updatingIds);
  const load = useOrdersStore((s) => s.load);
  const refresh = useOrdersStore((s) => s.refresh);
  const advance = useOrdersStore((s) => s.advance);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator />
        <Text className="mt-3 text-gray-600">Loading orders…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-3 border-b border-gray-200">
        <Text className="text-2xl font-bold">📦 Orders</Text>
        <Text className="text-gray-600">Newest at the bottom, as received.</Text>
      </View>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const isUpdating = updatingIds.has(item.id);
          const next = item.status === "Received" ? "Preparing" : item.status === "Preparing" ? "Ready" : null;

          const statusBadgeClass =
            item.status === "Received"
              ? "bg-gray-200 text-gray-800"
              : item.status === "Preparing"
              ? "bg-yellow-200 text-yellow-900"
              : "bg-green-200 text-green-900";

          return (
            <View className="flex-row justify-between items-center bg-gray-100 p-4 mb-3 rounded-xl">
              <View className="flex-1 pr-3">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-md font-light">{item.items.join(" • ")}</Text>
                <View className={`mt-2 self-start px-2 py-1 rounded ${statusBadgeClass}`}>
                  <Text className="text-xs font-medium">Status: {item.status}</Text>
                </View>
              </View>

              {next ? (
                <TouchableOpacity
                  disabled={isUpdating}
                  onPress={() => advance(item.id)}
                  className={`px-3 py-2 rounded ${item.status === "Received" ? "bg-blue-600" : "bg-green-600"} ${isUpdating ? "opacity-60" : ""}`}
                >
                  <Text className="text-white font-medium">
                    {item.status === "Received" ? "Start Preparing" : "Mark Ready"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View className="px-3 py-2 rounded bg-green-700">
                  <Text className="text-white font-medium">Ready</Text>
                </View>
              )}
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
