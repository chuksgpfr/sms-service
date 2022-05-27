const { callInbound, callOutbound } = require("./service.test");
const expect  = require("chai").expect;


describe("Testing Inbound SMS", () => {
  it("parameter is missing", async() => {
    const body = {
      text: "STOP",
      // to: "4924195509195",
      from: "4924195509196"
    }

    const data = await callInbound(body);

    expect(data.error).to.equal("to is missing");

  });

  it("is parameter invalid", async() => {
    const body = {
      text: "STOP",
      to: "12345",
      from: "4924195509196"
    }

    const data = await callInbound(body);

    expect(data.error).to.equal("to is invalid");

  });

  it("to is not found in the phone_number", async() => {
    const body = {
      text: "STOP",
      to: "123456",
      from: "4924195509196"
    }

    const data = await callInbound(body);

    expect(data.error).to.equal("to parameter not found");

  });

  it("all parameters are valid", async() => {
    const body = {
      text: "STOP",
      to: "4924195509195",
      from: "4924195509196"
    }

    const data = await callInbound(body);

    expect(data.message).to.equal("inbound sms ok");

  });
});

describe("Testing Outbound SMS", () => {
  it("parameter is missing", async() => {
    const body = {
      text: "STOP",
      to: "4924195509195",
      // from: "4924195509196"
    }

    const data = await callOutbound(body);

    expect(data.error).to.equal("from is missing");

  });

  it("is parameter invalid", async() => {
    const body = {
      text: "STOP",
      to: "4924195509195",
      from: "12345"
    }

    const data = await callOutbound(body);

    expect(data.error).to.equal("from is invalid");

  });

  it("If the pair to, from matches any entry in cache (STOP)", async() => {
    const body = {
      text: "STOP",
      to: "4924195509195",
      from: "4924195509196"
    }

    const data = await callOutbound(body);

    expect(data.error).to.equal(`sms from ${body.from} to ${body.to} blocked by STOP request`);

  });

  it("from is not found in the phone_number", async() => {
    const body = {
      text: "STOP",
      to: "4924195509195",
      from: "12345689"
    }

    const data = await callOutbound(body);

    expect(data.error).to.equal("from parameter not found");

  });

  it("all parameters are valid", async() => {
    const body = {
      text: "Love from india",
      to: "4924195509012",
      from: "4924195509193"
    }

    const data = await callOutbound(body);

    expect(data.message).to.equal("outbound sms ok");

  });
});