import React, { useState, useCallback } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/pure/Tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/pure/Card";
import { Badge } from "@/components/pure/Badge";
import { Network, MapPin, Route, BarChart3 } from "lucide-react";

const Index = () => {
  const [hubs, setHubs] = useState([
    {
      id: "A",
      name: "Central Hub",
      connectedHubs: ["B", "C"],
      position: { x: 400, y: 200 },
    },
    {
      id: "B",
      name: "North Station",
      connectedHubs: ["A", "D"],
      position: { x: 200, y: 100 },
    },
    {
      id: "C",
      name: "South Station",
      connectedHubs: ["A", "D"],
      position: { x: 600, y: 100 },
    },
    {
      id: "D",
      name: "East Terminal",
      connectedHubs: ["B", "C"],
      position: { x: 400, y: 50 },
    },
  ]);

  const [highlightedPath, setHighlightedPath] = useState([]);

  const handleAddHub = useCallback((newHub) => {
    setHubs((prev) => [...prev, { ...newHub, connectedHubs: [] }]);
  }, []);

  const handleConnectHubs = useCallback((hubId1, hubId2) => {
    setHubs((prev) =>
      prev.map((hub) => {
        if (hub.id === hubId1) {
          return { ...hub, connectedHubs: [...hub.connectedHubs, hubId2] };
        }
        if (hub.id === hubId2) {
          return { ...hub, connectedHubs: [...hub.connectedHubs, hubId1] };
        }
        return hub;
      })
    );
  }, []);

  const handlePathFound = useCallback((path) => {
    setHighlightedPath(path);
  }, []);

  const getNetworkStats = () => {
    const totalHubs = hubs.length;
    const totalConnections =
      hubs.reduce((sum, hub) => sum + hub.connectedHubs.length, 0) / 2;
    const avgConnections =
      totalHubs > 0 ? (totalConnections / totalHubs).toFixed(1) : "0";

    return { totalHubs, totalConnections, avgConnections };
  };

  const stats = getNetworkStats();

  return (
    <div className="min-h-screen bg-network-bg">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-hub-primary to-hub-secondary text-white">
                <Network className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-hub-primary">
                  Smart Route Finder
                </h1>
                <p className="text-sm text-muted-foreground">
                  Network Visualizer & Pathfinding System
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <div className="text-lg font-bold text-hub-primary">
                  {stats.totalHubs}
                </div>
                <div className="text-xs text-muted-foreground">Hubs</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-hub-secondary">
                  {stats.totalConnections}
                </div>
                <div className="text-xs text-muted-foreground">Connections</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-hub-accent">
                  {stats.avgConnections}
                </div>
                <div className="text-xs text-muted-foreground">Avg/Hub</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <Tabs defaultValue="network" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white">
            <TabsTrigger value="network" className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              Network View
            </TabsTrigger>
            <TabsTrigger value="management" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Hub Management
            </TabsTrigger>
            <TabsTrigger
              value="pathfinding"
              className="flex items-center gap-2"
            >
              <Route className="h-4 w-4" />
              Path Finder
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-6">
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Network className="h-5 w-5" />
                    Network Visualization
                  </span>
                  {highlightedPath.length > 0 && (
                    <Badge
                      variant="outline"
                      className="bg-path-highlight/10 text-path-highlight border-path-highlight"
                    >
                      Showing path: {highlightedPath.join(" → ")}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[500px] p-0">
                NetworkVisualization
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="management">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">HubManagement</div>
              <div className="lg:col-span-1">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle className="text-sm">Live Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="h-[500px] p-0">
                    NetworkVisualization
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pathfinding">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">PathFinder</div>
              <div className="lg:col-span-2">
                <Card className="h-[600px]">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Route className="h-5 w-5" />
                        Path Visualization
                      </span>
                      {highlightedPath.length > 0 && (
                        <Badge
                          variant="default"
                          className="bg-path-highlight text-white"
                        >
                          {highlightedPath.length - 1} hops
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="h-[500px] p-0">
                    NetworkVisualization
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-hub-primary/10">
                      <Network className="h-6 w-6 text-hub-primary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-hub-primary">
                        {stats.totalHubs}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Hubs
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-hub-secondary/10">
                      <Route className="h-6 w-6 text-hub-secondary" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-hub-secondary">
                        {stats.totalConnections}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Total Connections
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-hub-accent/10">
                      <BarChart3 className="h-6 w-6 text-hub-accent" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-hub-accent">
                        {stats.avgConnections}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Avg Connections
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-green-100">
                      <MapPin className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-2xl font-bold text-green-600">
                        {hubs.length > 0 ? "✓" : "○"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Network Status
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Hub Connection Details</CardTitle>
              </CardHeader>
              <CardContent>
                {hubs.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No hubs available. Add some hubs to see detailed analytics.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {hubs.map((hub) => (
                      <div
                        key={hub.id}
                        className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                      >
                        <div>
                          <h4 className="font-medium">{hub.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            ID: {hub.id}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="outline">
                            {hub.connectedHubs.length} connections
                          </Badge>
                          <div className="text-xs text-muted-foreground mt-1">
                            {hub.connectedHubs.length === 0
                              ? "Isolated"
                              : hub.connectedHubs.length === 1
                              ? "Endpoint"
                              : "Hub"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
