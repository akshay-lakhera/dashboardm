import React, { useState } from "react";
import Papa from "papaparse";
import { MyIcons } from "../MyIcons";
import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";
import { API_CALL } from "src/services/APICalls";
import { MyTheme } from "src/layouts/customTheme";
// Allowed extensions for input file
const allowedExtensions = ["csv"];

const CsvFileReader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [showLoader, setshowLoader] = useState(false)
  const [file, setFile] = useState("");
  const handleFileChange = (e) => {
    // Check if user has entered the file
    if (e.target.files.length) {
      const inputFile = e.target.files[0];
      const fileExtension = inputFile?.type.split("/")[1];
      console.log(fileExtension, "<<<thisis fileext");
      if (!allowedExtensions.includes(fileExtension)) {
        toast.error("Please upload CSV File");
        return;
      }
      setFile(inputFile);
    }
  };


  const handleParse = async () => {
    if (!file) return toast.error("Select a valid CSV file");
    const reader = new FileReader();
    reader.onload = async ({ target }) => {
      const csv = Papa.parse(target.result, { header: true });
      const parsedData = csv?.data;
      manageDaata(parsedData);
    };
    const CSV = await reader.readAsText(file);
    console.log(CSV, "<<<<csv data");
  };

  const manageDaata = async (csvDAta) => {
    const firstData = csvDAta[0];

    const payload =csvDAta.map(item=>{
    return ({
       title: item.title,
      image: item.image,
      attributes: JSON.parse(item.attributes),
      rating: item.rating,
      nilValue: item.nilValue
    })
    })
   
    try {
      setshowLoader(true)

      const { data } = await API_CALL.collection.createCSV({nfts:payload});
      
      console.log(data, "<<<<thisisdata");
      if(data.success){
        toast.success(data.message)
      }else{
        setshowLoader(false)
        
      }
    } catch (error) {
        setshowLoader(false)
      // console.log(error.response.data.message)
      if(error.response.data.error){
        toast.error(error.response.data.error.message)

      }else{

        toast.error(error.response.data.message)
      }
    }
    //   payload.append("title", formData?.title);
    //   payload.append("nilValue", formData?.nilValue);
    //   payload.append("attributes", JSON.stringify(formData?.attributes));
    //   payload.append("rating", formData.rating);
    //   payload.append("image", formData?.image, formData?.image.name);
  };

  return (
    <div className="">
      <Grid container rowGap={2}>
        <Grid item xs={12}>
          <div className="upload-csv-cover">
            <input
              type="file"
              onChange={handleFileChange}
              style={{
                width: "100%",
                position: "absolute",
                height: "100%",
                opacity: 0
              }}
            />
            <MyIcons.CloudUploadIcon fontSize="large" style={{fontSize:"6rem",color:"black"}} />
          </div>
        </Grid>
        <Grid item xs={12} textAlign="center">
          <Button variant="contained" onClick={handleParse} style={{background:MyTheme.bgColor1}}>
            Upload
          </Button>
        </Grid>
      </Grid>

      {/* <input
				onChange={handleFileChange}
				id="csvInput"
				name="file"
				type="File"
			/>
			<div>
				<button onClick={handleParse}>Parse</button>
			</div>
			<div style={{ marginTop: "3rem" }}>
				{error ? error : data.map((col,
					idx) => <div key={idx}>{col}</div>)}
			</div> */}
    </div>
  );
};

export default CsvFileReader;
