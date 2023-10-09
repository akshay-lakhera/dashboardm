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
import { useNavigate, useParams } from "react-router";

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
  rating:3,

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
function EditCollection({ handleOpen, reloadIt, open, handleClose }) {
  const [formData, setFormData] = useState(initialState);
  const [showLoader, setshowLoader] = useState(false);
  const [allCategory, setallCategory] = useState([]);
  const [togglePAge, settogglePAge] = useState(false)
  const [subCategoriesData, setsubCategoriesData] = useState([]);
  const [manageToggleSubCategory, setmanageToggleSubCategory] = useState(false);
  const { id } = useParams();
  const navigate=useNavigate()
  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    // alert(id)
    (async () => {
      const getNFTDATa = await API_CALL.collection.getEdit({ _id: id });
      if (getNFTDATa.data.success) {
        setFormData(getNFTDATa.data.data[0]);
        // setFormData(()=>{
        getCategoryData();
        // return getNFTDATa.data.data[0]});
        // console.log(getNFTDATa.data.data[0],"<<<<nftdata")
        // setTimeout(() => {

        // }, 500);
      }
    })();

    // console.log("called")
  }, [togglePAge]);



  const getCategoryData = async () => {
    try {
      const { data } = await API_CALL.SubCategory.getGroupedCategory();
      if (data.success) {
        setallCategory(data.data);

       
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
      payload.append("attributes", JSON.stringify(formData?.attributes));
      payload.append("nilValue", formData?.nilValue);
      payload.append("rating", JSON.parse(formData?.rating));
      if (typeof formData.image == "object")
        payload.append("image", formData?.image, formData?.image.name);

      const { data } = await API_CALL.collection.update(payload, formData._id);
      if (data.success) {
        setshowLoader(false);
        toast.success(data.message);
        // setFormData(initialState);
        settogglePAge(!togglePAge)
  navigate("/collection-management")
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
    setFormData((prev) => {
      let attributes = prev?.attributes.map((item) => {
        if (item.category == category) {
          return {
            category: item.category,
            SubCategory: item.SubCategory.map((sub) => {
              if (sub._id == subcategory) {
                console.log(value, "<<<<matchvalue---", sub);
                return { ...sub, selected: !value };
              }
              return sub;
            })
          };
        } else return item;
      });
      console.log(attributes, "<<<<<these are attribnutes");

      return { ...prev, attributes };
    });
  };

  const matchWithCurrentValue = (cat, subcat) => {
    let { attributes } = formData;
    let selectedCat = attributes.filter((item) => item.category._id == cat);
    if (selectedCat.length) {
      const { SubCategory } = selectedCat[0];
      const matchIt = SubCategory.filter(
        (it) => it._id == subcat && it.selected
      );
      console.log(matchIt, "<<<<<selectedcat", subcat);
      if (matchIt.length) return true;
      else return false;
    }else return false
  };

  console.log(formData, "<<<<<thisisformdata");
  return (
    <PageContainer title="Sky Dog Gallery Management" description="">
      <DashboardCard title="Edit NFT">
        <Grid
          container
          rowSpacing={2}
          justifyContent="center"
          columnSpacing={3}
        >
          <Grid item xs={12} md={3} textAlign="center">
            {formData?.image == null ? (
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
            ) : (
              <div>
                <img
                  src={
                    typeof formData?.image == "string"
                      ? formData?.image
                      : URL.createObjectURL(formData?.image)
                  }
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
                  placeholder="Enter hash Value"
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
                      <ShowSubCatComp formData={formData} item={item} matchWithCurrentValue={matchWithCurrentValue} selectCategory={selectCategory}/>
                      {/* {showSubCategories[0]?.SubCategory?.map((sub) => { */}
                      {/* {item?.data?.map((sub) => {
                       
                        const alreadySelected = matchWithCurrentValue(
                          item?.data[0]?.parentCategoryData[0]?._id,
                          sub._id
                        );
                        return (
                          <Chip
                            key={sub._id}
                            onClick={() =>
                              selectCategory(
                                item._id[0]._id,
                                sub._id,
                                alreadySelected
                              )
                            }
                            label={sub.name}
                            style={{
                              cursor: "pointer",
                              background: alreadySelected
                                ? MyTheme.bgColor1
                                : null
                            }}
                          />
                        );
                      })} */}
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

const ShowSubCatComp=({item,matchWithCurrentValue,selectCategory,formData})=>{
  const [newData, setnewData] = useState([])
  useEffect(() => {
setnewData(item.data)
  }, [formData])
  
  return newData?.map((sub) => {
                       
                        const alreadySelected = matchWithCurrentValue(
                          item?.data[0]?.parentCategoryData[0]?._id,
                          sub._id
                        );
                        return (
                          <Chip
                            key={sub._id}
                            onClick={() =>
                              selectCategory(
                                item._id[0]._id,
                                sub._id,
                                alreadySelected
                              )
                            }
                            label={sub.name}
                            style={{
                              cursor: "pointer",
                              background: alreadySelected
                                ? MyTheme.bgColor1
                                : null
                            }}
                          />
                        );
                      })
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
export default EditCollection;
