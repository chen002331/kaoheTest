async function sine() {
  var myChart = echarts.init(document.getElementById("chart-sine"));
  const response = await fetch("https://edu.telking.com/api/?type=month");
  const sine_data = await response.json();
  var option = {
    title: {
      left: "center",
      text: "曲线图数据展示",
      top: 30,
      textStyle: {
        fontWeight: "normal",
      },
    },
    grid: {
      bottom: 48,
      height: 200,
    },

    xAxis: {
      data: sine_data["data"]["xAxis"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} 人",
        align: "right",
      },
      splitLine: {
        lineStyle: {
          type: "dashed",
        },
      },
      axisLabel: {
        textStyle: {
          lineHeight: 348,
        },
      },
    },
    series: [
      {
        type: "line",
        smooth: true,
        areaStyle: {
          color: "#f3f6fd",
        },
        data: sine_data["data"]["series"],
        label: {
          show: true,
        },
      },
    ],
  };

  console.log(option);

  myChart.setOption(option);
}

async function pine() {
  var myChart = echarts.init(document.getElementById("chart-pine"));
  const response = await fetch("https://edu.telking.com/api/?type=week");
  const pine_data = await response.json();
  var mydata = [];

  for (let i = 0; i < pine_data["data"]["xAxis"].length; i++) {
    let temp = {};
    temp["value"] = pine_data["data"]["series"][i];
    temp["name"] = pine_data["data"]["xAxis"][i];
    mydata.push(temp);
  }

  var option = {
    title: {
      text: "饼状图数据展示",
      left: "center",
      top: 45,
      textStyle: {
        fontWeight: "normal",
      },
    },

    tooltip: {
      trigger: "item",
    },

    series: [
      {
        // name: "饼状图数据展示",
        type: "pie",
        radius: "50%",
        data: mydata,
        center: ["50%", "60%"],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  console.log(option);

  myChart.setOption(option);
}

async function bar() {
  var myChart = echarts.init(document.getElementById("chart-bar"));
  const response = await fetch("https://edu.telking.com/api/?type=week");
  const bar_data = await response.json();

  var option = {
    title: {
      text: "柱状图数据展示",
      left: "center",
      padding: 45,
      textStyle: {
        fontWeight: "normal",
      },
    },
    grid: {
      width: 443,
      height: 190,
      bottom: 50,
    },
    xAxis: {
      type: "category",
      data: bar_data["data"]["xAxis"],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      name: "商品数",
      type: "value",
      splitLine: {
        lineStyle: {
          type: "dotted",
        },
      },
    },
    series: [
      {
        data: bar_data["data"]["series"],
        type: "bar",
        color: "#4586ef",
        barWidth: "30%",
      },
    ],
  };
  console.log(option);

  myChart.setOption(option);
}

window.onload = function () {
  sine();
  pine();
  bar();
};
