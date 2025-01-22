//Landingpage.tsx

import React, { useState } from "react";
import {
  Card,
  Statistic,
  Row,
  Col,
  Typography,
  Table,
  Tag,
  Space,
  Avatar,
  Descriptions,
  Button,
  Dropdown,
  Input,
  Select,
  Menu,
  Progress,
} from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  LinkOutlined,
  CopyOutlined,
  FilterOutlined,
  SortAscendingOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Token, NFT, StakedAsset, Transaction } from "../data/data";

const { Title, Text } = Typography;
const { Search } = Input;

interface PortfolioContentProps {
  activeTab: string;
  data: any;
  theme: any;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
};

const PortfolioContent: React.FC<PortfolioContentProps> = ({
  activeTab,
  data,
  theme,
}) => {
  const [searchText, setSearchText] = useState("");
  const [sortedInfo, setSortedInfo] = useState<any>({});
  const [filteredInfo, setFilteredInfo] = useState<any>({});

  const handleChange = (pagination: any, filters: any, sorter: any) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearAll = () => {
    setSortedInfo({});
    setFilteredInfo({});
    setSearchText("");
  };

  const renderPortfolioOverview = () => {
    const tokenColumns = [
      {
        title: "Asset",
        key: "asset",
        fixed: "left",
        render: (token: Token) => (
          <Space>
            <Avatar src={token.icon} size="small" />
            <div>
              <Text strong>{token.symbol}</Text>
              <div>
                <Text type="secondary">{token.name}</Text>
              </div>
            </div>
          </Space>
        ),
        filterable: true,
        sorter: (a: Token, b: Token) => a.symbol.localeCompare(b.symbol),
      },
      {
        title: "Balance",
        dataIndex: "balance",
        key: "balance",
        render: (balance: number, token: Token) => (
          <div>
            <div>
              {balance.toFixed(4)} {token.symbol}
            </div>
            <Text type="secondary">
              {formatCurrency(balance * token.price)}
            </Text>
          </div>
        ),
        sorter: (a: Token, b: Token) => a.balance - b.balance,
      },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price: number) => <Text strong>{formatCurrency(price)}</Text>,
        sorter: (a: Token, b: Token) => a.price - b.price,
      },
      {
        title: "24h Change",
        dataIndex: "change24h",
        key: "change24h",
        render: (change: number) => (
          <Text type={change >= 0 ? "success" : "danger"} strong>
            {change >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            {Math.abs(change)}%
          </Text>
        ),
        sorter: (a: Token, b: Token) => a.change24h - b.change24h,
        filters: [
          { text: "Positive", value: "positive" },
          { text: "Negative", value: "negative" },
        ],
        onFilter: (value: string, record: Token) =>
          value === "positive" ? record.change24h >= 0 : record.change24h < 0,
      },
      {
        title: "Volume (24h)",
        dataIndex: "volume24h",
        key: "volume24h",
        render: (volume: number) => formatCurrency(volume),
        sorter: (a: Token, b: Token) => a.volume24h - b.volume24h,
      },
    ];

    return (
      <div className="space-y-6">
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search assets"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button onClick={clearAll} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </Space>

        <Table
          columns={tokenColumns}
          dataSource={data.tokens.filter(
            (token: Token) =>
              token.name.toLowerCase().includes(searchText.toLowerCase()) ||
              token.symbol.toLowerCase().includes(searchText.toLowerCase())
          )}
          rowKey="symbol"
          onChange={handleChange}
          pagination={false}
          scroll={{ x: 1000 }}
          style={{
            background: "white",
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
          }}
        />
      </div>
    );
  };

  const renderNFTs = () => {
    return (
      <>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search NFTs"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Select
            placeholder="Filter by Collection"
            style={{ width: 200 }}
            allowClear
            options={[
              ...new Set(data.nfts.map((nft: NFT) => nft.collection)),
            ].map((collection) => ({
              label: collection,
              value: collection,
            }))}
          />
          <Button onClick={clearAll} icon={<ReloadOutlined />}>
            Reset
          </Button>
        </Space>

        <Row gutter={[24, 24]}>
          {data.nfts
            .filter(
              (nft: NFT) =>
                nft.name.toLowerCase().includes(searchText.toLowerCase()) ||
                nft.collection.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((nft: NFT) => (
              <Col key={nft.id} xs={24} sm={12} lg={8}>
                <Card
                  hoverable
                  cover={
                    <div style={{ position: "relative" }}>
                      <img
                        alt={nft.name}
                        src={nft.image}
                        style={{
                          height: 200,
                          objectFit: "cover",
                          borderTopLeftRadius: theme.borderRadius,
                          borderTopRightRadius: theme.borderRadius,
                        }}
                      />
                      <Tag
                        color="blue"
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                          padding: "4px 8px",
                        }}
                      >
                        Rank #{nft.rank}
                      </Tag>
                    </div>
                  }
                  style={{
                    borderRadius: theme.borderRadius,
                    boxShadow: theme.boxShadow,
                  }}
                >
                  <Card.Meta title={nft.name} description={nft.collection} />
                  <div style={{ marginTop: 16 }}>
                    <Progress
                      percent={nft.rarity}
                      status="active"
                      strokeColor={{
                        "0%": theme.colorPrimary,
                        "100%": theme.colorSecondary,
                      }}
                    />
                  </div>
                  <Descriptions column={2} className="mt-4">
                    <Descriptions.Item label="Floor Price">
                      <Text strong>{formatCurrency(nft.floorPrice)}</Text>
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Price">
                      <Text strong>{formatCurrency(nft.lastPrice)}</Text>
                    </Descriptions.Item>
                  </Descriptions>
                  <div className="mt-4">
                    {nft.traits.map((trait, index) => (
                      <Tag
                        key={index}
                        color="processing"
                        style={{ margin: "4px" }}
                      >
                        {trait.type}: {trait.value}
                      </Tag>
                    ))}
                  </div>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  };

  {
    /* Continuing from previous code... */
  }

  const renderStaking = () => {
    const stakingColumns = [
      {
        title: "Protocol",
        dataIndex: "protocol",
        key: "protocol",
        sorter: (a: StakedAsset, b: StakedAsset) =>
          a.protocol.localeCompare(b.protocol),
      },
      {
        title: "Staked Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number) => (
          <Text strong>{formatCurrency(amount)}</Text>
        ),
        sorter: (a: StakedAsset, b: StakedAsset) => a.amount - b.amount,
      },
      {
        title: "APY",
        dataIndex: "apy",
        key: "apy",
        render: (apy: number) => (
          <Tag color="success" style={{ padding: "4px 8px" }}>
            {apy}% APY
          </Tag>
        ),
        sorter: (a: StakedAsset, b: StakedAsset) => a.apy - b.apy,
        filters: [
          { text: "High APY (>20%)", value: "high" },
          { text: "Medium APY (10-20%)", value: "medium" },
          { text: "Low APY (<10%)", value: "low" },
        ],
        onFilter: (value: string, record: StakedAsset) => {
          switch (value) {
            case "high":
              return record.apy > 20;
            case "medium":
              return record.apy >= 10 && record.apy <= 20;
            case "low":
              return record.apy < 10;
            default:
              return true;
          }
        },
      },
      {
        title: "Rewards",
        dataIndex: "rewards",
        key: "rewards",
        render: (rewards: number) => formatCurrency(rewards),
        sorter: (a: StakedAsset, b: StakedAsset) => a.rewards - b.rewards,
      },
      {
        title: "Lock Period",
        dataIndex: "lockPeriod",
        key: "lockPeriod",
        render: (period: number) => `${period} days`,
        sorter: (a: StakedAsset, b: StakedAsset) => a.lockPeriod - b.lockPeriod,
      },
      {
        title: "Unlock Date",
        dataIndex: "unlockDate",
        key: "unlockDate",
        render: (date: Date) => new Date(date).toLocaleDateString(),
        sorter: (a: StakedAsset, b: StakedAsset) =>
          new Date(a.unlockDate).getTime() - new Date(b.unlockDate).getTime(),
      },
    ];

    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search protocols"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button onClick={clearAll} icon={<ReloadOutlined />}>
            Reset Filters
          </Button>
        </Space>
        <Table
          columns={stakingColumns}
          dataSource={data.stakedAssets}
          onChange={handleChange}
          rowKey="protocol"
          style={{
            background: "white",
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
          }}
        />
      </div>
    );
  };

  const renderTransactions = () => {
    const transactionColumns = [
      {
        title: "Type",
        dataIndex: "type",
        key: "type",
        render: (type: string) => (
          <Tag color={type === "send" ? "error" : "success"}>
            {type.toUpperCase()}
          </Tag>
        ),
        filters: [
          { text: "Send", value: "send" },
          { text: "Receive", value: "receive" },
          { text: "Swap", value: "swap" },
        ],
        onFilter: (value: string, record: Transaction) => record.type === value,
      },
      {
        title: "Amount",
        dataIndex: "amount",
        key: "amount",
        render: (amount: number, record: Transaction) => (
          <Text
            strong
            className={
              record.type === "send" ? "text-red-500" : "text-green-500"
            }
          >
            {record.type === "send" ? "-" : "+"}
            {amount} {record.token}
          </Text>
        ),
        sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
      },
      {
        title: "Value",
        dataIndex: "amount",
        key: "value",
        render: (amount: number) => formatCurrency(amount * 2), // Mock price calculation
        sorter: (a: Transaction, b: Transaction) => a.amount - b.amount,
      },
      {
        title: "Date",
        dataIndex: "timestamp",
        key: "timestamp",
        render: (date: Date) => new Date(date).toLocaleString(),
        sorter: (a: Transaction, b: Transaction) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <Tag
            color={
              status === "completed"
                ? "success"
                : status === "pending"
                ? "processing"
                : "error"
            }
          >
            {status.toUpperCase()}
          </Tag>
        ),
        filters: [
          { text: "Completed", value: "completed" },
          { text: "Pending", value: "pending" },
          { text: "Failed", value: "failed" },
        ],
        onFilter: (value: string, record: Transaction) =>
          record.status === value,
      },
      {
        title: "Actions",
        key: "actions",
        render: (record: Transaction) => (
          <Space>
            <Button
              type="link"
              icon={<LinkOutlined />}
              onClick={() =>
                window.open(`https://etherscan.io/tx/${record.hash}`, "_blank")
              }
            />
            <Button
              type="link"
              icon={<CopyOutlined />}
              onClick={() => navigator.clipboard.writeText(record.hash)}
            />
          </Space>
        ),
      },
    ];

    return (
      <div>
        <Space style={{ marginBottom: 16 }}>
          <Search
            placeholder="Search transactions"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ width: 200 }}
          />
          <Button onClick={clearAll} icon={<ReloadOutlined />}>
            Reset Filters
          </Button>
        </Space>
        <Table
          columns={transactionColumns}
          dataSource={data.transactions}
          onChange={handleChange}
          rowKey="id"
          style={{
            background: "white",
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
          }}
        />
      </div>
    );
  };

  const contentMap = {
    portfolio: renderPortfolioOverview,
    nfts: renderNFTs,
    staking: renderStaking,
    transactions: renderTransactions,
  };

  return contentMap[activeTab as keyof typeof contentMap]();
};

export default PortfolioContent;
