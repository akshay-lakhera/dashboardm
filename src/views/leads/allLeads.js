import React, { useEffect, useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { API_CALL } from "src/services/APICalls";
import { showDate } from "src/components/commonfunctions";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  NativeSelect,
  Select,
  Typography
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionModal from "./DescriptionModal";
import { toast } from "react-toastify";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import { MyTheme } from "src/layouts/customTheme";
function AllLeads() {
  //   let ActionButton = <Button variant="contained">Add</Button>;
  const [tableData, setTableData] = useState([]);
  const [loader, setLoader] = useState(false);
  const reloadPage = () => setLoader(!loader);
  // const [status, setStatus] = useState({});
  const [filter, setFilter] = useState({ platform: "All", search: "" });

  useEffect(() => {
    (async () => {
      try {
        console.log(filter);
        let { data } = await API_CALL.lead.get(filter);
        console.log(data);
        setTableData(data.data);
      } catch (error) {
        toast.error(error.response.data.message);
        setTableData([]);
      }
    })();
  }, [loader, filter]);

  return (
    <PageContainer title="Sky Dogs Leads" description="">
      <DashboardCard title="Leads">
        <Grid container justifyContent="space-between">
          <Grid item xs={12} md={3} textAlign="left">
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center"
              }}
            >
              <input
                className="searchInput"
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
              />
              <SearchIcon
                style={{ position: "absolute", right: 10 }}
                fontSize="large"
              />
            </div>
          </Grid>
          <Grid item xs={6} md={2} textAlign="right">
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter.platform}
                // label="Status"
                onChange={(e) => {
                  setFilter({ ...filter, platform: e.target.value });
                }}
              >
                {[
                  "All",
                  "Whatsapp",
                  "Discord",
                  "Email",
                  "Telegram",
                  "Linkedin",
                  "Skype"
                ].map((item, key) => {
                  return (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {tableData?.length == 0 ? (
          <Typography color="red" textAlign="center" fontSize={20}>
            No Data Found
          </Typography>
        ) : (
          <BasicTable rows={tableData} reloadPage={reloadPage} />
        )}
      </DashboardCard>
    </PageContainer>
  );
}

const BasicTable = ({ rows, reloadPage }) => {
  // const [s, sets] = useState(second)
  const [open, setOpen] = React.useState({
    open: false,
    content: ""
  });

  const title = {
    fontWeight: "bold",
    fontSize: "17px"
  };

  return (
    <TableContainer sx={{ maxHeight: "70vh" }}>
      <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table">
        <DescriptionModal open={open} setOpen={setOpen} />

        <TableHead>
          <TableRow>
            <TableCell style={title}>Sr No</TableCell>

            <TableCell style={title} align="left ">
              Name
            </TableCell>

            <TableCell style={title} align="left">
              Platfom
            </TableCell>
            <TableCell style={title} align="left">
              Contact
            </TableCell>

            <TableCell style={title} align="center">
              Date
            </TableCell>
            {/* <TableCell style={title} align="center">
              Status
            </TableCell> */}
            <TableCell style={title} align="right">
              Action
            </TableCell>
            {/* <TableCell align="center">Protein&nbsp;(g)</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((item, key) => {
            return (
              <SingleRow2
                row={item}
                key={item?._id}
                setOpen={setOpen}
                reloadPage={reloadPage}
                index={key}
              />
            );
          })}
          {/* {rows.map((row, index) => (
          <TableRow
            style={{
              fontSize: "18px",
              background: index % 2 == 0 ? "#e8e8e8" : "white"
            }}
            key={row._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              <Box textAlign="left" mb={1}>
                {row.fullName}
              </Box>
              <Chip label={row?.companyName} color="info" variant="outlined" />
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              {row?.telegram}
            </TableCell>
            <TableCell align="left" style={{ fontSize: "16px" }}>
              <Box mb={1}>{row.email}</Box>
              <Chip label={row?.phone} color="info" variant="outlined" />
            </TableCell>
            <TableCell align="center" style={{ fontSize: "16px" }}>
              {showDate(row.createdAt)}
            </TableCell>
            <TableCell align="center" style={{ fontSize: "16px" }}>
              <FormControl fullWidth>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={row?.status}
                  // label="Status"
                  onChange={updateStatus}
                >
                  {[
                    "Won",
                    "In-Negotiation",
                    "Followed-up",
                    "Responded",
                    "New Enquiry",
                    "Lost",
                    "Scam",
                    "Spam"
                  ].map((item, key) => {
                    return (
                      <MenuItem key={item} value={item}>
                        {item}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </TableCell>

            <TableCell align="center" style={{ fontSize: "16px" }}>
              <Chip
                label=" View"
                style={{
                  color: "white",

                  background: "#1ea1f2"
                }}
                onClick={() => {
                  setOpen({
                    open: true,
                    content: row
                  });
                }}
              />
            </TableCell>
          </TableRow>
        ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const SingleRow = ({ setOpen, reloadPage, index, row }) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateStatus = async (e) => {
    try {
      setIsLoading(true);
      const status = e.target.value;
      const { data } = await API_CALL.sunscription.update({
        status,
        id: row?._id
      });
      if (data.success) {
        toast.success(data.message);
        reloadPage();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
  return (
    <TableRow
      style={{
        fontSize: "18px",
        background: index % 2 == 0 ? "#e8e8e8" : "white"
      }}
      key={row._id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell align="left" style={{ fontSize: "16px" }}>
        <Box textAlign="left" mb={1}>
          {row.fullName}
        </Box>
        {/* <Chip label={row?.companyName} color="info" variant="outlined" /> */}
      </TableCell>
      <TableCell align="left" style={{ fontSize: "16px" }}>
        {row?.telegram}
      </TableCell>
      <TableCell align="left" style={{ fontSize: "16px" }}>
        <Box mb={1}>{row.email}</Box>
        {/* <Chip label={row?.phone} color="info" variant="outlined" /> */}
      </TableCell>
      <TableCell align="center" style={{ fontSize: "16px" }}>
        {showDate(row.createdAt)}
      </TableCell>
      <TableCell align="center" style={{ fontSize: "16px" }}>
        {isLoading ? (
          <CustomLoader />
        ) : (
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={row?.status}
              style={{
                borderColor:
                  row?.status == "New Enquiry"
                    ? "green"
                    : row?.status == "Scam" ||
                      row?.status == "Spam" ||
                      row?.status == "Lost"
                    ? "red"
                    : row?.status == "Won"
                    ? "success"
                    : MyTheme.bgColor1,
                color:
                  row?.status == "New Enquiry"
                    ? "green"
                    : row?.status == "Scam" ||
                      row?.status == "Spam" ||
                      row?.status == "Lost"
                    ? "red"
                    : row?.status == "Won"
                    ? "success"
                    : MyTheme.bgColor1
              }}
              // label="Status"
              onChange={updateStatus}
            >
              {[
                "Won",
                "In-Negotiation",
                "Followed-up",
                "Responded",
                "New Enquiry",
                "Lost",
                "Scam",
                "Spam"
              ].map((item, key) => {
                return (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}
      </TableCell>

      <TableCell align="center" style={{ fontSize: "16px" }}>
        <Chip
          label=" View"
          style={{
            color: "white",

            background: "#1ea1f2"
          }}
          onClick={() => {
            setOpen({
              open: true,
              content: row
            });
          }}
        />
      </TableCell>
    </TableRow>
  );
};
const SingleRow2 = ({ setOpen, reloadPage, index, row }) => {
  const [isLoading, setIsLoading] = useState(false);
  const updateStatus = async (e) => {
    try {
      setIsLoading(true);
      const status = e.target.value;
      const { data } = await API_CALL.sunscription.update({
        status,
        id: row?._id
      });
      if (data.success) {
        toast.success(data.message);
        reloadPage();
        setIsLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  const DeleteEnquiry = async () => {
    try {
      let confirm = window.confirm("Are  you sure you want to delete it");
      if (!confirm) return null;
      const { data } = await API_CALL.lead.delete({ id: row._id });
      if (data.success) {
        toast.success(data.message);
        reloadPage();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <TableRow
      hover
      role="checkbox"
      tabIndex={-1}
      key={row.code}
      // style={{ borderBottom: "1px solid gray" }}
    >
      <TableCell className="tablebox">{index + 1}</TableCell>
      <TableCell className="tablebox">{row?.fullName}</TableCell>
      <TableCell className="tablebox">{row?.platform}</TableCell>
      <TableCell className="tablebox">{row?.contact}</TableCell>
      <TableCell className="tablebox" align="right">
        {showDate(row?.createdAt)}
      </TableCell>

      <TableCell className="tablebox" align="right">
        <Button
          variant="outlined"
          onClick={() =>
            setOpen({
              open: true,
              content: row
            })
          }
        >
          View
        </Button>
      </TableCell>
      <TableCell className="tablebox">
        <DeleteIcon onClick={DeleteEnquiry} />
      </TableCell>
    </TableRow>
  );
};
export default AllLeads;
