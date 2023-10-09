import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from "@mui/material";
import { API_CALL } from "src/services/APICalls";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import { MyTheme } from "src/layouts/customTheme";
import { useNavigate } from "react-router";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4
};

let initialState = {
  title: "",
  image: null,
  rating: 3,

  attributes: []
};
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1
});
function AddGallery({ handleOpen, reloadIt, open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const [attributesArray, setattributesArray] = useState([]);
  const [allCategory, setallCategory] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    getCategoryData();

    // console.log("called")
  }, []);

  const getCategoryData = async () => {
    try {
      const { data } = await API_CALL.SubCategory.getGroupedCategory({});
      console.log(data, "<<<<thisi data");
      if (data.success) {
        setallCategory(data.data);
        const manageAtt = data.data.map((item) => {
          return {
            category: item._id[0]._id,
            SubCategory: item.data.map((sub) => ({ ...sub, selected: false }))
          };
        });
        setFormData({ ...formData, attributes: manageAtt });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(formData, "<<<this is formdat");

  const handleSubmit = async () => {
    try {
      console.log(formData);
      // return null
      setshowLoader(true);
      console.log();
      let payload = new FormData();
      payload.append("title", formData?.title);
      payload.append("nilValue", formData?.nilValue);
      payload.append("attributes", JSON.stringify(attributesArray));
      payload.append("rating", formData.rating);
      payload.append("image", formData?.image, formData?.image.name);

      const { data } = await API_CALL.collection.create(payload);
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        setFormData(initialState);
        navigate("/collection-management");
        // reloadIt();
      } else {
        setshowLoader(false);
        toast.error(data.message);
      }
      console.log(data, "<<thisis data");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setshowLoader(false);
    }
  };

  const selectCategory = (category, subcategory, value) => {
    // console.log(category,subcategory)
    
  console.log(attributesArray, "<<<<<attri");
    

    const checkCat = attributesArray.filter(
      (item) => item.category == category
    );
    if (checkCat.length) {
     setattributesArray(attributesArray.map(it=>{
      if(it.category !=category) return it
      else  {
    if(it.SubCategory.includes(subcategory)){
return ({
        category,SubCategory:it.SubCategory.filter(sub=>sub!=subcategory)
      })
    }else{

      return ({
        category,SubCategory:[...it.SubCategory,subcategory]
      })
    }

      } 
     }))
    } else {
      setattributesArray([
        ...attributesArray,
        { category, SubCategory: [subcategory] }
      ]);
    }
  };
  console.log(attributesArray, "<<<<<attri");
const checkColor=(category,subcategory)=>{
let checkCat=attributesArray.filter(item=>item.category==category)
if( !checkCat.length) return false
else {
  let selectedCat= (attributesArray.filter(item=>item.category==category))[0]
  if(selectedCat.SubCategory.includes(subcategory)) return true 
  else return false
}
}

  return (
    <PageContainer title="Sky Dog Gallery Management" description="">
      <DashboardCard title="Add Item">
        <Grid
          container
          rowSpacing={2}
          justifyContent="center"
          columnSpacing={3}
        >
          <Grid item xs={12} md={3} textAlign="center">
            {formData?.image == null ? (
              <div
                style={{
                  border: "1px solid gray",
                  height: "15rem",
                  borderRadius: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload file
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                </Button>
              </div>
            ) : (
              <div>
                <img
                  src={URL.createObjectURL(formData?.image)}
                  style={{ width: "16rem", objectFit: "contain" }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Change Image
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.files[0] })
                    }
                  />
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={12} md={9}>
            <Grid container justifyContent="center" rowGap={2}>
              <Grid item xs={12}>
                <Typography>Enter NFt Name</Typography>
                <TextField
                  fullWidth
                  name="title"
                  onChange={handleChange}
                  value={formData?.title}
                  type="string"
                  placeholder="Enter Full Name"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Enter Hash Value </Typography>
                <TextField
                  fullWidth
                  name="nilValue"
                  onChange={handleChange}
                  value={formData?.nilValue}
                  type="string"
                  placeholder="Enter #"
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Enter Rating </Typography>
                <TextField
                  fullWidth
                  name="rating"
                  onChange={handleChange}
                  value={formData?.rating}
                  type="number"
                  placeholder="Enter Rating"
                />
              </Grid>
              {allCategory?.map((item) => {
                // console.log(item._id, "<<<<this is id");
                const showSubCategories = formData?.attributes.filter((it) => {
                  return it.category == item._id[0]._id;
                });
                // console.log(showSubCategories, "<<<showthissubs");
                return item?.data[0]?.parentCategoryData?.length ? (
                  <Grid container key={item._id}>
                    <Typography
                      width="100%"
                      color="white"
                      borderRadius={5}
                      padding={2}
                      bgcolor="#111111"
                    >
                      {item?.data[0]?.parentCategoryData[0]?.name}
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      mt={1}
                      display="flex"
                      flexWrap="wrap"
                      columnGap={1}
                    >
                      {showSubCategories[0]?.SubCategory?.map((sub) => {
                        // console.log(sub, "<<<<Thisub");
                        // return <ShowChip onClick={()=>selectCategory(item._id,sub._id,sub.selected)}  data={sub}  />
                        return (
                          <Chip
                            key={sub._id}
                            onClick={() =>
                              selectCategory(
                                item._id[0]._id,
                                sub._id,
                                sub.selected
                              )
                            }
                            label={sub.name}
                            style={{
                              cursor: "pointer",
                              background: checkColor(item._id[0]._id,sub._id) && MyTheme.bgColor1
                            }}
                          />
                        );
                      })}
                    </Grid>
                  </Grid>
                ) : null;
              })}

              <Grid item xs={8} mt={3} md={3} textAlign="center">
                {showLoader ? (
                  <CustomLoader />
                ) : (
                  <Button
                    variant="contain"
                    onClick={handleSubmit}
                    className="cus-btn"
                    fullWidth
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DashboardCard>
    </PageContainer>
  );
}

const ShowStar = () => <span style={{ color: "red" }}>*</span>;

const ShowChip = ({ onClick, data }) => {
  console.log(data.name, "-----------matchshowfiled", data.selected);
  const [value, setvalue] = useState(data.selected);
  useEffect(() => {
    console.log(value, data.name, "<<<<value2");
    setvalue(data.selected);
  }, [data]);

  return (
    <Chip
      key={data._id}
      onClick={onClick}
      label={data.name}
      style={{ cursor: "pointer", background: value && MyTheme.bgColor1 }}
    />
  );
};
export default AddGallery;
