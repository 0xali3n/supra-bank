import React, { useState } from "react";
import {
  Layout,
  Menu,
  Input,
  Button,
  Typography,
  theme,
  Row,
  Col,
  Card,
  Statistic,
} from "antd";
import {
  WalletOutlined,
  PictureOutlined,
  BarsOutlined,
  HistoryOutlined,
  SearchOutlined,
  LoadingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import PortfolioContent from "./pages/LandingPage";
import { mockData } from "./data/data";

const { Header, Content } = Layout;
const { Title } = Typography;
const { Search } = Input;

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [isLoading, setIsLoading] = useState(false);
  const { token } = theme.useToken();

  const customTheme = {
    colorPrimary: "#1890ff",
    colorSecondary: "#722ed1",
    colorSuccess: "#52c41a",
    colorError: "#f5222d",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
  };

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const menuItems = [
    {
      key: "portfolio",
      icon: <WalletOutlined />,
      label: "Portfolio",
    },
    {
      key: "nfts",
      icon: <PictureOutlined />,
      label: "NFTs",
    },
    {
      key: "staking",
      icon: <BarsOutlined />,
      label: "Staking",
    },
    {
      key: "transactions",
      icon: <HistoryOutlined />,
      label: "Transactions",
    },
  ];

  return (
    <Layout className="min-h-screen" style={{ background: "#f0f2f5" }}>
      <Header
        style={{
          background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
          padding: "0 24px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex justify-between items-center h-full">
          <div className="flex items-center">
            <Title level={3} style={{ margin: 0, color: "white" }}>
              Supra Bank Enterprise
            </Title>
          </div>
          <div className="flex gap-4">
            <Search
              placeholder="Enter wallet address"
              loading={isLoading}
              enterButton={
                <Button type="primary" icon={<SearchOutlined />}>
                  Search
                </Button>
              }
              onSearch={handleSearch}
              style={{ width: 400 }}
            />
          </div>
        </div>
      </Header>

      <Content
        style={{
          padding: "24px",
          maxWidth: 1400,
          margin: "0 auto",
          width: "100%",
        }}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Card
              style={{
                background: "linear-gradient(135deg, #1890ff 0%, #722ed1 100%)",
                borderRadius: customTheme.borderRadius,
                boxShadow: customTheme.boxShadow,
              }}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <Statistic
                    title={
                      <span style={{ color: "white", fontSize: "18px" }}>
                        Total Portfolio Value
                      </span>
                    }
                    value={mockData.totalBalance}
                    precision={2}
                    prefix="$"
                    valueStyle={{ color: "white", fontSize: "36px" }}
                  />
                </Col>
                <Col span={12}>
                  <Statistic
                    title={
                      <span style={{ color: "white", fontSize: "18px" }}>
                        24h Change
                      </span>
                    }
                    value={mockData.totalBalanceChange24h}
                    precision={2}
                    prefix={
                      mockData.totalBalanceChange24h >= 0 ? (
                        <ArrowUpOutlined />
                      ) : (
                        <ArrowDownOutlined />
                      )
                    }
                    suffix="%"
                    valueStyle={{
                      color:
                        mockData.totalBalanceChange24h >= 0
                          ? "#52c41a"
                          : "#f5222d",
                      fontSize: "36px",
                    }}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>

        <Card
          style={{
            marginTop: "24px",
            borderRadius: customTheme.borderRadius,
            boxShadow: customTheme.boxShadow,
          }}
        >
          <Menu
            selectedKeys={[activeTab]}
            mode="horizontal"
            items={menuItems}
            onSelect={({ key }) => setActiveTab(key.toString())}
            style={{
              marginBottom: "24px",
              borderBottom: "2px solid #f0f2f5",
            }}
          />

          <PortfolioContent
            activeTab={activeTab}
            data={mockData}
            theme={customTheme}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default App;
