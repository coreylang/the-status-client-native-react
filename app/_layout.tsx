import { Tabs } from "expo-router";
import "../global.css";

export default function RootLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="false" role="img">
              <title>Home</title>
              <path d="M3 10.5L12 4l9 6.5" />
              <path d="M5 11v7a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-7" />
              <rect x="10" y="14" width="4" height="4" rx="0.5" />
            </svg>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, size }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="false" role="img">
              <title>Orders</title>
              <rect x="3.5" y="3.5" width="13" height="17" rx="1.2" />
              <path d="M6.5 7.5h7" />
              <path d="M6.5 10.5h7" />
              <path d="M6.5 13.5h4" />
              <g transform="translate(17,6)">
                <rect x="0" y="6" width="4" height="4" rx="0.6" />
                <path d="M0 6.5 L2 4.5 L4 6.5" />
              </g>
            </svg>

          ),
        }}
      />
      <Tabs.Screen
        name="status"
        options={{
          title: "Status",
          tabBarIcon: ({ color, size }) => (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24" width="42" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="false" role="img">
              <title>Status</title>
              <rect x="2" y="8" width="9" height="12" rx="1" />
              <rect x="14" y="4" width="8" height="16" rx="1" />
              <rect x="26" y="2" width="8" height="18" rx="1" />
            </svg>
          ),
        }}
      />
    </Tabs>
  );
}
