
var url = "http://localhost:8006/car/judgeQuotetion";
var judgeQuotetion = (licenseNo, callBack) => this.$http.get(url,{
  params: {
    licenseNo: licenseNo
  }
}).then(response => {
  console.log(response);
  callBack(response);
}, error => {
  console.log(error);
});

export { judgeQuotetion }
