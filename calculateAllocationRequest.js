const { createCanvas } = require("canvas");
const Chart = require("chart.js/auto");
const fs = require("fs");

const capitalizeFirstLetter = (str) => {
  console.log("str", str);
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const randColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

const calculateNumberOfRequestAllocated = () => {};

const drawPieGraph = (analysisData) => {
  console.log(
    Object.entries(analysisData).map(
      ([key, value]) => `${capitalizeFirstLetter(key)}: ${value}`
    )
  );

  console.log(Object.values(analysisData).slice(0, -1));

  console.log(Object.values(analysisData).map(() => randColor()));

  const canvas = createCanvas(400, 400);
  const ctx = canvas.getContext("2d");

  const data = {
    labels: Object.entries(analysisData).map(
      ([key, value]) => `${capitalizeFirstLetter(key)}: ${value}`
    ),
    datasets: [
      {
        data: Object.values(analysisData).slice(0, -1).concat([null]),
        backgroundColor: Object.values(analysisData).map(() => randColor()),
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  new Chart(ctx, {
    type: "pie",
    data: data,
    options: options,
  });

  fs.writeFileSync("requestAllocation.png", canvas.toBuffer());
};

drawPieGraph({
  server1: 40,
  server2: 50,
  total: 90,
});
