import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/Tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Search,
  Image as ImageIcon,
  LayersIcon,
  Clock,
  ExternalLink,
  Copy,
  RefreshCcw,
} from "lucide-react";
import { mockData } from "../data/data";

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const formatNumber = (value: number, decimals = 2) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

const formatAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

const App = () => {
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-3xl font-bold text-blue-900">Supra Bank</h1>
            <div className="flex w-full sm:w-auto gap-2">
              <Input
                className="max-w-md"
                placeholder="Enter wallet address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {isLoading ? (
                  <RefreshCcw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Search className="w-4 h-4 mr-2" />
                )}
                Search
              </Button>
            </div>
          </div>

          {/* Portfolio Value Card */}
          <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardContent className="py-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="text-blue-100 mb-2">
                    Total Portfolio Value
                  </div>
                  <div className="text-4xl font-bold">
                    {formatCurrency(mockData.totalBalance)}
                  </div>
                </div>
                <div
                  className={`flex items-center ${
                    mockData.totalBalanceChange24h >= 0
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {mockData.totalBalanceChange24h >= 0 ? (
                    <ArrowUpRight size={20} />
                  ) : (
                    <ArrowDownRight size={20} />
                  )}
                  <span className="ml-1 text-lg">
                    {Math.abs(mockData.totalBalanceChange24h)}%
                  </span>
                  <span className="ml-2 text-sm text-blue-100">24h change</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="portfolio" className="space-y-6">
          <TabsList className="w-full justify-start bg-white border-b border-gray-200 p-0">
            <TabsTrigger
              value="portfolio"
              className="px-6 py-4 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <Wallet className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger
              value="nfts"
              className="px-6 py-4 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              NFTs
            </TabsTrigger>
            <TabsTrigger
              value="staking"
              className="px-6 py-4 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <LayersIcon className="w-4 h-4 mr-2" />
              Staking
            </TabsTrigger>
            <TabsTrigger
              value="transactions"
              className="px-6 py-4 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
            >
              <Clock className="w-4 h-4 mr-2" />
              Transactions
            </TabsTrigger>
          </TabsList>

          {/* Portfolio Tab Content */}
          <TabsContent value="portfolio">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.tokens.map((token) => (
                <Card
                  key={token.symbol}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="py-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <img
                          src={token.icon}
                          alt={token.name}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <div className="font-semibold text-lg">
                            {token.symbol}
                          </div>
                          <div className="text-sm text-gray-500">
                            {token.name}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`flex items-center ${
                            token.change24h >= 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {token.change24h >= 0 ? (
                            <ArrowUpRight size={16} />
                          ) : (
                            <ArrowDownRight size={16} />
                          )}
                          <span className="ml-1">
                            {Math.abs(token.change24h)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">24h</div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Balance</span>
                        <span className="font-medium">
                          {formatNumber(token.balance)} {token.symbol}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Value</span>
                        <span className="font-medium">
                          {formatCurrency(token.balance * token.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price</span>
                        <span className="font-medium">
                          {formatCurrency(token.price)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">24h Volume</span>
                        <span className="font-medium">
                          {formatCurrency(token.volume24h)}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* NFTs Tab Content */}
          <TabsContent value="nfts">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.nfts.map((nft) => (
                <Card
                  key={nft.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="py-6">
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <div className="space-y-4">
                      <div>
                        <div className="font-semibold text-lg">{nft.name}</div>
                        <div className="text-sm text-gray-500">
                          {nft.collection}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">
                            Floor Price
                          </div>
                          <div className="font-medium">
                            {formatCurrency(nft.floorPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">
                            Last Price
                          </div>
                          <div className="font-medium">
                            {formatCurrency(nft.lastPrice)}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Rarity</div>
                          <div className="font-medium">{nft.rarity}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Rank</div>
                          <div className="font-medium">#{nft.rank}</div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {nft.traits.map((trait, index) => (
                          <div
                            key={index}
                            className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm"
                          >
                            {trait.type}: {trait.value}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Staking Tab Content */}
          <TabsContent value="staking">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockData.stakedAssets.map((asset, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="py-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-semibold text-lg">
                            {asset.protocol}
                          </div>
                          <div className="text-sm text-gray-500">
                            {asset.rewardToken} Rewards
                          </div>
                        </div>
                        <div className="text-green-500 font-semibold">
                          {asset.apy}% APY
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Staked Amount</span>
                          <span className="font-medium">
                            {formatCurrency(asset.amount)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Rewards Earned</span>
                          <span className="font-medium">
                            {formatCurrency(asset.rewards)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Lock Period</span>
                          <span className="font-medium">
                            {asset.lockPeriod} days
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Unlock Date</span>
                          <span className="font-medium">
                            {new Date(asset.unlockDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Transactions Tab Content */}
          <TabsContent value="transactions">
            <Card>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-200">
                  {mockData.transactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`p-2 rounded-full ${
                              tx.type === "send"
                                ? "bg-red-100 text-red-600"
                                : tx.type === "receive"
                                ? "bg-green-100 text-green-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {tx.type === "send" ? (
                              <ArrowUpRight />
                            ) : tx.type === "receive" ? (
                              <ArrowDownRight />
                            ) : (
                              <RefreshCcw />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {tx.type.charAt(0).toUpperCase() +
                                tx.type.slice(1)}{" "}
                              {tx.token}
                            </div>
                            <div className="text-sm text-gray-500">
                              {new Date(tx.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div
                              className={`font-medium ${
                                tx.type === "send"
                                  ? "text-red-600"
                                  : "text-green-600"
                              }`}
                            >
                              {tx.type === "send" ? "-" : "+"}
                              {formatNumber(tx.amount)} {tx.token}
                            </div>
                            <div className="text-sm text-gray-500">
                              Fee: {formatNumber(tx.fee)} ETH
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                window.open(
                                  `https://etherscan.io/tx/${tx.hash}`,
                                  "_blank"
                                )
                              }
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => copyToClipboard(tx.hash)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-500">
                        <div className="flex flex-wrap gap-x-4">
                          <span>From: {formatAddress(tx.from)}</span>
                          <span>To: {formatAddress(tx.to)}</span>
                          <span>Block: {tx.block}</span>
                          <span>Method: {tx.method}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
