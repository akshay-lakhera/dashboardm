import { BASE_CALL } from "./baseCall";

export const API_CALL = {
 

  category: {
    create: async (payload) => BASE_CALL.post("/category/create", payload),

    get: async (payload) => await BASE_CALL.get("/category/get", payload),
    delete: async (id) => await BASE_CALL.delete("/category/delete/"+id),
    update: async (payload) => await BASE_CALL.put("/category/update",payload),
  },

  grill: {
    create: async (payload) => BASE_CALL.post("/grill/create", payload),
    get: async (payload) => await BASE_CALL.get("/grill/get", payload),
    delete: async (id) => await BASE_CALL.delete("/grill/delete/"+id),
    update: async (payload) => await BASE_CALL.put("/grill/update",payload),
  },
  SubCategory: {
    create: async (payload) => BASE_CALL.post("/sub-category/create", payload),
    get: async (payload) => await BASE_CALL.get("/sub-category/get", payload),
    delete: async (id) => await BASE_CALL.delete("/sub-category/delete/"+id),
    update: async (payload) => await BASE_CALL.put("/sub-category/update",payload),
    getGroupedCategory:async (payload)=>await BASE_CALL.get("/sub-category/group-by-category",payload)
  },
  collection: {
    create: async (payload) => BASE_CALL.formData("/collection/create", payload),
    createCSV: async (payload) => BASE_CALL.post("/collection/create-csv", payload),

    get: async (payload) => await BASE_CALL.get("/collection/get", payload),
    getEdit: async (payload) => await BASE_CALL.get("/collection/get-edit", payload),
    delete: async (id) => await BASE_CALL.delete("/collection/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/collection/update/"+id,payload),

  },
  Roadmap: {
    create: async (payload) => BASE_CALL.formData("/roadmap/create", payload),

    get: async (payload) => await BASE_CALL.get("/roadmap/get", payload),
    delete: async (id) => await BASE_CALL.delete("/roadmap/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/roadmap/update/"+id,payload),

  },
  Artist: {
    create: async (payload) => BASE_CALL.formData("/artist/create", payload),

    get: async (payload) => await BASE_CALL.get("/artist/get", payload),
    delete: async (id) => await BASE_CALL.delete("/artist/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/artist/update/"+id,payload),

  },
  Community: {
    create: async (payload) => BASE_CALL.formData("/community/create", payload),

    get: async (payload) => await BASE_CALL.get("/community/get", payload),
    delete: async (id) => await BASE_CALL.delete("/community/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/community/update/"+id,payload),

  },
  Partner: {
    create: async (payload) => BASE_CALL.formData("/partner/create", payload),

    get: async (payload) => await BASE_CALL.get("/partner/get", payload),
    delete: async (id) => await BASE_CALL.delete("/partner/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/partner/update/"+id,payload),

  },
  Contact: {
    // create: async (payload) => BASE_CALL.formData("/contact/create", payload),

    get: async (payload) => await BASE_CALL.get("/contact/get", payload),
    delete: async (id) => await BASE_CALL.delete("/contact/delete/"+id),
    // update: async (payload,id) => await BASE_CALL.formDataPut("/contact/update/"+id,payload),

  },
  Slider: {
    create: async (payload) => BASE_CALL.formData("/slider/create", payload),
    get: async (payload) => await BASE_CALL.get("/slider/get", payload),
    delete: async (id) => await BASE_CALL.delete("/slider/delete/"+id),
    update: async (payload,id) => await BASE_CALL.formDataPut("/slider/update/"+id,payload),

  },
  users: {
    create: async (payload) => BASE_CALL.post("/user/create", payload),
    getByWallet: async (walletAddress) =>
      await BASE_CALL.get("/user/get-by-wallet", { walletAddress }),
    get: async (payload) => await BASE_CALL.get("/user/get", payload)
  },
 
  static:{
updateStaticPage:async payload=>await BASE_CALL.put("/static-page/update",payload),
getStaticPage:async payload=>await BASE_CALL.get("/static-page/get",payload)
  }
};
