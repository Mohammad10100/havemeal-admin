import AsyncStorage from "@react-native-async-storage/async-storage";
import { setLoading } from "../../slices/profileSlice";
import { apiConnector } from "../apiconnector"
import { categories } from "../apis"

const {
    CREATE_NEW_CATEGORY,
    GET_ALL_CATEGORY,
    GET_CATEGORY_DETAILS,
    EDIT_CATEGORY,
} = categories

export const createCategory = async (data, navigation) => {
    const {name, description} = data;
    console.log(data);
    console.log(name, description);
    try {
        const response = await apiConnector("POST", CREATE_NEW_CATEGORY, data)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Plan Categories")
        }
        result = response?.data?.data
        navigation.replace('Category');
    } catch (error) {
        console.log("CREATE_NEW_CATEGORY API ERROR............", error)
    }
    return result
}

export const fetchPlanDetails = async (planId) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector("POST", PLAN_DETAILS_API, {
            planId,
        })
        console.log("PLAN_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data
    } catch (error) {
        console.log("PLAN_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}

// fetching the available plan categories
export const fetchPlanCategories = async () => {
    let result = []
    try {
        const response = await apiConnector("GET", PLAN_CATEGORIES_API)
        console.log("PLAN_CATEGORIES_API API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Fetch Plan Categories")
        }
        result = response?.data?.data
    } catch (error) {
        console.log("PLAN_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
    }
    return result
}

// add the plan details
export const addPlanDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CREATE_PLAN_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE PLAN API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Add Plan Details")
        }
        toast.success("Plan Details Added Successfully")
        result = response?.data?.data
    } catch (error) {
        console.log("CREATE PLAN API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// edit the plan details
export const editPlanDetails = async (data, token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try {
        console.log('start1');
        const response = await apiConnector("POST", EDIT_PLAN_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log('start2');
        console.log("EDIT PLAN API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Update Plan Details")
        }
        console.log('start3');
        toast.success("Plan Details Updated Successfully")
        result = response?.data?.data
        console.log('start4');
    } catch (error) {
        console.log('start5');
        console.log("EDIT PLAN API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

// delete a plan
export const deletePlan = async (data, token) => {
    const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("DELETE", DELETE_PLAN_API, data, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE PLAN API RESPONSE............", response)
        if (!response?.data?.success) {
            throw new Error("Could Not Delete Plan")
        }
        toast.success("Plan Deleted")
    } catch (error) {
        console.log("DELETE PLAN API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
}

// get full details of a plan
export const getFullDetailsOfPlan = async (planId, token) => {
    const toastId = toast.loading("Loading...")
    //   dispatch(setLoading(true));
    let result = null
    try {
        const response = await apiConnector(
            "POST",
            GET_FULL_PLAN_DETAILS_AUTHENTICATED,
            {
                planId,
            },
            {
                Authorization: `Bearer ${token}`,
            }
        )
        console.log("PLAN_FULL_DETAILS_API API RESPONSE............", response)

        if (!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response?.data?.data
    } catch (error) {
        console.log("PLAN_FULL_DETAILS_API API ERROR............", error)
        result = error.response.data
        // toast.error(error.response.data.message);
    }
    toast.dismiss(toastId)
    //   dispatch(setLoading(false));
    return result
}