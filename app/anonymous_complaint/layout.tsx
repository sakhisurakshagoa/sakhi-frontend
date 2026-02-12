// app/anonymous_complaint/layout.tsx
"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { createConfig } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { injected } from "wagmi/connectors";

const queryClient = new QueryClient();

const wagmiConfig = createConfig({
  chains: [polygonAmoy],
  transports: {
    [polygonAmoy.id]: http("https://rpc-amoy.polygon.technology"),
  },
  connectors: [injected()],
});

export default function AnonymousComplaintLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PrivyProvider
      appId="cmlglj94f00f8jp0c1qqoiqi7"  // ← Paste your App ID from Step 1
      config={{
        loginMethods: ["wallet"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
          noPromptOnSignature: true,
        },
        supportedChains: [polygonAmoy],
      }}
    >
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiProvider>
    </PrivyProvider>
  );
}