import { Button, Grid, TextField, Typography } from "@mui/material";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackDropLoader from "src/components/CommonComponents/BackdropLoader";
import TextEditor from "src/components/CommonComponents/TextEditor";
import PageContainer from "src/components/container/PageContainer";
import CustomLoader from "src/components/custom-scroll/CustomLoader";
import DashboardCard from "src/components/shared/DashboardCard";
import { API_CALL } from "src/services/APICalls";
// import { CALL_API } from "src/services/APICalls";

function TermsAndCondition() {
  const [showLoader, setshowLoader] = useState(false);
  const [showBackDrop, setshowBackDrop] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const [editorState, setEditorState] = useState("<h3>Loading...</h3>");
  //   const [editorState, setEditorState] = useState(() =>
  //     EditorState.createEmpty()
  //   );
console.log(process.env,"<<<process")
  useEffect(() => {
    try {
      (async () => {
        setshowBackDrop(true)
        setshowLoader(true);
        console.log(process.env,"env")
        const { data } = await API_CALL.static.getStaticPage({
          // _id: process.env?.React_APP_Terms
          slug:"terms-and-condition"
        });
        console.log(data, "<<<<getdata");
        if (data.success) {
          setshowBackDrop(false)
          let privacyData = data.data[0];
          console.log(privacyData, "<<<<thisisprivacyData");

          setFormData({ ...formData, ...privacyData });
          setEditorState(privacyData.bodyData);
          setshowLoader(false);
        }else{
          setshowBackDrop(false)
        }
      })();
    } catch (error) {
      console.log(error);
      setshowBackDrop(false)
    }
  }, []);
  console.log(editorState, "<<<thisisconvertedcontent");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const submit = async () => {
    try {
      console.log(formData, "<<<thisisformdata");
      const { data } = await API_CALL.static.updateStaticPage({...formData,id:formData?._id});

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  return (
    <PageContainer title="About us" description="About us">
      <DashboardCard title="About us">
      {showBackDrop && <BackDropLoader />}
          <Grid container rowSpacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography fontSize={18} mb={1}>
                Title
              </Typography>
              <TextField
                fullWidth
                value={formData?.title}
                onChange={handleChange}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography fontSize={18} mb={1}>
                Content
              </Typography>

              <TextEditor
                convertedContent={editorState}
                setConvertedContent={setEditorState}
                setFormData={setFormData}
                formData={formData}
              />
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Button
                fullWidth
                style={{ margin: "auto" }}
                onClick={submit}
                variant="contained"
              >
                Update
              </Button>
            </Grid>
          </Grid>
      
      </DashboardCard>
    </PageContainer>
  );
}

export default TermsAndCondition;