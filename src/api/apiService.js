import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;          
const KHALTI_URL = import.meta.env.VITE_KHALTI_URL;     

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const khaltiApi = axios.create({
  baseURL: KHALTI_URL,
  headers: { "Content-Type": "application/json" },
});

khaltiApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = async (mobile_number, password) => {
  try {
    const res = await api.post("/user/login/", { mobile_number, password });

    localStorage.setItem("access_token", res.data.access);

    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: err.response?.data || err.message };
  }
};

export const signup = async ({ username, mail, mobile_number, password }) => {
  try {
    const res = await api.post("/user/register/", {
      username,
      mail,
      mobile_number,
      password,
    });
    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: err.response?.data || err.message };
  }
};

export const changePassword = async ({
  oldPassword,
  newPassword,
  retypePassword,
}) => {
  try {
    const res = await api.put("/user/password/change/", {
      old_password: oldPassword,
      new_password: newPassword,
      re_type_password: retypePassword,
    });

    return { ok: true, data: res.data };
  } catch (err) {
    return {
      ok: false,
      error: err.response?.data || err.message,
    };
  }
};

export const requestOtp = async (mail) => {
  try {
    const res = await api.post("/user/password/forget/", { mail });
    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: err.response?.data || err.message };
  }
};

export const resetPassword = async ({
  token,
  newPassword,
  reTypePassword,
}) => {
  try {
    const res = await api.post(`/user/password/reset/${token}/`, {
      new_password: newPassword,
      re_type_password: reTypePassword,
    });

    console.log("Reset Password response:", res.data);
    return { ok: true, data: res.data };
  } catch (err) {
    console.error("Reset Password error:", err.response?.data || err.message);
    return { ok: false, error: err.response?.data || err.message };
  }
};

export const initiateKhaltiPayment = async ({
  amount,
  purchase_order_id,
  purchase_order_name,
  return_url,
}) => {
  try {
    const res = await api.post("/payment/khalti/initiate/", {
      amount,
      purchase_order_id,
      purchase_order_name,
      return_url,
    });

    return { ok: true, data: res.data };
  } catch (err) {
    return { ok: false, error: err.response?.data || err.message };
  }
};

export const verifyKhaltiPayment = async ({ pidx }) => {
  try {
    const res = await api.post("/payment/khalti/verify/", { pidx });
    
    console.log("Khalti verification response:", res.data);
    
    return { 
      ok: true, 
      data: res.data 
    };
  } catch (err) {
    console.error("Khalti verification error:", err.response?.data || err.message);
    return { 
      ok: false, 
      error: err.response?.data || err.message 
    };
  }
};