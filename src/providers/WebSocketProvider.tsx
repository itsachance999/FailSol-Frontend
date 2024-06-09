import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { HistoryType } from "../components/widget1/mint-section/HistoryTable";

// Define the shape of the context value
interface WebSocketContextValue {
  messages: HistoryType[];
  status: "connected" | "disconnected";
  sendMessage: (message: string) => void;
}

// Create the WebSocket context with a default value of null
const WebSocketContext = createContext<WebSocketContextValue | null>(null);

interface WebSocketProviderProps {
  url: string;
  children: ReactNode;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  url,
  children,
}) => {
  const [messages, setMessages] = useState<HistoryType[]>([]);
  const [status, setStatus] = useState<"connected" | "disconnected">(
    "disconnected"
  );
  const ws = useRef<WebSocket | null>(null);

  const sendMessage = useCallback((message: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(message);
    }
  }, []);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      setStatus("connected");
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      console.log("Message received:", event.data);
      setMessages(() => JSON.parse(event.data));
    };

    ws.current.onclose = () => {
      setStatus("disconnected");
      console.log("WebSocket connection closed");
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  return (
    <WebSocketContext.Provider value={{ messages, status, sendMessage }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextValue => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
