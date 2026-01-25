export interface SocketAddress {
  address: string;
  port: number;
  family: "IPv4" | "IPv6";
}
