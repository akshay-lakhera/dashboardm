import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomPi from "src/components/CommonComponents/piChart";
import { API_CALL } from "src/services/APICalls";

function SessionCharts() {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await API_CALL.session.group();
      console.log(data, "<<<<data");
      setChartData(
        data.data.map((item) => {
          return {
            id: item._id,
            value: item.count,
            label: `${item._id} ${item.count}`
          };
        })
      );
    })();
  }, []);

  return (
    <div>
      {chartData?.length > 0 ? (
        <CustomPi data={chartData} />
      ) : (
        <Typography color="red" textAlign="center" fontSize={20}>
          No Data Found
        </Typography>
      )}
    </div>
  );
}

export default SessionCharts;
