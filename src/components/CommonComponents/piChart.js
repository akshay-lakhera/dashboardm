import * as React from "react";
import { PieChart, pieArcClasses } from "@mui/x-charts/PieChart";
import { Grid } from "@mui/material";
let defaultData = [
  { id: 0, value: 10, label: "series A" },
  { id: 1, value: 15, label: "series B" },
  { id: 2, value: 20, label: "series C" }
];
const pieParams = { width: 1000 };
const data = [
  { value: 5, label: "A" },
  { value: 10, label: "B" },
  { value: 15, label: "C" },
  { value: 20, label: "D" }
];

const size = {
  width: "600",
  height: 200
};
export default function CustomPi({ data = defaultData }) {
  console.log(data, "<<<<thisisdata");
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} textAlign="center">
        <PieChart
          style={
            {
              // width: "100% !important"
            }
          }
          series={[
            {
              // arcLabel: (item) => `${item.label} (${item.value})`,
              // arcLabelMinAngle: 45,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30 },
              data
            }
          ]}
          sx={{
            [`& .${pieArcClasses.faded}`]: {
              fill: "gray"
            }
          }}
          {...size}
        />
      </Grid>
    </Grid>
  );
}
