import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { useWebSocket } from "../../../providers/WebSocketProvider";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.action.focus,
    color: theme.palette.common.black,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const AddressCell = styled("div")(({ theme }) => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  fontWeight: 100,
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100px", // Adjust this width as needed for small screens
  },
  [theme.breakpoints.up("sm")]: {
    maxWidth: "200px", // Adjust this width as needed for larger screens
  },
}));

export type HistoryType = {
  address: string;
  signature: string;
  timestamp: string;
};

export default function TxTable() {
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [fetchList, setFetchList] = useState<HistoryType[] | []>([
    { address: "", signature: "", timestamp: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const { messages } = useWebSocket();

  const fetchHistories = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/get_histories`,
        {
          params: { page, page_size: 15 },
        }
      );
      setFetchList(res.data);
      setHistories((prevHistories) => {
        const combinedHistories = [...prevHistories, ...res.data];
        const uniqueHistories = Array.from(
          new Map(
            combinedHistories.map((item) => [item.signature, item])
          ).values()
        );
        return uniqueHistories;
      });
    } catch (error) {
      console.error("Error fetching histories:", error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchHistories(page);
  }, [page, fetchHistories]);

  useEffect(() => {
    setHistories((prevHistories) => {
      const combinedHistories = [...messages, ...prevHistories];
      const uniqueHistories = Array.from(
        new Map(
          combinedHistories.map((item) => [item.signature, item])
        ).values()
      );
      return uniqueHistories;
    });
  }, [messages]);
  console.log("fetch===", fetchList.length);

  const handleScroll = (event: any) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (
      scrollHeight - scrollTop === clientHeight &&
      !loading &&
      fetchList.length !== 0
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ overflowX: "hidden", height: 800, overflowY: "scroll" }}
      onScroll={handleScroll}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width={50}>Signature</StyledTableCell>
            <StyledTableCell align="center">Address</StyledTableCell>
            <StyledTableCell align="right">Timestamp</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {histories.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell
                component="th"
                scope="row"
                sx={{ color: "#39A0FF" }}
              >
                <AddressCell>
                  <Typography
                    component={"a"}
                    href={`https://solscan.io/tx/${row.signature}`}
                    target="_blank"
                    noWrap
                  >
                    {row.signature}
                  </Typography>
                </AddressCell>
              </StyledTableCell>
              <StyledTableCell align="right">
                <AddressCell>{row.address}</AddressCell>
              </StyledTableCell>
              <StyledTableCell align="right" style={{ fontWeight: 100 }}>
                {formatDistanceToNow(new Date(row.timestamp), {
                  addSuffix: true,
                })}
              </StyledTableCell>
            </StyledTableRow>
          ))}
          {loading && (
            <StyledTableRow>
              <StyledTableCell colSpan={3} align="center">
                Loading...
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
