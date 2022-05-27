const axios = require("axios");
const baseUrl = "http://localhost:4509";
const username = "azr1";
const auth_id = "20S0KPNOIM";

const authToken = Buffer.from(`${username}:${auth_id}`).toString("base64");

const headers = {
  "content-type": "application/json",
  authorization: `Basic ${authToken}`
}

module.exports = {
  callInbound: async(body) => {
    try {
      const { data } = await axios.post(`${baseUrl}/inbound/sms`, body, {headers});
      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  },

  callOutbound: async(body) => {
    try {
      const { data } = await axios.post(`${baseUrl}/outbound/sms`, body, {headers});
      return data;
    } catch (error) {
      const { data } = error.response;
      return data;
    }
  }
}